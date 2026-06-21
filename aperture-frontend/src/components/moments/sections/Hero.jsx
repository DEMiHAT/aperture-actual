'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { MomentsButton } from '../MomentsButton';

const EASE = [0.16, 1, 0.3, 1];

const HEADLINE = ['Some', 'Moments', 'Deserve', 'More', 'Than', 'A', 'Message.'];

export function Hero({ onCreate, onExplore }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
        className="mb-8 inline-flex items-center gap-2 rounded-full liquid-glass px-4 py-2"
      >
        <Sparkles className="h-3.5 w-3.5 text-gold" />
        <span className="text-[10px] uppercase tracking-[0.24em] text-cocoa-soft">
          Aperture Moments
        </span>
      </motion.div>

      {/* Headline — word by word */}
      <h1 className="font-display max-w-5xl text-5xl font-medium leading-[0.98] tracking-tight text-cocoa md:text-7xl lg:text-[5.5rem]">
        {HEADLINE.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={`inline-block ${i >= 2 && i <= 5 ? 'italic text-warm-gradient' : ''}`}
              initial={{ y: '115%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 1.05 + i * 0.1, ease: EASE }}
            >
              {word}
              {i < HEADLINE.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.9, ease: EASE }}
        className="mt-8 max-w-xl text-lg leading-relaxed text-cocoa-soft"
      >
        Turn birthdays, anniversaries, apologies, proposals and memories into
        beautiful personalized websites.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.1, ease: EASE }}
        className="mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <MomentsButton variant="primary" onClick={onCreate}>
          Create A Memory
        </MomentsButton>
        <MomentsButton variant="secondary" onClick={onExplore}>
          View Experiences
        </MomentsButton>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-cocoa-soft"
      >
        <span className="text-[10px] uppercase tracking-[0.22em]">Scroll to remember</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
