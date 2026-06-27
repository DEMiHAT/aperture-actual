'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { process } from '../data';

const EASE = [0.16, 1, 0.3, 1];

export function Process() {
  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="eyebrow text-cocoa-soft">The Process</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="Simple, start to launch."
            className="mt-5 font-display text-4xl font-medium leading-[1.05] text-cocoa md:text-6xl"
          />
        </div>

        <div className="relative">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-gold/40 via-sunset/40 to-rose/40 lg:block" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="relative"
              >
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-cream font-display text-lg font-medium text-gold shadow-[0_8px_24px_-10px_rgba(230,165,50,0.6)]">
                  {p.step}
                </span>
                <h3 className="mt-5 font-display text-xl font-medium text-cocoa">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa-soft">{p.blurb}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
