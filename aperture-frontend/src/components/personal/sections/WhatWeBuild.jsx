'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { whatWeBuild } from '../data';

const EASE = [0.16, 1, 0.3, 1];

export function WhatWeBuild() {
  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="eyebrow text-cocoa-soft">What We Build</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="Everything your presence needs."
            className="mt-5 font-display text-4xl font-medium leading-[1.05] text-cocoa md:text-6xl"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeBuild.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl liquid-glass p-7"
            >
              <span
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(circle, rgba(230,165,50,0.35), transparent 70%)',
                }}
              />
              <div className="flex items-start justify-between">
                <span className="font-display text-3xl italic text-gold">0{i + 1}</span>
                <ArrowUpRight className="h-5 w-5 text-cocoa-soft transition-all duration-500 group-hover:rotate-45 group-hover:text-sunset" />
              </div>
              <h3 className="mt-8 font-display text-2xl font-medium text-cocoa">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa-soft">{card.blurb}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
