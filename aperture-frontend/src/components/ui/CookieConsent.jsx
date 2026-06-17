'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'aperture-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
      } catch {
        // localStorage unavailable (private mode) — skip the banner silently.
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const decide = (choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore persistence failures
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-3xl border border-line bg-paper p-5 shadow-lg md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:p-6"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
            <p className="text-sm leading-relaxed text-ash">
              We use cookies to run this site and understand how it is used. See our{' '}
              <Link href="/privacy" className="text-ink underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <button
                onClick={() => decide('declined')}
                className="rounded-full border border-line px-5 py-2 text-xs uppercase tracking-[0.12em] text-ash transition-colors hover:border-ink hover:text-ink"
              >
                Decline
              </button>
              <button
                onClick={() => decide('accepted')}
                className="rounded-full border border-ink bg-ink px-5 py-2 text-xs uppercase tracking-[0.12em] text-paper transition-opacity hover:opacity-80"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
