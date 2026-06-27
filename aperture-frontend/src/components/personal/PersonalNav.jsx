'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useMode } from './ModeProvider';
import { ModeToggle } from './ModeToggle';

const NAV = [
  { key: 'home', label: 'Home' },
  { key: 'portfolio-websites', label: 'Portfolios' },
  { key: 'personal-branding', label: 'Branding' },
  { key: 'moments', label: 'Moments' },
  { key: 'events', label: 'Events' },
];

/**
 * PersonalNav — the warm nav that sits on top of the Personal overlay.
 * Mirrors the Enterprise navbar layout but in the warm palette, with the
 * same ModeToggle (so the user can morph back to Enterprise) and internal
 * view switching that never triggers a page navigation.
 */
export function PersonalNav() {
  const { view, setView } = useMode();
  const [open, setOpen] = useState(false);

  const go = (key) => {
    setView(key);
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-0 right-0 top-0 z-[70]"
    >
      <div className="container mx-auto px-6 py-5 md:px-12">
        <div className="flex items-center justify-between">
          {/* Wordmark */}
          <button onClick={() => go('home')} className="group flex items-center gap-3">
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-gold transition-transform duration-700 group-hover:rotate-180" />
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-gold to-sunset transition-transform duration-500 group-hover:scale-150" />
            </span>
            <span className="font-display text-2xl font-medium tracking-tight text-cocoa">
              Aperture <span className="text-warm-gradient italic">Personal</span>
            </span>
          </button>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <button
                key={item.key}
                onClick={() => go(item.key)}
                className={`text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${
                  view === item.key ? 'text-cocoa' : 'text-cocoa-soft hover:text-cocoa'
                }`}
              >
                {item.label}
                {view === item.key && (
                  <motion.span
                    layoutId="personal-nav-underline"
                    className="mt-1 block h-px bg-gradient-to-r from-gold to-sunset"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Toggle + mobile button */}
          <div className="flex items-center gap-3">
            <ModeToggle variant="warm" className="hidden sm:inline-flex" />
            <button
              className="text-cocoa lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-white/40 liquid-glass lg:hidden"
          >
            <div className="container mx-auto flex flex-col gap-1 px-6 py-6">
              {NAV.map((item, i) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => go(item.key)}
                  className="border-b border-white/40 py-4 text-left font-display text-3xl font-medium text-cocoa"
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="pt-5 sm:hidden">
                <ModeToggle variant="warm" size="md" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
