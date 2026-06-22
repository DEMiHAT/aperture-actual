'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Check, Loader2 } from 'lucide-react';
import { useNotify } from '@/components/forms/useNotify';
import { MomentsButton } from './MomentsButton';

const EASE = [0.16, 1, 0.3, 1];

const OCCASIONS = [
  'Birthday',
  'Anniversary',
  'Apology / Sorry',
  'Proposal',
  "Father's Day",
  "Mother's Day",
  'Graduation',
  'Custom Moment',
];

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  occasion: OCCASIONS[0],
  recipient: '',
  message: '',
};

/**
 * MomentsRegister — warm liquid-glass modal for "Create A Memory".
 * Posts to /api/notify (type: moments) → aperture.websites@gmail.com.
 */
export function MomentsRegister({ open, onClose }) {
  const [values, setValues] = useState(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const { submit, status, error, reset } = useNotify('moments');

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  // Reset to a clean form each time the modal opens.
  useEffect(() => {
    if (open) {
      setValues(EMPTY);
      setHoneypot('');
      reset();
    }
  }, [open, reset]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    await submit(values, { company_website: honeypot });
  };

  if (typeof document === 'undefined') return null;

  const field =
    'w-full rounded-xl border border-white/60 bg-white/55 px-4 py-3 text-base text-cocoa caret-cocoa placeholder-cocoa-soft/60 outline-none transition-colors focus:border-gold';
  const label = 'text-[10px] uppercase tracking-[0.2em] text-cocoa-soft';

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center md:items-center"
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-cocoa/40 backdrop-blur-sm"
          />

          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl liquid-glass warm-glow md:rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 md:px-8">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
                <Heart className="h-3.5 w-3.5 text-rose" /> Create A Memory
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 text-cocoa transition-colors hover:bg-cocoa hover:text-cream"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {status === 'success' ? (
              <div className="flex flex-col items-center px-6 py-16 text-center md:px-8">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-sunset text-white">
                  <Check className="h-7 w-7" strokeWidth={3} />
                </span>
                <h3 className="font-display mt-6 text-3xl font-medium text-cocoa">
                  Your moment is on its way.
                </h3>
                <p className="mt-3 max-w-sm text-cocoa-soft">
                  We&rsquo;ve received your details — our team will reach out shortly to start
                  crafting something beautiful.
                </p>
                <div className="mt-8">
                  <MomentsButton variant="secondary" magnetic={false} onClick={onClose}>
                    Close
                  </MomentsButton>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="px-6 pb-8 md:px-8">
                <p className="mb-6 text-sm leading-relaxed text-cocoa-soft">
                  Tell us a little about the moment you want to create — we&rsquo;ll take it from
                  there.
                </p>

                {/* Honeypot */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className={label}>Your Name *</label>
                    <input required name="name" value={values.name} onChange={onChange} className={field} placeholder="Your name" />
                  </div>
                  <div className="space-y-1.5">
                    <label className={label}>Email *</label>
                    <input required type="email" name="email" value={values.email} onChange={onChange} className={field} placeholder="you@email.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className={label}>Phone</label>
                    <input name="phone" value={values.phone} onChange={onChange} className={field} placeholder="+91 90000 00000" />
                  </div>
                  <div className="space-y-1.5">
                    <label className={label}>Occasion</label>
                    <select name="occasion" value={values.occasion} onChange={onChange} className={field}>
                      {OCCASIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5">
                  <label className={label}>Who is it for?</label>
                  <input name="recipient" value={values.recipient} onChange={onChange} className={field} placeholder="e.g. My wife, Meera" />
                </div>

                <div className="mt-4 space-y-1.5">
                  <label className={label}>Tell us the story</label>
                  <textarea
                    rows="3"
                    name="message"
                    value={values.message}
                    onChange={onChange}
                    className={field + ' resize-none'}
                    placeholder="Share the feeling, names, dates, or anything special..."
                  />
                </div>

                {status === 'error' && (
                  <p className="mt-5 rounded-xl border border-rose/40 bg-rose/10 px-4 py-3 text-sm text-cocoa">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="warm-glow mt-7 flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.14em] text-white transition-opacity disabled:opacity-60"
                  style={{ background: 'linear-gradient(120deg, #e6a532, #f4754b 55%, #ef6f8e)' }}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4" /> Create My Memory
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
