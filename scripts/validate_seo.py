"""Audit a running production build using Python 3 and curl; no packages required.

Local: npm run seo:check -- --base-url http://localhost:3000
Live:  npm run seo:check -- --base-url https://parampatel.in --report /tmp/seo-live.json
Canonical metadata is always checked against the production origin, even locally.
"""
import argparse
import datetime as dt
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import tempfile
from urllib.parse import urljoin, urlsplit
import xml.etree.ElementTree as ET

ORIGIN = 'https://parampatel.in'
PUBLIC_PATHS = ['/', '/projects', '/research', '/blog', '/ai-lab', '/contact']
PRIVATE_PATHS = ['/admin', '/api', '/sign-in', '/sign-up', '/studio', '/cms', '/dashboard']
NS = 'http://www.sitemaps.org/schemas/sitemap/0.9'
GOOGLEBOT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.meta, self.canonicals, self.links = {}, [], []
        self.title, self.h1 = [], []
        self.in_title = self.in_h1 = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta':
            key = (attrs.get('name') or attrs.get('property') or '').lower()
            self.meta.setdefault(key, []).append(attrs.get('content', ''))
        if tag == 'link' and 'canonical' in attrs.get('rel', '').lower().split():
            self.canonicals.append(attrs.get('href', ''))
        if tag == 'a' and attrs.get('href'):
            self.links.append(attrs['href'])
        if tag == 'title':
            self.in_title = True
        if tag == 'h1':
            self.in_h1 = True

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag == 'h1':
            self.in_h1 = False

    def handle_data(self, data):
        if self.in_title:
            self.title.append(data)
        if self.in_h1:
            self.h1.append(data)


def blocks_indexing(value):
    return bool(re.search(r'\b(noindex|none)\b', value, re.I))


def robots_allowed(text, path, agent='googlebot'):
    groups, agents, rules = [], [], []
    for line in text.splitlines():
        line = line.split('#', 1)[0].strip()
        if ':' not in line:
            continue
        key, value = (part.strip() for part in line.split(':', 1))
        key = key.lower()
        if key == 'user-agent':
            if rules:
                groups.append((agents, rules))
                agents, rules = [], []
            agents.append(value.lower())
        elif key in ('allow', 'disallow') and agents and value:
            rules.append((key, value))
    groups.append((agents, rules))
    relevant = [(max((len(a) if a != '*' else 0) for a in agents
                     if a == '*' or a in agent), rules)
                for agents, rules in groups if any(a == '*' or a in agent for a in agents)]
    if not relevant:
        return True
    specificity = max(score for score, _ in relevant)
    matches = []
    for score, rules in relevant:
        if score != specificity:
            continue
        for key, value in rules:
            anchored = value.endswith('$')
            pattern = value[:-1] if anchored else value
            regex = '^' + re.escape(pattern).replace(r'\*', '.*') + ('$' if anchored else '')
            if re.search(regex, path):
                matches.append((len(pattern.replace('*', '')), key == 'allow'))
    return max(matches, default=(0, True))[1]


def sitemap_entries(xml):
    root = ET.fromstring(xml)
    if root.tag not in (f'{{{NS}}}urlset', f'{{{NS}}}sitemapindex'):
        raise ValueError('Expected a sitemap urlset or sitemapindex with the official namespace')
    index = root.tag.endswith('sitemapindex')
    child_tag = f'{{{NS}}}' + ('sitemap' if index else 'url')
    entries = []
    for child in root:
        if child.tag != child_tag:
            raise ValueError('Unexpected sitemap element')
        loc = child.findall(f'{{{NS}}}loc')
        if len(loc) != 1 or not loc[0].text:
            raise ValueError('Each entry must have exactly one nonempty loc')
        entries.append((loc[0].text.strip(), child.findtext(f'{{{NS}}}lastmod')))
    if not entries or len(entries) > 50000:
        raise ValueError('Sitemap must contain 1–50000 entries')
    return index, entries


class Audit:
    def __init__(self, base_url, origin):
        self.base, self.origin = base_url.rstrip('/'), origin.rstrip('/')
        self.results, self.cache = [], {}

    def check(self, condition, label, detail=''):
        self.results.append({'status': 'PASS' if condition else 'FAIL', 'check': label, 'detail': detail})
        print(f"{'PASS' if condition else 'FAIL'} {label}" + (f' — {detail}' if detail else ''), flush=True)
        return condition

    def get(self, path, agent=GOOGLEBOT, follow=False, host=None):
        url = path if path.startswith(('https://', 'http://')) else self.base + path
        key = (url, agent, follow, host)
        if key in self.cache:
            return self.cache[key]
        seen, chain = set(), []
        for _ in range(9):
            if url in seen:
                raise ValueError(f'Redirect loop: {chain}')
            seen.add(url)
            with tempfile.TemporaryDirectory() as directory:
                header, body = Path(directory) / 'headers', Path(directory) / 'body'
                result = subprocess.run(['curl', '-sS', '--max-time', '30', '--compressed',
                                         '-A', agent, '-D', str(header), '-o', str(body)]
                                        + (['-H', f'Host: {host}'] if host else []) + [url],
                                        capture_output=True, text=True)
                if result.returncode:
                    raise ValueError(result.stderr.strip())
                raw = header.read_text().strip()
                # Ignore interim or proxy connection-established responses.
                raw = re.split(r'\n\s*\n(?=HTTP/)', raw)[-1]
                lines = raw.splitlines()
                status = int(lines[0].split()[1])
                headers = {}
                for line in lines[1:]:
                    if ':' in line:
                        name, value = line.split(':', 1)
                        name = name.lower()
                        headers[name] = headers.get(name, '') + (', ' if name in headers else '') + value.strip()
                response = {'status': status, 'headers': headers, 'body': body.read_bytes().decode('utf-8', errors='replace'), 'url': url, 'chain': list(chain)}
            if not follow or status not in (301, 302, 303, 307, 308):
                self.cache[key] = response
                return response
            destination = urljoin(url, headers.get('location', ''))
            chain.append({'url': url, 'status': status, 'destination': destination})
            url = destination
        raise ValueError(f'Too many redirects: {chain}')

    def public(self, path, agent=GOOGLEBOT):
        response = self.get(path, agent)
        page, expected = Page(response['body']), self.origin + path.split('?', 1)[0].rstrip('/')
        label = path + (' (browser)' if agent != GOOGLEBOT else '')
        self.check(response['status'] == 200, f'{label}: HTTP 200', str(response['status']))
        self.check('text/html' in response['headers'].get('content-type', ''), f'{label}: HTML response')
        directives = page.meta.get('robots', []) + page.meta.get('googlebot', []) + [response['headers'].get('x-robots-tag', '')]
        self.check(not any(blocks_indexing(v) or re.search(r'\bnofollow\b', v, re.I) for v in directives), f'{label}: no indexing restrictions', '; '.join(filter(None, directives)))
        self.check(len(page.canonicals) == 1 and page.canonicals[0].rstrip('/') == expected, f'{label}: one self-referencing production canonical', ', '.join(page.canonicals))
        self.check(bool(''.join(page.title).strip()) and len(page.meta.get('description', [])) == 1 and bool(page.meta['description'][0].strip()), f'{label}: title and unique description tag')
        self.check(bool(''.join(page.h1).strip()), f'{label}: heading in initial HTML')
        self.check(len(page.meta.get('og:url', [])) == 1 and page.meta['og:url'][0].rstrip('/') == expected and bool(page.meta.get('og:title')) and bool(page.meta.get('og:description')) and page.meta.get('twitter:card') == ['summary_large_image'], f'{label}: complete social metadata')
        metadata = ' '.join(page.canonicals + [item for values in page.meta.values() for item in values])
        self.check(not re.search(r'localhost|127\.0\.0\.1|https?://[^\s"<>]*\.vercel\.app', metadata, re.I), f'{label}: no development/preview metadata URLs')
        return page

    def sitemap(self, path='/sitemap.xml', seen=None):
        seen = set() if seen is None else seen
        if path in seen:
            raise ValueError('Repeated or circular sitemap reference')
        seen.add(path)
        response = self.get(path)
        self.check(response['status'] == 200 and 'xml' in response['headers'].get('content-type', ''), f'{path}: HTTP 200 XML')
        index, entries = sitemap_entries(response['body'])
        self.check(True, f'{path}: valid sitemap XML', f'{len(entries)} entries')
        urls = []
        for url, lastmod in entries:
            parts = urlsplit(url)
            self.check(parts.scheme == 'https' and parts.netloc == urlsplit(self.origin).netloc and not parts.query and not parts.fragment, f'sitemap canonical origin: {url}')
            if parts.scheme != 'https' or parts.netloc != urlsplit(self.origin).netloc:
                continue
            if lastmod:
                date = dt.datetime.fromisoformat(lastmod.replace('Z', '+00:00'))
                if date.tzinfo is None:
                    date = date.replace(tzinfo=dt.timezone.utc)
                self.check(date <= dt.datetime.now(dt.timezone.utc), f'sitemap lastmod not in future: {parts.path}')
            if index:
                urls.extend(self.sitemap(parts.path, seen))
            else:
                urls.append(url)
        return urls

    def run(self):
        robots = self.get('/robots.txt')
        self.check(robots['status'] == 200 and 'text/plain' in robots['headers'].get('content-type', ''), 'robots.txt: HTTP 200 plain text')
        self.check(re.search(r'^sitemap:\s*' + re.escape(self.origin + '/sitemap.xml') + r'\s*$', robots['body'], re.I | re.M) is not None, 'robots.txt: canonical sitemap reference')
        for path in PUBLIC_PATHS + ['/_next/static/test.js', '/_next/static/test.css', '/founder.jpg']:
            self.check(robots_allowed(robots['body'], path) and robots_allowed(robots['body'], path, 'bingbot'), f'robots.txt allows {path}')
        for path in PRIVATE_PATHS:
            self.check(not robots_allowed(robots['body'], path) and not robots_allowed(robots['body'], path + '/child'), f'robots.txt restricts {path} and descendants')
        urls = self.sitemap()
        self.check(len(urls) == len(set(urls)), 'sitemap: no duplicate URLs')
        paths = [urlsplit(url).path or '/' for url in urls]
        self.check(set(PUBLIC_PATHS).issubset(paths), 'sitemap: all real public landing pages present')
        canonicals, titles, descriptions, links = [], [], [], set()
        pages = {}
        for path in sorted(set(paths + PUBLIC_PATHS)):
            self.check(path in PUBLIC_PATHS or bool(re.fullmatch(r'/(blog|research)/[a-zA-Z0-9_-]+', path)), f'sitemap excludes private/obsolete routes: {path}')
            self.check(robots_allowed(robots['body'], path), f'sitemap URL crawlable: {path}')
            page = self.public(path)
            pages[path] = page
            canonicals.extend(page.canonicals)
            titles.append(''.join(page.title))
            descriptions.extend(page.meta.get('description', []))
            for href in page.links:
                destination = urlsplit(urljoin(self.origin + path, href))
                if destination.netloc == urlsplit(self.origin).netloc:
                    links.add(destination.path or '/')
                elif destination.netloc == 'www.' + urlsplit(self.origin).netloc:
                    self.check(False, f'internal link uses redirected hostname: {href}')
        for values, label in [(canonicals, 'canonicals'), (titles, 'titles'), (descriptions, 'descriptions')]:
            self.check(len(values) == len(set(values)), f'public pages have distinct {label}')
        reachable, pending = {'/'}, ['/']
        while pending:
            path = pending.pop()
            for href in pages.get(path, Page('')).links:
                target = urlsplit(urljoin(self.origin + path, href))
                child = target.path or '/'
                if target.netloc == urlsplit(self.origin).netloc and child in pages and child not in reachable:
                    reachable.add(child)
                    pending.append(child)
        for path in paths:
            if path != '/':
                self.check(path in reachable, f'reachable through public navigation: {path}')
        for path in sorted(links - set(paths)):
            response = self.get(path)
            self.check(response['status'] == 200, f'internal link resolves without redirect: {path}', str(response['status']))
        for path in ['/sign-in', '/sign-up']:
            response = self.get(path)
            page = Page(response['body'])
            directives = page.meta.get('robots', []) + [response['headers'].get('x-robots-tag', '')]
            self.check(response['status'] == 200 and any(blocks_indexing(v) for v in directives), f'{path}: intentionally noindex')
            self.check(not page.canonicals, f'{path}: no inherited homepage canonical')
        response = self.get('/admin')
        self.check(response['status'] in (301, 302, 303, 307, 308, 401, 403, 404) and blocks_indexing(response['headers'].get('x-robots-tag', '')), 'admin remains protected and noindex')
        for path in ['/__seo_missing_page__', '/blog/__seo_missing_page__', '/research/__seo_missing_page__']:
            response = self.get(path)
            page = Page(response['body'])
            self.check(response['status'] == 404 and any(blocks_indexing(v) for v in page.meta.get('robots', [])), f'{path}: real 404 with noindex', str(response['status']))
            self.check(not page.canonicals, f'{path}: no inherited homepage canonical')
        for path, target in [('/resume', '/resume.pdf'), ('/projects/drilex-oil', '/projects'), ('/blog/', '/blog')]:
            response = self.get(path)
            location = urljoin(self.base + path, response['headers'].get('location', ''))
            self.check(response['status'] in (301, 308) and location == self.base + target, f'{path}: permanent normalization to {target}')
            final = self.get(path, follow=True)
            self.check(final['status'] == 200 and len(final['chain']) <= 2, f'{path}: no redirect loop')
        self.public('/blog?utm_source=seo-validation')
        self.public('/', agent='Mozilla/5.0')
        article = next((p for p in paths if p.startswith('/blog/')), None)
        if article:
            self.public(article, agent='Mozilla/5.0')
        if self.base != self.origin:
            for path in ['/', '/blog']:
                response = self.get(path, host='www.' + urlsplit(self.origin).netloc)
                self.check(response['status'] in (301, 308) and response['headers'].get('location', '').rstrip('/') == (self.origin + path).rstrip('/'), f'www{path}: permanent redirect to production canonical host')
        if self.base == self.origin:
            for origin in ['http://parampatel.in', 'http://www.parampatel.in', 'https://www.parampatel.in']:
                for path in ['/', '/blog']:
                    response = self.get(origin + path, follow=True)
                    self.check(response['status'] == 200 and response['url'].rstrip('/') == (self.origin + path).rstrip('/') and bool(response['chain']) and all(hop['status'] in (301, 308) for hop in response['chain']), f'{origin}{path}: permanent redirects agree with canonical')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-url', default=ORIGIN)
    parser.add_argument('--origin', default=ORIGIN)
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    audit = Audit(args.base_url, args.origin)
    try:
        audit.run()
    except (ValueError, ET.ParseError, OSError) as error:
        audit.check(False, 'audit could not complete', str(error))
    counts = {status: sum(r['status'] == status for r in audit.results) for status in ['PASS', 'FAIL']}
    print(f"\n{counts['PASS']} PASS / {counts['FAIL']} FAIL. HTTP eligibility does not establish Google indexing.")
    if args.report:
        args.report.write_text(json.dumps({'checked_at': dt.datetime.now(dt.timezone.utc).isoformat(), 'base_url': audit.base, 'canonical_origin': audit.origin, 'counts': counts, 'checks': audit.results}, indent=2) + '\n')
    return int(counts['FAIL'] > 0)


if __name__ == '__main__':
    raise SystemExit(main())
