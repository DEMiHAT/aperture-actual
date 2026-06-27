'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * WebsiteMock — a believable miniature personal website rendered purely
 * from props. Drives the hero Preview Generator, the Theme Switcher and the
 * Device Preview Carousel, so one source of truth covers all of them.
 *
 * `theme` is a preset { bg, ink, accent }. `type` selects the layout flavour.
 */

const TYPE_LABELS = {
  student: { tag: 'Student Portfolio', nav: ['Work', 'About', 'Resume'], cta: 'Hire me' },
  creator: { tag: 'Creator', nav: ['Videos', 'Shop', 'Links'], cta: 'Subscribe' },
  brand: { tag: 'Personal Brand', nav: ['About', 'Speaking', 'Contact'], cta: "Let's talk" },
  memory: { tag: 'Memory Page', nav: ['Story', 'Gallery', 'Timeline'], cta: 'Leave a note' },
};

export function WebsiteMock({
  name = 'Sanjeev',
  role = 'Builder',
  type = 'student',
  theme = { bg: '#fbf7f0', ink: '#5b3b22', accent: '#e6a532' },
}) {
  const t = TYPE_LABELS[type] || TYPE_LABELS.student;
  const muted = hexToRgba(theme.ink, 0.55);
  const faint = hexToRgba(theme.ink, 0.12);
  const accentFaint = hexToRgba(theme.accent, 0.18);

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden"
      style={{ background: theme.bg, color: theme.ink, fontFamily: 'var(--font-sans)' }}
    >
      {/* Mock top bar */}
      <div
        className="flex items-center justify-between px-[5%] py-[3%]"
        style={{ borderBottom: `1px solid ${faint}` }}
      >
        <span className="text-[2.4cqw] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-silian)' }}>
          {name}
        </span>
        <div className="flex items-center gap-[3%]">
          {t.nav.map((n) => (
            <span key={n} className="text-[1.8cqw]" style={{ color: muted }}>
              {n}
            </span>
          ))}
          <span
            className="rounded-full px-[3%] py-[1%] text-[1.8cqw] font-medium"
            style={{ background: theme.accent, color: theme.bg }}
          >
            {t.cta}
          </span>
        </div>
      </div>

      {/* Hero band */}
      <div className="flex flex-1 flex-col justify-center gap-[2.5%] px-[6%]">
        <span
          className="w-fit rounded-full px-[3%] py-[1%] text-[1.7cqw] uppercase tracking-[0.2em]"
          style={{ background: accentFaint, color: theme.accent }}
        >
          {t.tag}
        </span>
        <h1
          className="text-[7cqw] font-medium leading-[1.02]"
          style={{ fontFamily: 'var(--font-silian)' }}
        >
          Hi, I&rsquo;m {name}.
        </h1>
        <p className="text-[2.6cqw]" style={{ color: muted }}>
          {role} — building things worth sharing.
        </p>
        <div className="mt-[1%] flex gap-[3%]">
          <span
            className="rounded-full px-[4%] py-[1.6%] text-[2cqw] font-medium"
            style={{ background: theme.ink, color: theme.bg }}
          >
            View work
          </span>
          <span
            className="rounded-full px-[4%] py-[1.6%] text-[2cqw] font-medium"
            style={{ border: `1px solid ${faint}` }}
          >
            Contact
          </span>
        </div>
      </div>

      {/* Content tiles */}
      <div className="grid grid-cols-3 gap-[2%] px-[6%] pb-[6%]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-[1cqw] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accentFaint}, ${faint})`,
              border: `1px solid ${faint}`,
            }}
          >
            <div className="h-[58%] w-full" style={{ background: hexToRgba(theme.accent, 0.22) }} />
            <div className="space-y-[8%] p-[8%]">
              <div className="h-[1.4cqw] w-[70%] rounded-full" style={{ background: faint }} />
              <div className="h-[1.4cqw] w-[45%] rounded-full" style={{ background: faint }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** LaptopFrame — a clean laptop chrome wrapping any children (the mock). */
export function LaptopFrame({ children, className = '' }) {
  return (
    <div className={`w-full ${className}`}>
      <div
        className="relative rounded-[1.4rem] border border-white/60 bg-white/70 p-2 shadow-[0_30px_80px_-30px_rgba(91,59,34,0.5)] backdrop-blur"
        style={{ containerType: 'inline-size' }}
      >
        {/* camera dot */}
        <div className="mx-auto mb-2 h-1.5 w-1.5 rounded-full bg-cocoa/20" />
        <div className="aspect-[16/10] overflow-hidden rounded-lg bg-white">{children}</div>
      </div>
      {/* base */}
      <div className="mx-auto h-2.5 w-[112%] -translate-x-[5%] rounded-b-2xl bg-gradient-to-b from-white/80 to-honey/60 shadow-[0_18px_30px_-18px_rgba(91,59,34,0.5)]" />
    </div>
  );
}

/** PhoneFrame */
export function PhoneFrame({ children, className = '' }) {
  return (
    <div
      className={`relative rounded-[1.6rem] border border-white/60 bg-white/70 p-1.5 shadow-[0_24px_60px_-24px_rgba(91,59,34,0.5)] backdrop-blur ${className}`}
      style={{ containerType: 'inline-size' }}
    >
      <div className="absolute left-1/2 top-2 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-cocoa/20" />
      <div className="aspect-[9/19] overflow-hidden rounded-[1.2rem] bg-white">{children}</div>
    </div>
  );
}

/** TabletFrame */
export function TabletFrame({ children, className = '' }) {
  return (
    <div
      className={`relative rounded-[1.4rem] border border-white/60 bg-white/70 p-2 shadow-[0_24px_60px_-24px_rgba(91,59,34,0.5)] backdrop-blur ${className}`}
      style={{ containerType: 'inline-size' }}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-white">{children}</div>
    </div>
  );
}

/** DesktopFrame */
export function DesktopFrame({ children, className = '' }) {
  return (
    <div className={`w-full ${className}`}>
      <div
        className="relative rounded-xl border border-white/60 bg-white/70 p-2 shadow-[0_30px_80px_-30px_rgba(91,59,34,0.5)] backdrop-blur"
        style={{ containerType: 'inline-size' }}
      >
        <div className="aspect-[16/9] overflow-hidden rounded-md bg-white">{children}</div>
      </div>
      <div className="mx-auto h-6 w-10 bg-gradient-to-b from-white/80 to-honey/60" />
      <div className="mx-auto h-1.5 w-32 rounded-full bg-honey/70" />
    </div>
  );
}

/** AnimatedMock — fades/scales the mock when its key props change. */
export function AnimatedMock({ mockKey, children }) {
  return (
    <motion.div
      key={mockKey}
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
