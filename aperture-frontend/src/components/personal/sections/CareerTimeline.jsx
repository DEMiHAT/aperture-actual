'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Image as ImageIcon, FolderGit2, Award } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { careerMilestones } from '../data';

const EASE = [0.16, 1, 0.3, 1];

const TAG_ICON = {
  Certificate: Award,
  Project: FolderGit2,
  Photo: ImageIcon,
  Document: FileText,
};

/**
 * CareerTimeline — interactive vertical timeline; clicking a milestone
 * reveals its attached certificate / photo / project / document.
 */
export function CareerTimeline() {
  const [open, setOpen] = useState(careerMilestones.length - 1);

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="eyebrow text-white/50">Career Timeline</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="Every milestone, in its place."
            className="mt-5 font-display text-4xl font-medium leading-[1.05] text-white md:text-6xl"
          />
        </div>

        <div className="relative pl-8">
          {/* spine */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold via-sunset to-rose" />

          {careerMilestones.map((m, i) => {
            const isOpen = open === i;
            const Icon = TAG_ICON[m.tag] || FileText;
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
                className="relative pb-8 last:pb-0"
              >
                <span
                  className={`absolute -left-8 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                    isOpen ? 'border-sunset bg-sunset' : 'border-gold bg-black'
                  }`}
                />
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="text-left">
                  <span className="font-display text-sm italic text-gold">{m.year}</span>
                  <h3 className="font-display text-2xl font-medium text-white">{m.title}</h3>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 flex items-center gap-4 rounded-xl border border-white/[0.12] bg-white/[0.07] p-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold/20 to-sunset/20 text-gold">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm text-white/50">{m.detail}</p>
                          <span className="mt-1 inline-block text-[10px] uppercase tracking-[0.16em] text-gold">
                            {m.tag} attached
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
