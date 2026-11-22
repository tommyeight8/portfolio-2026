/**
 * Server-side Cloudflare Turnstile verification.
 *
 * Turnstile is active only when TURNSTILE_SECRET_KEY is set. Without it every
 * check passes, so the site still works before the keys are configured.
 */
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Name of the short-lived cookie the admin login widget stores its token in. */
export const TURNSTILE_COOKIE = "cf-turnstile-token";

export function turnstileEnabled() {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: string | null | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      body: new URLSearchParams({ secret, response: token }),
    });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    // Cloudflare unreachable: fail closed rather than let unchecked requests through.
    console.error("Turnstile verification request failed", error);
    return false;
  }
}

export function readCookie(header: string | null | undefined, name: string): string | null {
  for (const part of (header ?? "").split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}
