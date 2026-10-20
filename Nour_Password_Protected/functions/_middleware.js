/**
 * Cloudflare Pages middleware: protect every request (HTML, CSS, JS, and images)
 * with HTTP Basic Authentication. Configure SITE_PASSWORD as an encrypted
 * secret in the Cloudflare Pages project settings. Never put the password here.
 */
export async function onRequest({ request, env, next }) {
  const expectedPassword = env.SITE_PASSWORD;
  if (!expectedPassword) {
    return new Response("Site password is not configured. Set the SITE_PASSWORD secret in Cloudflare Pages settings.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const authorization = request.headers.get("Authorization") || "";
  let suppliedPassword = "";
  let valid = false;

  if (authorization.startsWith("Basic ")) {
    try {
      const decoded = atob(authorization.slice(6));
      const separator = decoded.indexOf(":");
      if (separator >= 0) suppliedPassword = decoded.slice(separator + 1);
      // Compare encoded bytes in constant time for equal-length inputs.
      const enc = new TextEncoder();
      const a = enc.encode(suppliedPassword);
      const b = enc.encode(expectedPassword);
      if (a.length === b.length) {
        let diff = 0;
        for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
        valid = diff === 0;
      }
    } catch (_) {
      valid = false;
    }
  }

  if (!valid) {
    return new Response("Enter the password to view Nour's birthday website.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Nour Birthday Website", charset="UTF-8"',
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store, private",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  const response = await next();
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, no-store, max-age=0");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
