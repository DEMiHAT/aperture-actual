'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useMoments } from './MomentsProvider';

const EASE = [0.16, 1, 0.3, 1];

/**
 * MomentsNav — warm portal navigation. The Aperture logo stays; the
 * subtext morphs from the tech tagline to the memories tagline. A
 * "Back to Technology" control returns to the monochrome site.
 */
export function MomentsNav() {
  const { close } = useMoments();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.6, ease: EASE }}
      className="fixed inset-x-0 top-0 z-[70]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        {/* Logo + morphing subtext */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-gold/70" />
            <motion.span
              className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-gold to-sunset"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
          <div className="leading-tight">
            <span className="font-display text-2xl font-medium tracking-tight text-cocoa">
              Aperture
            </span>
            {/* Subtext morph */}
            <div className="relative h-4 overflow-hidden">
              <motion.span
                key="tech"
                initial={{ y: 0 }}
                animate={{ y: '-110%' }}
                transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
                className="absolute block text-[10px] uppercase tracking-[0.22em] text-cocoa-soft/70"
              >
                Building Intelligent Systems
              </motion.span>
              <motion.span
                key="moments"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
                className="absolute block text-[10px] uppercase tracking-[0.22em] text-gold"
              >
                Preserving Beautiful Moments
              </motion.span>
            </div>
          </div>
        </div>

        {/* Back to technology */}
        <button
          onClick={close}
          className="group inline-flex items-center gap-2 rounded-full liquid-glass px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-cocoa transition-transform duration-300 hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline">Back to Technology</span>
          <span className="sm:hidden">Back</span>
        </button>
      </div>
    </motion.header>
  );
}
