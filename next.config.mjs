/**
 * Content Security Policy.
 *
 * `'unsafe-inline'` is required for script-src because the app emits inline
 * JSON-LD structured data and next-themes injects a tiny theme bootstrap
 * script, and for style-src because Tailwind/Framer Motion apply inline
 * styles. This is the common, pragmatic policy for a statically generated
 * site. To go fully strict (nonce + 'strict-dynamic'), move CSP into
 * middleware and read a per-request nonce in the layout — note this forces
 * dynamic rendering. See docs/improvements.md.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://challenges.cloudflare.com",
  "connect-src 'self' https://www.google-analytics.com https://*.clarity.ms https://*.google-analytics.com https://challenges.cloudflare.com",
  "frame-src 'self' https://challenges.cloudflare.com",
  'upgrade-insecure-requests',
]
  .join('; ')
  .concat(';');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
