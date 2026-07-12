import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export const runtime = 'edge';

// Image metadata
export const alt = 'Param Patel — AI/ML Engineer, Full Stack Engineer & Builder';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1a1a1a, #0a0a0a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            backgroundImage:
              'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.1) 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            opacity: 0.3,
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 10,
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: '0 0 20px 0',
              background: 'linear-gradient(to right, #fff, #a1a1aa)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {SITE_NAME}
          </h1>
          <p
            style={{
              fontSize: 32,
              color: '#a1a1aa',
              margin: '0 0 30px 0',
              fontWeight: 500,
              maxWidth: '800px',
            }}
          >
            AI/ML Engineer • Full Stack Engineer • Builder
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#71717a',
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            {SITE_URL.replace('https://', '')}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
