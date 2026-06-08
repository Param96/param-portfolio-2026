import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const revalidate = 0; // Live data, do not cache

export async function GET() {
  try {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return NextResponse.json({ error: 'KV not configured' }, { status: 500 });
    }

    const redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });

    const fiveMinsAgo = Date.now() - 5 * 60 * 1000;
    
    // Count global active users in the last 5 minutes
    const globalCount = await redis.zcount('live:global', fiveMinsAgo, '+inf');

    // Count active users on specific routes
    const [researchCount, labNotesCount, blogCount] = await Promise.all([
      redis.zcount('live:route:/research', fiveMinsAgo, '+inf'),
      redis.zcount('live:route:/lab-notes', fiveMinsAgo, '+inf'),
      redis.zcount('live:route:/blog', fiveMinsAgo, '+inf'),
    ]);

    // Cleanup old keys (Background task)
    redis.zremrangebyscore('live:global', '-inf', fiveMinsAgo).catch(() => {});
    redis.zremrangebyscore('live:route:/research', '-inf', fiveMinsAgo).catch(() => {});
    redis.zremrangebyscore('live:route:/lab-notes', '-inf', fiveMinsAgo).catch(() => {});
    redis.zremrangebyscore('live:route:/blog', '-inf', fiveMinsAgo).catch(() => {});

    return NextResponse.json({
      globalActive: globalCount,
      routes: {
        research: researchCount,
        labNotes: labNotesCount,
        blog: blogCount
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch live stats' }, { status: 500 });
  }
}
