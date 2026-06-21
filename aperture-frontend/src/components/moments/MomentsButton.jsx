'use client';

import React, { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Motion';

/**
 * MomentsButton — warm liquid-glass CTA with soft glow, hover lift,
 * click ripple and magnetic pull. Reuses the existing Magnetic primitive.
 */
export function MomentsButton({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary'
  className,
  magnetic = true,
}) {
  const [ripples, setRipples] = useState([]);
  const seed = useRef(0);

  const spawnRipple = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = seed.current++;
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => setRipples((r) => r.filter((ri) => ri.id !== id)), 700);
  }, []);

  const handleClick = (e) => {
    spawnRipple(e);
    onClick?.(e);
  };

  const isPrimary = variant === 'primary';

  const btn = (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-300',
        isPrimary
          ? 'warm-glow text-white'
          : 'liquid-glass text-cocoa hover:text-cocoa',
        className
      )}
      style={
        isPrimary
          ? {
              background:
                'linear-gradient(120deg, #e6a532, #f4754b 55%, #ef6f8e)',
            }
          : undefined
      }
    >
      {/* Shimmer sweep */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/30 blur-md animate-shimmer" />
      </span>

      {/* Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/40"
          style={{
            left: r.x,
            top: r.y,
            width: 8,
            height: 8,
            transform: 'translate(-50%, -50%)',
            animation: 'moment-ripple 0.7s ease-out forwards',
          }}
        />
      ))}

      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );

  return magnetic ? <Magnetic strength={0.25}>{btn}</Magnetic> : btn;
}
