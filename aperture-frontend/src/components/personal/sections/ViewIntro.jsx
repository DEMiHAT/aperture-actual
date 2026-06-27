'use client';

import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * ViewIntro — the warm hero header used at the top of each Personal
 * sub-view (Portfolios, Branding, Moments, Events).
 */
export function ViewIntro({ eyebrow, title, body }) {
  const words = String(title).split(' ');
  return (
    <section className="relative px-6 pt-36 pb-12 md:px-12 md:pt-44">
      <div className="container mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full liquid-glass px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-cocoa-soft"
        >
          {eyebrow}
        </motion.span>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.0] text-cocoa md:text-7xl">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: EASE }}
              >
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-cocoa-soft"
        >
          {body}
        </motion.p>
      </div>
    </section>
  );
}
