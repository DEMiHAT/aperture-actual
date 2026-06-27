'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { memoryYears } from '../data';

const EASE = [0.16, 1, 0.3, 1];

// Floating polaroids — scattered, gently rotated.
const polaroids = [
  { caption: 'The first day', rotate: -7, x: '4%', y: '8%', tone: '#fde8c4' },
  { caption: 'Together', rotate: 5, x: '60%', y: '2%', tone: '#f7a8b8' },
  { caption: 'The big win', rotate: -4, x: '30%', y: '40%', tone: '#f4b78c' },
  { caption: 'Home', rotate: 8, x: '70%', y: '46%', tone: '#f4754b' },
  { caption: 'Always', rotate: -9, x: '2%', y: '52%', tone: '#ef6f8e' },
];

/**
 * MomentsGallery — a scrapbook of floating polaroids plus the Memory Time
 * Machine: drag the year and the moment updates instantly.
 */
export function MomentsGallery() {
  const [index, setIndex] = useState(memoryYears.length - 1);
  const active = memoryYears[index];

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <span className="eyebrow text-cocoa-soft">Memory Gallery</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="Some moments should never fade."
            className="mt-5 font-display text-4xl font-medium leading-[1.05] text-cocoa md:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-lg text-cocoa-soft">
              Weddings, graduations, birthdays, the quiet everyday. We give them a home — arranged
              like the scrapbook you always meant to make.
            </p>
          </Reveal>
        </div>

        {/* Floating polaroids */}
        <div className="relative mb-14 h-[440px] w-full">
          {polaroids.map((p, i) => (
            <motion.div
              key={p.caption}
              initial={{ opacity: 0, y: 30, rotate: p.rotate }}
              whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              className="absolute w-44 cursor-grab rounded-sm bg-white p-3 pb-10 shadow-[0_18px_40px_-18px_rgba(91,59,34,0.6)] md:w-52"
              style={{ left: p.x, top: p.y }}
            >
              <div
                className="aspect-square w-full animate-float"
                style={{
                  background: `linear-gradient(135deg, ${p.tone}, #fff8ef)`,
                  animationDelay: `${i * 0.7}s`,
                }}
              />
              <span className="absolute bottom-3 left-0 right-0 text-center font-display text-sm italic text-cocoa-soft">
                {p.caption}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Memory Time Machine */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="rounded-2xl liquid-glass p-7 md:p-10"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.22em] text-cocoa-soft">
              Memory Time Machine
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={active.year}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="font-display text-5xl font-medium text-warm-gradient md:text-7xl"
              >
                {active.year}
              </motion.span>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.year}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-5 h-32 overflow-hidden rounded-xl"
              style={{ background: `linear-gradient(135deg, ${active.tone}, #fff8ef)` }}
            >
              <div className="flex h-full items-end p-5">
                <span className="font-display text-2xl italic text-cocoa">{active.caption}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* slider */}
          <div className="mt-7">
            <input
              type="range"
              min={0}
              max={memoryYears.length - 1}
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
              aria-label="Drag through the years"
              className="memory-range w-full"
            />
            <div className="mt-3 flex justify-between">
              {memoryYears.map((m, i) => (
                <button
                  key={m.year}
                  onClick={() => setIndex(i)}
                  className={`text-[11px] font-medium transition-colors ${
                    i === index ? 'text-cocoa' : 'text-cocoa-soft hover:text-cocoa'
                  }`}
                >
                  {m.year}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
