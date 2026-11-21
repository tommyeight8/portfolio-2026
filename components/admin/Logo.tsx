/* Shown on the admin login screen. */
export function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/portfolio-logo.png" alt="" width={44} height={40} />
      <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>
        TommyVong.
      </span>
    </div>
  );
}
