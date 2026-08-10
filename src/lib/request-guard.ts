/**
 * Lightweight CSRF defense-in-depth for JSON API routes.
 *
 * Browsers always send an `Origin` header on cross-origin `fetch`/form POSTs.
 * We reject requests whose Origin does not match the request host. When no
 * Origin header is present (server-to-server, curl, uptime checks), we allow
 * the request — those aren't CSRF vectors since CSRF relies on a victim's
 * browser attaching credentials automatically.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // No Origin → not a browser CSRF attempt.

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }

  const hostHeader = request.headers.get('host');
  const requestHost = (() => {
    try {
      return new URL(request.url).host;
    } catch {
      return undefined;
    }
  })();

  const allowed = new Set<string>();
  if (hostHeader) allowed.add(hostHeader);
  if (requestHost) allowed.add(requestHost);
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      allowed.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).host);
    } catch {
      // ignore malformed env
    }
  }

  return allowed.has(originHost);
}
