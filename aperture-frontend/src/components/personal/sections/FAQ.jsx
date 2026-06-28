'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { faqs } from '../data';

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <span className="eyebrow text-white/50">FAQ</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="Good questions."
            className="mt-5 font-display text-4xl font-medium leading-[1.05] text-white md:text-6xl"
          />
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-white/50 overflow-hidden rounded-2xl dark-glass">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left md:px-8"
                  >
                    <span className="font-display text-xl font-medium text-white md:text-2xl">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-7 text-base leading-relaxed text-white/50 md:px-8 md:pr-16">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
