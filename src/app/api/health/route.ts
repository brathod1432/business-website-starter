import { NextResponse } from 'next/server';

/** Health check for uptime monitors / load balancers. */
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: typeof process !== 'undefined' ? process.uptime() : undefined,
  });
}
