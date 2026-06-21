'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { processSteps } from '../data';

const EASE = [0.16, 1, 0.3, 1];

export function Process() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-20 text-center"
        >
          <span className="text-[11px] uppercase tracking-[0.24em] text-gold">How it works</span>
          <h2 className="font-display mt-3 text-4xl font-medium text-cocoa md:text-6xl">
            Four Steps To <span className="italic text-warm-gradient">A Smile</span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
          {/* Glowing connector line (desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.6, ease: EASE }}
            className="pointer-events-none absolute left-0 right-0 top-10 hidden h-[2px] origin-left bg-gradient-to-r from-gold via-sunset to-rose md:block"
            style={{ boxShadow: '0 0 16px rgba(244,117,75,0.6)' }}
          />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: EASE }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full liquid-glass warm-glow text-3xl">
                {step.emoji}
              </div>
              <span className="font-display mt-5 text-sm font-medium tracking-[0.2em] text-gold">
                {step.n}
              </span>
              <h3 className="font-display mt-2 text-xl font-medium text-cocoa">{step.title}</h3>
              <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-cocoa-soft">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
