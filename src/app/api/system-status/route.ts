import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { REPOSITORY_GALAXY_QUERY } from '@/sanity/lib/queries';

export async function GET() {
  try {
    // 1. Fetch Sanity Data (Projects and Tech Stack connections)
    const projects = await client.fetch(REPOSITORY_GALAXY_QUERY);
    
    const activeCount = projects.filter((p: any) => p.status === 'Active').length;
    const trainingCount = projects.filter((p: any) => p.status === 'Experimental' || p.status === 'In Development').length;
    const archivedCount = projects.filter((p: any) => p.status === 'Archived').length;
    
    // 2. Fetch Vercel Deployment Status
    // Graceful fallback if VERCEL_TOKEN is not provided in env
    let deploymentStatus = 'Operational';
    let lastDeployment = new Date().toISOString();
    
    if (process.env.VERCEL_TOKEN && process.env.VERCEL_PROJECT_ID) {
      try {
        const vercelRes = await fetch(`https://api.vercel.com/v6/deployments?projectId=${process.env.VERCEL_PROJECT_ID}&limit=1`, {
          headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` }
        });
        const vercelData = await vercelRes.json();
        if (vercelData.deployments && vercelData.deployments.length > 0) {
          deploymentStatus = vercelData.deployments[0].state === 'READY' ? 'Operational' : 'Building';
          lastDeployment = new Date(vercelData.deployments[0].created).toISOString();
        }
      } catch (e) {
        console.warn("Vercel API fetch failed", e);
      }
    }

    // 3. Fetch GitHub Activity for Param96
    let recentCommits = 42; 
    let activeBranches = 7;
    
    try {
      // Fetch public events for the user without requiring a token
      const ghRes = await fetch(`https://api.github.com/users/Param96/events/public`, {
        next: { revalidate: 3600 } // Cache for 1 hour to prevent rate limits
      });
      
      if (ghRes.ok) {
        const ghData = await ghRes.json();
        if (Array.isArray(ghData)) {
          const pushEvents = ghData.filter(event => event.type === 'PushEvent');
          recentCommits = pushEvents.reduce((acc, event) => acc + (event.payload.commits?.length || 0), 0);
        }
      } else {
        console.warn("GitHub API fetch returned non-200 status", ghRes.status);
      }
    } catch (e) {
      console.warn("GitHub API fetch failed", e);
    }

    return NextResponse.json({
      system: {
        status: deploymentStatus,
        lastSync: lastDeployment,
      },
      intelligence: {
        activeNodes: activeCount,
        trainingNodes: trainingCount,
        archivedNodes: archivedCount,
        recentCommits,
        activeBranches
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("System Status API Error:", error);
    return NextResponse.json({ error: 'Failed to fetch system status' }, { status: 500 });
  }
}
