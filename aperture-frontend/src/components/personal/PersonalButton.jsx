'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Motion';

/**
 * PersonalButton — monochrome CTA for Aperture Personal (black bg / white
 * elements, the inverse of Enterprise). Primary = solid white on black;
 * secondary = outlined white. Subtle shimmer + magnetic pull.
 */
export function PersonalButton({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary'
  className,
  magnetic = true,
}) {
  const isPrimary = variant === 'primary';

  const btn = (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-300',
        isPrimary
          ? 'mono-glow bg-white text-black'
          : 'border border-white/40 bg-transparent text-white hover:border-white',
        className,
      )}
    >
      {/* Shimmer sweep */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span
          className={cn(
            'absolute inset-y-0 -left-1/3 w-1/3 animate-shimmer blur-md',
            isPrimary ? 'bg-black/15' : 'bg-white/25',
          )}
        />
      </span>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );

  return magnetic ? <Magnetic strength={0.25}>{btn}</Magnetic> : btn;
}
