'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

// Polaroid definitions — gradient stand-ins for photographs.
const POLAROIDS = [
  { caption: 'summer, 2019', from: '#fde8c4', to: '#f59e42', x: '-32%', rot: -8, depth: 1.0 },
  { caption: 'the proposal', from: '#f7a8b8', to: '#ef6f8e', x: '-12%', rot: 5, depth: 1.4 },
  { caption: 'first dance', from: '#f59e42', to: '#f4754b', x: '8%', rot: -4, depth: 0.8 },
  { caption: 'her birthday', from: '#fde8c4', to: '#ef6f8e', x: '26%', rot: 9, depth: 1.6 },
  { caption: 'just us', from: '#e6a532', to: '#f4754b', x: '40%', rot: -6, depth: 1.1 },
];

export function StoryPolaroids({ ready }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const depth = POLAROIDS[i].depth;
        gsap.fromTo(
          card,
          { y: 220 * depth, rotation: POLAROIDS[i].rot - 6, opacity: 0 },
          {
            y: -180 * depth,
            rotation: POLAROIDS[i].rot,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32"
    >
      {/* Warm light leak */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,117,75,0.18),transparent_60%)] animate-glow-pulse" />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: EASE }}
        className="font-display relative z-10 max-w-3xl text-center text-4xl font-medium leading-tight text-cocoa md:text-6xl"
      >
        Every Memory <span className="italic text-warm-gradient">Has A Story</span>
      </motion.h2>

      {/* Floating polaroids */}
      <div className="pointer-events-none relative z-0 mt-4 h-[55vh] w-full max-w-5xl">
        {POLAROIDS.map((p, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="absolute left-1/2 top-1/2 w-40 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white p-3 pb-8 shadow-[0_18px_50px_-12px_rgba(91,59,34,0.45)] md:w-52"
            style={{ marginLeft: p.x, willChange: 'transform' }}
          >
            <div
              className="aspect-square w-full rounded-[2px]"
              style={{ background: `linear-gradient(140deg, ${p.from}, ${p.to})` }}
            />
            <span className="font-display mt-3 block text-center text-sm italic text-cocoa-soft">
              {p.caption}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
