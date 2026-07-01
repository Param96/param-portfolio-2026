import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour to prevent rate limiting

export async function GET() {
  try {
    const REPO_OWNER = 'Param96';
    
    const res = await fetch(`https://api.github.com/users/${REPO_OWNER}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Param-Portfolio-App'
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const data = await res.json();
    
    // Filter out forks and map to a clean payload
    const repos = data
      .filter((repo: any) => !repo.fork)
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description provided.',
        html_url: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        updated_at: repo.updated_at,
        topics: repo.topics || []
      }))
      // Sort by stars first, then by updated date
      .sort((a: any, b: any) => {
        if (b.stars !== a.stars) return b.stars - a.stars;
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });

    return NextResponse.json({ success: true, data: repos });
  } catch (error) {
    console.error('GitHub Repos API Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve repositories' },
      { status: 500 }
    );
  }
}
