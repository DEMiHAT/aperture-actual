'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { pricing } from '../data';
import { MomentsButton } from '../MomentsButton';

const EASE = [0.16, 1, 0.3, 1];

export function Pricing({ onCreate }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-32">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center"
        >
          <span className="text-[11px] uppercase tracking-[0.24em] text-gold">
            One simple price
          </span>
          <h2 className="font-display mt-3 text-4xl font-medium text-cocoa md:text-5xl">
            Everything <span className="italic text-warm-gradient">Included</span>
          </h2>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
          className="relative mt-10 overflow-hidden rounded-[2rem] liquid-glass p-8 warm-glow"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(244,117,75,0.35),transparent_70%)] animate-glow-pulse" />

          <div className="flex items-end justify-center gap-1">
            <span className="font-display text-6xl font-medium text-cocoa">{pricing.price}</span>
            <span className="mb-2 text-sm text-cocoa-soft">/ memory</span>
          </div>

          <ul className="mt-8 space-y-3">
            {pricing.includes.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="flex items-center gap-3 text-cocoa"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-gold to-sunset text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-8">
            <MomentsButton variant="primary" className="w-full justify-center" onClick={onCreate}>
              Create A Memory
            </MomentsButton>
          </div>
        </motion.div>

        {/* Add-ons */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {pricing.addons.map((addon, i) => (
            <motion.div
              key={addon.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE }}
              className="rounded-2xl liquid-glass p-4 text-center"
            >
              <Plus className="mx-auto h-4 w-4 text-gold" />
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-cocoa-soft">{addon.name}</p>
              <p className="font-display mt-1 text-xl font-medium text-cocoa">{addon.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
