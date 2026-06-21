'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { MomentsButton } from '../MomentsButton';
import { MomentsParticles } from '../MomentsParticles';

const EASE = [0.16, 1, 0.3, 1];

const HEADLINE = ['Ready', 'To', 'Turn', 'Your', 'Feelings', 'Into', 'Something', 'Beautiful?'];

export function FinalCTA({ onCreate }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32">
      {/* Golden sunset gradient */}
      <div className="absolute inset-0 animate-aurora bg-[linear-gradient(180deg,#fde8c4_0%,#f59e42_45%,#f4754b_75%,#ef6f8e_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,244,222,0.5),transparent_60%)]" />
      <MomentsParticles density="lite" />

      <div className="relative z-10 max-w-4xl text-center">
        <h2 className="font-display text-5xl font-medium leading-[1.02] text-white drop-shadow-[0_2px_20px_rgba(120,50,20,0.35)] md:text-7xl">
          {HEADLINE.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '115%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
              >
                {word}
                {i < HEADLINE.length - 1 ? ' ' : ''}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          className="mt-12 flex justify-center"
        >
          <MomentsButton variant="secondary" onClick={onCreate} className="!text-cocoa">
            <Heart className="h-4 w-4 text-rose" />
            Create My Memory Website
          </MomentsButton>
        </motion.div>
      </div>
    </section>
  );
}
