'use client';

import React, { useMemo } from 'react';

// Deterministic pseudo-random so particle positions are stable across
// renders (no hydration jitter). Seeded LCG — no Math.random.
function makeRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

const PARTICLE_COLORS = [
  'rgba(255, 221, 158, 0.9)', // honey
  'rgba(247, 168, 184, 0.85)', // blush
  'rgba(244, 117, 75, 0.8)', // sunset
  'rgba(255, 244, 222, 0.95)', // cream spark
];

const BOKEH_COLORS = [
  'rgba(230, 165, 50, 0.45)',
  'rgba(247, 168, 184, 0.4)',
  'rgba(244, 117, 75, 0.38)',
  'rgba(253, 232, 196, 0.5)',
];

/**
 * MomentsParticles — warm atmosphere layer: drifting light particles,
 * soft glowing bokeh orbs and gentle light rays. Pure CSS animation
 * (transform/opacity only) for 60fps; honours prefers-reduced-motion via
 * the keyframe guards in globals.css.
 */
export function MomentsParticles({ density = 'full' }) {
  const { particles, bokeh, rays } = useMemo(() => {
    const rng = makeRng(20260621);
    const pCount = density === 'lite' ? 18 : 38;
    const bCount = density === 'lite' ? 5 : 9;

    const particles = Array.from({ length: pCount }, (_, i) => ({
      id: i,
      left: rng() * 100,
      top: rng() * 100,
      size: 2 + rng() * 5,
      color: PARTICLE_COLORS[Math.floor(rng() * PARTICLE_COLORS.length)],
      delay: rng() * 9,
      duration: 7 + rng() * 7,
    }));

    const bokeh = Array.from({ length: bCount }, (_, i) => ({
      id: i,
      left: rng() * 100,
      top: rng() * 100,
      size: 90 + rng() * 220,
      color: BOKEH_COLORS[Math.floor(rng() * BOKEH_COLORS.length)],
      delay: rng() * 7,
      duration: 6 + rng() * 8,
    }));

    const rays = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      left: 10 + i * 24 + rng() * 8,
      width: 60 + rng() * 90,
      rotate: -18 + rng() * 12,
      delay: rng() * 6,
    }));

    return { particles, bokeh, rays };
  }, [density]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Light rays */}
      {rays.map((r) => (
        <div
          key={`ray-${r.id}`}
          className="light-ray absolute -top-1/4 h-[150%] animate-glow-pulse"
          style={{
            left: `${r.left}%`,
            width: `${r.width}px`,
            transform: `rotate(${r.rotate}deg)`,
            animationDelay: `${r.delay}s`,
          }}
        />
      ))}

      {/* Bokeh orbs */}
      {bokeh.map((b) => (
        <div
          key={`bokeh-${b.id}`}
          className="bokeh absolute animate-glow-pulse"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            background: `radial-gradient(circle at 30% 30%, ${b.color}, transparent 70%)`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={`p-${p.id}`}
          className="absolute rounded-full animate-drift"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2.5}px ${p.color}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
