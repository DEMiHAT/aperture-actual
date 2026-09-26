// Beacon logo — theme-aware, self-contained (no external image needed). Draws in
// `currentColor`, so it inverts automatically in light vs dark.
//   • BeaconMark  — the light-ray burst (an icon: favicon, compact nav, loaders).
//   • BeaconLogo  — the full "beacon." wordmark with the burst above the "o".
// The burst scales in `em`, so BeaconLogo works at any font-size (fixed px or a
// responsive clamp() passed via `style`).
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

// The radiating light-ray burst (the "beacon" mark), in currentColor.
export function BeaconMark({
  size = 28,
  className,
  withBase = true,
}: { size?: number | string; className?: string; withBase?: boolean }) {
  const angles = [34, 48, 62, 76, 90, 104, 118, 132, 146]; // fan ~112°, centered up
  const cx = 32, cy = 40, r1 = 8, r2 = 26;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" role="img" aria-label="beacon" className={className}>
      {angles.map((a) => {
        const rad = (a * Math.PI) / 180;
        const len = r2 - Math.abs(90 - a) * 0.14; // middle rays a touch longer
        return (
          <line
            key={a}
            x1={(cx + Math.cos(rad) * r1).toFixed(1)} y1={(cy - Math.sin(rad) * r1).toFixed(1)}
            x2={(cx + Math.cos(rad) * len).toFixed(1)} y2={(cy - Math.sin(rad) * len).toFixed(1)}
            stroke="currentColor" strokeWidth={3.2} strokeLinecap="round"
          />
        );
      })}
      {withBase && <circle cx={cx} cy={46} r={4.4} fill="currentColor" />}
    </svg>
  );
}

// The "beacon." wordmark. The burst is placed by wrapping the "o" in a relative
// span and absolutely positioning the mark above it — so it stays over the "o"
// regardless of the rendered font's metrics. Pass a numeric `fontSize` OR a
// responsive size via `style={{ fontSize: "clamp(...)" }}`.
export function BeaconLogo({
  className,
  fontSize,
  showBurst = true,
  style,
}: { className?: string; fontSize?: number; showBurst?: boolean; style?: CSSProperties }) {
  return (
    <span
      className={cn("beacon-wordmark inline-flex items-baseline leading-none select-none", className)}
      style={{
        fontFamily: "'Poppins', ui-rounded, 'Segoe UI', system-ui, sans-serif",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        fontSize: fontSize ?? 22,
        ...style,
      }}
      aria-label="beacon"
    >
      bea
      <span className="relative">
        c
        <span className="relative inline-block">
          o
          {showBurst && (
            <span
              className="pointer-events-none absolute left-1/2 -translate-x-1/2"
              style={{ bottom: "62%" }}  // float the burst just above the "o"
            >
              <BeaconMark size="0.72em" withBase={false} />
            </span>
          )}
        </span>
      </span>
      n<span aria-hidden>.</span>
    </span>
  );
}

export default BeaconLogo;
