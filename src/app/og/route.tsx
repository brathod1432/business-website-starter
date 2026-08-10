import { ImageResponse } from 'next/og';

import { siteConfig } from '@/lib/site-config';

export const runtime = 'edge';

/**
 * Dynamic Open Graph image (1200x630). Referenced by `siteConfig.ogImage`
 * so every shared link gets a branded social card with zero design assets.
 * Pass `?title=` to customize per share.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title')?.slice(0, 120) ?? siteConfig.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #0b1220 0%, #12306e 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#1e5fd6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {siteConfig.shortName.charAt(0)}
          </div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1, maxWidth: 960 }}>
            {title}
          </div>
        </div>

        <div
          style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, color: '#93c5fd' }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#14b8a6' }} />
          {siteConfig.url.replace(/^https?:\/\//, '')}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
