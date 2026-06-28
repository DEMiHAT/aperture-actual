'use client';

import React, { useMemo } from 'react';

// Deterministic pseudo-random so positions are stable (no hydration jitter).
function makeRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

/**
 * PersonalAtmosphere — monochrome ambience for the dark Personal overlay:
 * a faint grid, soft white glow orbs and drifting white particles. Pure
 * CSS transform/opacity animation (reuses the keyframes in globals.css).
 */
export function PersonalAtmosphere() {
  const { particles, orbs } = useMemo(() => {
    const rng = makeRng(20260628);
    const particles = Array.from({ length: 32 }, (_, i) => ({
      id: i,
      left: rng() * 100,
      top: rng() * 100,
      size: 1.5 + rng() * 3,
      opacity: 0.25 + rng() * 0.5,
      delay: rng() * 9,
      duration: 8 + rng() * 8,
    }));
    const orbs = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: rng() * 100,
      top: rng() * 100,
      size: 160 + rng() * 280,
      delay: rng() * 7,
      duration: 7 + rng() * 8,
    }));
    return { particles, orbs };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* soft white glow orbs */}
      {orbs.map((o) => (
        <div
          key={`orb-${o.id}`}
          className="absolute rounded-full animate-glow-pulse"
          style={{
            left: `${o.left}%`,
            top: `${o.top}%`,
            width: `${o.size}px`,
            height: `${o.size}px`,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 70%)',
            filter: 'blur(8px)',
            animationDelay: `${o.delay}s`,
            animationDuration: `${o.duration}s`,
          }}
        />
      ))}

      {/* drifting white particles */}
      {particles.map((p) => (
        <div
          key={`p-${p.id}`}
          className="absolute rounded-full animate-drift"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `rgba(255,255,255,${p.opacity})`,
            boxShadow: `0 0 ${p.size * 3}px rgba(255,255,255,${p.opacity * 0.8})`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
