'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/ui/Motion';

const EASE = [0.16, 1, 0.3, 1];

const experience = [
  { role: 'Founder', org: 'Independent Studio', period: '2024 — Now' },
  { role: 'Product Developer', org: 'Early-stage Startup', period: '2022 — 2024' },
  { role: 'Design Intern', org: 'Creative Agency', period: '2021' },
];
const skills = ['Product', 'Design', 'React', 'Branding', 'Motion', 'Strategy'];

/**
 * ResumeMode — Live Resume Mode: switch the same identity between a
 * "Website" presentation and a clean "Resume" layout without leaving.
 */
export function ResumeMode() {
  const [mode, setMode] = useState('website');

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <span className="eyebrow text-white/50">Live Resume Mode</span>
            </Reveal>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] text-white md:text-5xl">
              Website or resume — same you, one click.
            </h2>
          </div>

          {/* toggle */}
          <div className="inline-flex rounded-full border border-white/[0.12] bg-white/[0.06] p-1 backdrop-blur">
            {['website', 'resume'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                  mode === m ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="resume-toggle"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-gold to-sunset"
                  />
                )}
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-2xl dark-glass p-7 md:p-10">
          <AnimatePresence mode="wait">
            {mode === 'website' ? (
              <motion.div
                key="website"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gold">
                  Personal Brand
                </span>
                <h3 className="mt-5 font-display text-5xl font-medium text-white md:text-6xl">
                  Hi, I&rsquo;m Sanjeev.
                </h3>
                <p className="mt-3 max-w-lg text-lg text-white/50">
                  Founder & builder. I design products people actually enjoy using.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/[0.12] bg-white/[0.07] px-4 py-1.5 text-sm text-white"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="resume"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="grid grid-cols-1 gap-8 md:grid-cols-3"
              >
                <div>
                  <h3 className="font-display text-3xl font-medium text-white">Sanjeev Sriram</h3>
                  <p className="mt-1 text-sm text-white/50">Founder · Builder</p>
                  <div className="mt-5 space-y-1 text-sm text-white/50">
                    <p>hi@sanjeev.dev</p>
                    <p>sanjeev.dev</p>
                    <p>Chennai, India</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span key={s} className="rounded bg-white/[0.08] px-2 py-1 text-[11px] text-white">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Experience
                  </span>
                  <div className="mt-3 divide-y divide-white/50">
                    {experience.map((e) => (
                      <div key={e.role} className="flex items-baseline justify-between py-3">
                        <div>
                          <p className="font-medium text-white">{e.role}</p>
                          <p className="text-sm text-white/50">{e.org}</p>
                        </div>
                        <span className="text-xs text-white/50">{e.period}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
