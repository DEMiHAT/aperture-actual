'use client';

import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { useMode } from './ModeProvider';

/**
 * ModeToggle — animated segmented pill [ Enterprise | Personal ].
 * A single sliding indicator (shared layoutId) glides under the active
 * label. Two visual variants so it reads correctly on the monochrome
 * Enterprise navbar and on the warm Personal nav.
 */
export function ModeToggle({ variant = 'enterprise', className = '', size = 'sm' }) {
  const { mode, enterPersonal, exitPersonal } = useMode();
  const isPersonal = mode === 'personal';
  // Unique per-instance id so the sliding indicator animates *within* this
  // toggle and never jumps between the desktop/mobile copies.
  const indicatorId = useId();

  const warm = variant === 'warm';

  const dims =
    size === 'sm'
      ? 'text-[11px] tracking-[0.14em] gap-0.5 p-0.5'
      : 'text-xs tracking-[0.16em] gap-1 p-1';
  const pad = size === 'sm' ? 'px-3.5 py-1.5' : 'px-5 py-2.5';

  // `warm` variant now means the *Personal* (dark) context: white indicator
  // on a translucent track. Enterprise stays black-on-white.
  const track = warm
    ? 'border-white/20 bg-white/10 backdrop-blur-md'
    : 'border-line bg-mist/70 backdrop-blur';

  const indicator = warm
    ? 'bg-white shadow-[0_4px_18px_-4px_rgba(255,255,255,0.5)]'
    : 'bg-ink';

  const select = (target) => {
    if (target === 'personal' && !isPersonal) enterPersonal('home');
    if (target === 'enterprise' && isPersonal) exitPersonal();
  };

  const labelColor = (active) => {
    if (active) return warm ? 'text-black' : 'text-paper';
    return warm ? 'text-white/60 hover:text-white' : 'text-ash hover:text-ink';
  };

  const options = [
    { key: 'enterprise', label: 'Enterprise', active: !isPersonal },
    { key: 'personal', label: 'Personal', active: isPersonal },
  ];

  return (
    <div
      role="tablist"
      aria-label="Site mode"
      className={`relative inline-flex items-center rounded-full border font-medium uppercase ${dims} ${track} ${className}`}
    >
      {options.map((opt) => (
        <button
          key={opt.key}
          role="tab"
          aria-selected={opt.active}
          onClick={() => select(opt.key)}
          className={`relative z-10 rounded-full ${pad} transition-colors duration-300 ${labelColor(
            opt.active,
          )}`}
        >
          {opt.active && (
            <motion.span
              layoutId={`mode-indicator-${indicatorId}`}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className={`absolute inset-0 -z-10 rounded-full ${indicator}`}
            />
          )}
          {opt.label}
        </button>
      ))}
    </div>
  );
}
