'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { whyPoints } from '../data';

const EASE = [0.16, 1, 0.3, 1];

export function WhyAperture() {
  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="eyebrow text-cocoa-soft">Why Aperture</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="Designed Around You"
            className="mt-5 font-display text-5xl font-medium leading-[1.0] text-cocoa md:text-7xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cocoa-soft">
              The same craft we bring to enterprise platforms, turned toward something more
              personal — you, and the impression you leave.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/50 bg-white/30 sm:grid-cols-2 lg:col-span-7">
          {whyPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: EASE }}
              className="group bg-cream/40 p-7 transition-colors duration-500 hover:bg-white/60"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold to-sunset text-sm font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-medium text-cocoa">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa-soft">{point.blurb}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
