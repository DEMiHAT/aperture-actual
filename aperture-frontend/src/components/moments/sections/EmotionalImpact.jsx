'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MomentsParticles } from '../MomentsParticles';

const EASE = [0.16, 1, 0.3, 1];

const LINE_1 = 'A Gift Lasts A Day.';
const LINE_2 = 'A Memory Lasts Forever.';

function Letters({ text, className, baseDelay = 0, gradient = false }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={`inline-block ${gradient ? 'text-warm-gradient' : ''}`}
          initial={{ opacity: 0, y: '0.5em', filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6, delay: baseDelay + i * 0.035, ease: EASE }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}

export function EmotionalImpact() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32">
      {/* Cinematic warm backdrop */}
      <div className="absolute inset-0 animate-aurora bg-[linear-gradient(120deg,#5b3b22,#7a4a26,#b9612f,#e6a532)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(50,28,12,0.55))]" />
      <MomentsParticles density="lite" />

      <h2 className="font-display relative z-10 max-w-4xl text-center text-4xl font-medium leading-[1.1] text-cream md:text-7xl">
        <Letters text={LINE_1} className="block" />
        <Letters text={LINE_2} className="mt-2 block" baseDelay={LINE_1.length * 0.035 + 0.2} gradient />
      </h2>
    </section>
  );
}
