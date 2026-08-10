/**
 * Minimal in-memory, fixed-window rate limiter.
 *
 * Good enough for a single-instance deployment and to demonstrate the pattern.
 * For serverless/multi-instance production, swap the Map for a shared store
 * (Upstash Redis, Vercel KV, etc.) — the `rateLimit` signature stays the same.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, limit, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const remaining = Math.max(0, limit - existing.count);
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
  return { success: existing.count <= limit, limit, remaining, retryAfter };
}

/** Best-effort client IP extraction from proxy headers. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/** Testing helper: clear all buckets. */
export function __resetRateLimit(): void {
  buckets.clear();
}
