'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Marquee } from '@/components/ui/Motion';
import { MomentsButton } from '@/components/moments/MomentsButton';
import { useConsultation } from '../ConsultationProvider';

const EASE = [0.16, 1, 0.3, 1];

export function FinalCTA() {
  const { open: openConsultation } = useConsultation();

  return (
    <section className="relative overflow-hidden px-6 pb-28 pt-16 md:px-12">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] px-8 py-20 text-center md:px-16 md:py-28">
          {/* warm wash */}
          <div
            className="absolute inset-0 -z-10 animate-aurora"
            style={{
              backgroundImage:
                'linear-gradient(120deg, #fde8c4, #f7a8b8 40%, #f4754b 80%)',
              opacity: 0.5,
            }}
          />
          <div className="absolute inset-0 -z-10 grain-overlay" />

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mx-auto max-w-3xl font-display text-5xl font-medium leading-[1.0] text-cocoa md:text-7xl"
          >
            Let&rsquo;s Build Something <span className="italic text-warm-gradient">Personal</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cocoa-soft"
          >
            Your story, your milestones, your name — given a home that does them justice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="mt-10 flex justify-center"
          >
            <MomentsButton variant="primary" onClick={openConsultation}>
              Start Your Project
            </MomentsButton>
          </motion.div>
        </div>

        <div className="mt-12 border-y border-white/50">
          <Marquee className="py-4" slow>
            {['Portfolios', 'Personal Brands', 'Events', 'Memory Pages', 'Resumes', 'Creators'].map(
              (t, i) => (
                <span
                  key={i}
                  className="flex items-center whitespace-nowrap px-6 text-xs uppercase tracking-[0.2em] text-cocoa-soft"
                >
                  {t}
                  <span className="mx-6 inline-block h-1 w-1 rounded-full bg-gold" />
                </span>
              ),
            )}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
