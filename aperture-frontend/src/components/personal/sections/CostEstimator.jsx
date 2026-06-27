'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { MomentsButton } from '@/components/moments/MomentsButton';
import { useConsultation } from '../ConsultationProvider';
import { estimatorTypes } from '../data';

const EASE = [0.16, 1, 0.3, 1];

/**
 * CostEstimator — a playful slider across project types that reveals a
 * relative range (no exact prices, per brief) and nudges toward a quote.
 */
export function CostEstimator() {
  const { open: openConsultation } = useConsultation();
  const [index, setIndex] = useState(0);
  const active = estimatorTypes[index];

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <span className="eyebrow text-cocoa-soft">Cost Estimator</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="Find your range in seconds."
            className="mt-5 font-display text-4xl font-medium leading-[1.05] text-cocoa md:text-6xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="rounded-2xl liquid-glass p-7 md:p-10"
        >
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-cocoa-soft">
                What are we building?
              </span>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={active.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-4xl font-medium text-cocoa md:text-5xl"
                >
                  {active.label}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* bars */}
            <div className="flex items-end gap-1.5">
              {[1, 2, 3].map((b) => (
                <motion.span
                  key={b}
                  animate={{
                    height: b <= active.bars ? 16 + b * 14 : 12,
                    opacity: b <= active.bars ? 1 : 0.25,
                  }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="w-6 rounded-t bg-gradient-to-t from-gold to-sunset"
                />
              ))}
            </div>
          </div>

          <div className="mt-7">
            <input
              type="range"
              min={0}
              max={estimatorTypes.length - 1}
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
              aria-label="Choose a project type"
              className="memory-range w-full"
            />
            <div className="mt-3 flex justify-between">
              {estimatorTypes.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => setIndex(i)}
                  className={`text-[11px] font-medium transition-colors ${
                    i === index ? 'text-cocoa' : 'text-cocoa-soft hover:text-cocoa'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/50 pt-6 sm:flex-row sm:items-center">
            <p className="text-cocoa-soft">
              Approx. tier:{' '}
              <span className="font-medium text-warm-gradient">{active.range}</span>
            </p>
            <MomentsButton variant="secondary" magnetic={false} onClick={openConsultation}>
              Request a precise quote
            </MomentsButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
