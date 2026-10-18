import unittest
import xml.etree.ElementTree as ET
from validate_seo import Page, blocks_indexing, robots_allowed, sitemap_entries


class ValidatorTests(unittest.TestCase):
    def test_html_attribute_order_entities_and_streamed_metadata(self):
        page = Page('<title>AI &amp; Systems</title><script>"<meta name=robots content=noindex>"</script><body><meta content="index, follow" name="robots"><link href="https://parampatel.in/blog" rel="canonical"><h1>AI<br>systems</h1><a href="/blog?a=1&amp;b=2">Blog</a></body>')
        self.assertEqual(page.meta['robots'], ['index, follow'])
        self.assertEqual(page.canonicals, ['https://parampatel.in/blog'])
        self.assertEqual(''.join(page.title), 'AI & Systems')
        self.assertEqual(''.join(page.h1), 'AIsystems')
        self.assertEqual(page.links, ['/blog?a=1&b=2'])

    def test_conflicting_and_agent_specific_noindex_is_detected(self):
        for directive in ['noindex, follow', 'googlebot: noindex', 'NONE', 'index, noindex']:
            self.assertTrue(blocks_indexing(directive))
        self.assertFalse(blocks_indexing('index, follow, max-image-preview:large'))
        page = Page('<meta name="robots" content="index"><meta name="robots" content="noindex">')
        self.assertTrue(any(blocks_indexing(v) for v in page.meta['robots']))

    def test_robots_specific_agents_override_wildcard(self):
        text = 'User-agent: *\nDisallow: /\nUser-agent: Googlebot\nAllow: /\nDisallow: /admin$\nDisallow: /admin/\n'
        self.assertTrue(robots_allowed(text, '/blog'))
        self.assertFalse(robots_allowed(text, '/blog', 'bingbot'))
        self.assertFalse(robots_allowed(text, '/admin'))
        self.assertFalse(robots_allowed(text, '/admin/studio'))
        self.assertTrue(robots_allowed(text, '/administrator'))

    def test_robots_longest_match_allow_tie_and_group_union(self):
        text = 'User-agent: *\nDisallow: /private/*\nAllow: /private/public/\nDisallow: /tie\nAllow: /tie\nUser-agent: *\nDisallow: /other\n'
        self.assertFalse(robots_allowed(text, '/private/data'))
        self.assertTrue(robots_allowed(text, '/private/public/a'))
        self.assertTrue(robots_allowed(text, '/tie'))
        self.assertFalse(robots_allowed(text, '/other'))

    def test_sitemap_namespace_structure_and_escaping(self):
        prefix = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        self.assertEqual(sitemap_entries(prefix + '<url><loc>https://parampatel.in/blog?a=1&amp;b=2</loc></url></urlset>'), (False, [('https://parampatel.in/blog?a=1&b=2', None)]))
        for xml in ['<urlset/>', prefix + '</urlset>', prefix + '<url><loc>a</loc><loc>b</loc></url></urlset>', prefix + '<url/></urlset>']:
            with self.assertRaises(ValueError):
                sitemap_entries(xml)
        with self.assertRaises(ET.ParseError):
            sitemap_entries(prefix + '<url></urlset>')

    def test_sitemap_index(self):
        xml = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://parampatel.in/blog/sitemap.xml</loc></sitemap></sitemapindex>'
        self.assertEqual(sitemap_entries(xml), (True, [('https://parampatel.in/blog/sitemap.xml', None)]))


if __name__ == '__main__':
    unittest.main()
