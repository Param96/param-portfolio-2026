import { NextResponse } from 'next/server';

// Revalidate this API route every 60 seconds (Next.js ISR)
export const revalidate = 60;

export async function GET() {
  try {
    const REPO_OWNER = 'Param96';
    const REPO_NAME = 'param-portfolio-2026';
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Param-Portfolio-App'
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch repository details
    const repoRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`, {
      headers,
      // Ensure Next.js caches this fetch call if we are not relying entirely on route segment config
      next: { revalidate: 60 }
    });

    // Fetch latest commits
    const commitsRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=3`, {
      headers,
      next: { revalidate: 60 }
    });

    if (!repoRes.ok || !commitsRes.ok) {
      console.warn(`GitHub API failed. Repo status: ${repoRes.status}, Commits status: ${commitsRes.status}`);
      // If we hit rate limits, return a fallback payload so the build doesn't fail
      if (repoRes.status === 403 || commitsRes.status === 403 || repoRes.status === 404) {
        return NextResponse.json({ 
          success: true, 
          data: {
            repo: `${REPO_OWNER}/${REPO_NAME}`,
            stars: 0,
            forks: 0,
            last_updated: new Date().toISOString(),
            latest_commits: []
          } 
        });
      }
      throw new Error('Failed to fetch from GitHub API');
    }

    const repoData = await repoRes.json();
    const commitsData = await commitsRes.json();

    // Map into a clean format for the terminal
    const payload = {
      repo: `${REPO_OWNER}/${REPO_NAME}`,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      last_updated: repoData.pushed_at,
      latest_commits: commitsData.map((commit: any) => ({
        sha: commit.sha.substring(0, 7),
        message: commit.commit.message.split('\n')[0], // only first line
        author: commit.commit.author.name,
        date: commit.commit.author.date,
      })),
    };

    return NextResponse.json({ success: true, data: payload });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve telemetry' },
      { status: 500 }
    );
  }
}
