'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, AnimatedHeading, Marquee } from '@/components/ui/Motion';
import { useConsultation } from '@/components/personal/ConsultationProvider';

const perks = [
  'Free 30-minute consultation',
  'Tailored technical roadmap',
  'No obligation, no sales pressure',
];

export function StrategyCall() {
  const { open: openConsultation } = useConsultation();
  return (
    <section
      id="strategy-call"
      className="relative overflow-hidden border-t border-line bg-paper py-24 md:py-32"
    >
      {/* Rotating decorative ring */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-dashed border-line animate-spin-slow" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="eyebrow flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-ink animate-blink" />
                Let&rsquo;s talk
              </span>
            </Reveal>
            <AnimatedHeading
              as="h2"
              text="Book a strategy call."
              className="mt-6 font-display text-6xl font-medium leading-[0.95] text-ink md:text-8xl"
            />
            <Reveal delay={0.2} className="mt-8 max-w-xl">
              <p className="text-lg leading-relaxed text-ash">
                Tell us where you want to go and we&rsquo;ll map how to get there. A focused
                session with our founding engineers — architecture, scope, and a clear path
                forward.
              </p>
            </Reveal>
          </div>

          {/* Big circular CTA */}
          <div className="flex justify-start lg:col-span-4 lg:justify-end">
            <Reveal delay={0.1}>
              <button
                type="button"
                onClick={openConsultation}
                aria-label="Book a strategy call"
              >
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative flex h-48 w-48 items-center justify-center rounded-full bg-ink md:h-60 md:w-60"
                >
                  {/* rotating label ring */}
                  <span className="absolute inset-0 animate-spin-slow">
                    <CircularText />
                  </span>
                  <ArrowUpRight className="h-12 w-12 text-paper transition-transform duration-500 group-hover:rotate-45" />
                </motion.div>
              </button>
            </Reveal>
          </div>
        </div>

        {/* Perks row */}
        <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          {perks.map((perk, i) => (
            <Reveal key={perk} delay={i * 0.08}>
              <div className="flex h-full items-center gap-4 bg-paper p-6">
                <span className="font-display text-2xl italic text-smoke">0{i + 1}</span>
                <span className="text-sm font-medium text-ink">{perk}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="mt-20 border-y border-line">
        <Marquee className="py-4">
          {['Strategy', 'Architecture', 'Scope', 'Roadmap', 'Estimate', 'Kickoff'].map((t, i) => (
            <span
              key={i}
              className="flex items-center whitespace-nowrap px-6 text-xs uppercase tracking-[0.2em] text-ash"
            >
              {t}
              <span className="mx-6 inline-block h-1 w-1 rounded-full bg-ink" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function CircularText() {
  const text = 'BOOK A STRATEGY CALL · BOOK A STRATEGY CALL · ';
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <defs>
        <path
          id="circlePath"
          d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
          fill="none"
        />
      </defs>
      <text fill="#ffffff" className="text-[10px] uppercase tracking-[0.2em]">
        <textPath href="#circlePath" style={{ fontSize: '11px', letterSpacing: '0.18em' }}>
          {text}
        </textPath>
      </text>
    </svg>
  );
}
