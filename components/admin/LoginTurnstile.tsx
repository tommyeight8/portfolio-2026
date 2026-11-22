"use client";

import { useCallback, useEffect, useState } from "react";
import { Turnstile } from "../Turnstile";

// Must match TURNSTILE_COOKIE in lib/turnstile.ts (kept literal: this file runs in the browser).
const COOKIE = "cf-turnstile-token";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function setCookie(token: string | null) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = token
    ? `${COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=300; SameSite=Strict${secure}`
    : `${COOKIE}=; Path=/; Max-Age=0; SameSite=Strict${secure}`;
}

/**
 * Turnstile check on the admin login screen.
 *
 * Payload's login form can't carry extra fields, so the token travels in a
 * short-lived cookie that the Users collection verifies before any password
 * check. A token works once, so a new one is requested after every attempt.
 */
export function LoginTurnstile() {
  const [attempt, setAttempt] = useState(0);
  const onToken = useCallback((token: string | null) => setCookie(token), []);

  useEffect(() => {
    if (!SITE_KEY) return;
    const onSubmit = () => {
      // Give the login request time to go out with the current token, then renew it.
      window.setTimeout(() => setAttempt((n) => n + 1), 1500);
    };
    document.addEventListener("submit", onSubmit, true);
    return () => document.removeEventListener("submit", onSubmit, true);
  }, []);

  if (!SITE_KEY) return null;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
      <Turnstile siteKey={SITE_KEY} onToken={onToken} resetSignal={attempt} />
    </div>
  );
}
