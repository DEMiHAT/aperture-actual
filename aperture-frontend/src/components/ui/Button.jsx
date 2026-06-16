'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Monochrome button variants — black & white only
const variants = {
  // Solid black, inverts to white-on-black->black-on-white via wipe
  primary: 'bg-ink text-paper border border-ink',
  // Outline black on white
  secondary: 'bg-paper text-ink border border-ink',
  // Text only
  ghost: 'bg-transparent text-ink border border-transparent hover:border-line',
};

const sizes = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-sm',
  lg: 'px-9 py-4 text-sm',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) {
  const isFilled = variant === 'primary';

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium uppercase tracking-[0.12em] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none',
        isFilled ? 'hover:text-ink' : 'hover:text-paper',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {/* Wipe layer */}
      <span
        className={cn(
          'absolute inset-0 z-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isFilled
            ? 'bg-paper translate-y-full group-hover:translate-y-0'
            : 'bg-ink translate-y-full group-hover:translate-y-0'
        )}
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
