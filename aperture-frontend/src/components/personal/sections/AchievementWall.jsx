'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { achievements } from '../data';

const EASE = [0.16, 1, 0.3, 1];

/**
 * AchievementWall — animated badges that lift and reveal their story on
 * hover/focus.
 */
export function AchievementWall() {
  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="eyebrow text-white/50">Achievement Wall</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="Proof, not promises."
            className="mt-5 font-display text-4xl font-medium leading-[1.05] text-white md:text-6xl"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -8 }}
              className="group relative h-56 overflow-hidden rounded-2xl dark-glass p-6"
            >
              <div className="flex h-full flex-col">
                <motion.span
                  className="text-5xl"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  {a.icon}
                </motion.span>
                <h3 className="mt-auto font-display text-xl font-medium text-white">{a.label}</h3>
              </div>

              {/* story reveal */}
              <div className="absolute inset-0 flex translate-y-full flex-col justify-end bg-gradient-to-t from-black/95 via-black/85 to-transparent p-6 text-white transition-transform duration-500 group-hover:translate-y-0">
                <span className="text-2xl">{a.icon}</span>
                <h3 className="mt-2 font-display text-lg font-medium">{a.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{a.story}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
