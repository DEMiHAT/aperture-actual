'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { showcase, themePresets } from '../data';
import { WebsiteMock } from './Mock';

const EASE = [0.16, 1, 0.3, 1];

const TYPE_FOR = {
  professional: 'student',
  creative: 'creator',
  minimal: 'brand',
  premium: 'memory',
};

function themeFor(key) {
  return themePresets.find((t) => t.key === key) || themePresets[0];
}

/**
 * Showcase — sample personal sites. Clicking a card expands it fullscreen
 * (Apple-style shared-element morph via framer layoutId) instead of routing
 * away, revealing a live preview, achievements and a mini timeline.
 */
export function Showcase() {
  const [active, setActive] = useState(null);

  // Esc closes the expanded card.
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="eyebrow text-white/50">Showcase</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="A few sites we'd be proud of."
            className="mt-5 font-display text-4xl font-medium leading-[1.05] text-white md:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-lg text-white/50">
              Sample concepts — tap any one to step inside.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((item, i) => {
            const theme = themeFor(item.theme);
            return (
              <motion.button
                key={item.name}
                layoutId={`card-${item.name}`}
                onClick={() => setActive(item)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.07] text-left shadow-[0_18px_50px_-30px_rgba(0,0,0,0.6)] backdrop-blur"
              >
                <motion.div layoutId={`media-${item.name}`} className="aspect-[4/3] overflow-hidden" style={{ containerType: 'inline-size' }}>
                  <WebsiteMock
                    name={item.name.split(' ')[0]}
                    role={item.role}
                    type={TYPE_FOR[item.theme]}
                    theme={theme}
                  />
                </motion.div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <h3 className="font-display text-xl font-medium text-white">{item.name}</h3>
                    <p className="text-sm text-white/50">{item.role}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/50 transition-all duration-500 group-hover:rotate-45 group-hover:text-sunset" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <ExpandedCard active={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ExpandedCard({ active, onClose }) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {active && (
        <motion.div className="fixed inset-0 z-[85] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            layoutId={`card-${active.name}`}
            className="relative z-10 flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-[1.6rem] border border-white/[0.12] bg-[#111] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="overflow-y-auto">
              <motion.div
                layoutId={`media-${active.name}`}
                className="aspect-[16/9] w-full overflow-hidden"
                style={{ containerType: 'inline-size' }}
              >
                <WebsiteMock
                  name={active.name.split(' ')[0]}
                  role={active.role}
                  type={TYPE_FOR[active.theme]}
                  theme={themeFor(active.theme)}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="p-7 md:p-10"
              >
                <span
                  className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white"
                  style={{ background: active.accent }}
                >
                  {active.role}
                </span>
                <h3 className="mt-4 font-display text-4xl font-medium text-white md:text-5xl">
                  {active.name}
                </h3>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/50">
                  {active.summary}
                </p>

                {/* Highlights / "achievements" */}
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {active.highlights.map((h) => (
                    <div
                      key={h}
                      className="rounded-xl border border-white/[0.12] bg-white/[0.08] p-4 text-center"
                    >
                      <span className="text-sm font-medium text-white">{h}</span>
                    </div>
                  ))}
                </div>

                {/* mini timeline */}
                <div className="mt-8 flex items-center gap-2">
                  {['Brief', 'Design', 'Build', 'Launch'].map((step, i) => (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center gap-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-gold to-sunset" />
                        <span className="text-[10px] uppercase tracking-[0.14em] text-white/50">
                          {step}
                        </span>
                      </div>
                      {i < 3 && <span className="h-px flex-1 bg-gold/40" />}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
