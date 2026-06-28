'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, GitBranch, Globe, Mail, RotateCw } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';

const links = [
  { icon: Link2, label: 'LinkedIn', value: '/in/sanjeev' },
  { icon: GitBranch, label: 'GitHub', value: '@sanjeev' },
  { icon: Globe, label: 'Portfolio', value: 'sanjeev.dev' },
  { icon: Mail, label: 'Contact', value: 'hi@sanjeev.dev' },
];

/**
 * BusinessCard — an interactive digital business card that flips between a
 * name/title front and a links back. Click or focus to flip.
 */
export function BusinessCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="eyebrow text-white/50">Digital Business Card</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="One tap. Everything that matters."
            className="mt-5 font-display text-4xl font-medium leading-[1.05] text-white md:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/50">
              Replace the paper. A living card that holds your links, your handles and a way to
              reach you — and flips to reveal it all.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <button
              onClick={() => setFlipped((f) => !f)}
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-gold"
            >
              <RotateCw className="h-4 w-4" /> Flip the card
            </button>
          </Reveal>
        </div>

        {/* Card */}
        <div className="flex justify-center [perspective:1600px]">
          <motion.button
            onClick={() => setFlipped((f) => !f)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="relative aspect-[1.6/1] w-full max-w-md"
            aria-label="Flip business card"
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full [transform-style:preserve-3d]"
            >
              {/* Front */}
              <div
                className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-7 text-left [backface-visibility:hidden]"
                style={{ background: 'linear-gradient(145deg, #2a1c12, #5b3b22)' }}
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/30 blur-2xl" />
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-white/50">
                    Aperture Personal
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-display text-4xl font-medium text-white/90">Sanjeev Sriram</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.2em] text-gold">Founder</p>
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 grid grid-cols-2 gap-3 rounded-2xl bg-zinc-900 border border-white/10 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
              >
                {links.map((l) => (
                  <div
                    key={l.label}
                    className="flex flex-col justify-center gap-1 rounded-xl border border-white/[0.12] bg-white/[0.08] p-4"
                  >
                    <l.icon className="h-4 w-4 text-gold" />
                    <span className="text-xs font-medium text-white">{l.label}</span>
                    <span className="text-[11px] text-white/50">{l.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
