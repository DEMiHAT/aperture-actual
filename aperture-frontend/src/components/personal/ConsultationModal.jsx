'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, User, ArrowUpRight } from 'lucide-react';
import { useConsultation } from './ConsultationProvider';
import { useMode } from './ModeProvider';
import { site } from '@/lib/site';

const EASE = [0.16, 1, 0.3, 1];

/**
 * ConsultationModal — the "Choose Your Consultation" chooser triggered by
 * Strategy Call CTAs across the site. Enterprise routes to the existing
 * booking section (/#book); Personal opens the warm Personal division and
 * lands on its booking/contact flow.
 */
export function ConsultationModal() {
  const { isOpen, close } = useConsultation();
  const { enterPersonal, exitPersonal, isPersonal } = useMode();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  const chooseEnterprise = () => {
    close();
    // Leave Personal (if active) so the Enterprise booking section is visible.
    exitPersonal();
    if (typeof window !== 'undefined') {
      // Wait a tick for the overlay to begin dismissing, then jump to booking.
      setTimeout(() => {
        document.body.style.overflow = '';
        const el = document.getElementById('book');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.assign('/#book');
        }
      }, 80);
    }
  };

  const choosePersonal = () => {
    close();
    if (isPersonal) {
      // Already inside Personal — hand off to the personal booking workflow.
      if (typeof window !== 'undefined') {
        window.location.assign(
          `mailto:${site.email.projects}?subject=${encodeURIComponent(
            'Personal Consultation Request',
          )}`,
        );
      }
    } else {
      // Redirect into the warm Personal division.
      enterPersonal('home');
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center md:items-center"
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />

          <motion.div
            variants={{ hidden: { opacity: 0, y: 48 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative z-10 w-full max-w-2xl overflow-hidden border border-line bg-paper"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-4 md:px-8">
              <span className="eyebrow flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-ink animate-blink" />
                Choose your consultation
              </span>
              <button
                onClick={close}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Intro */}
            <div className="px-6 pt-8 md:px-8">
              <h3 className="font-display text-4xl font-medium leading-tight text-ink md:text-5xl">
                Which path is yours?
              </h3>
              <p className="mt-3 max-w-lg leading-relaxed text-ash">
                Tell us who we&rsquo;d be building for, and we&rsquo;ll point you to the right
                conversation.
              </p>
            </div>

            {/* Options */}
            <div className="mt-8 grid grid-cols-1 gap-px border-t border-line bg-line sm:grid-cols-2">
              <button
                onClick={chooseEnterprise}
                className="group flex flex-col items-start gap-4 bg-paper p-6 text-left transition-colors hover:bg-ink md:p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink text-ink transition-colors group-hover:border-paper group-hover:text-paper">
                  <Building2 className="h-5 w-5" />
                </span>
                <span className="font-display text-2xl font-medium text-ink transition-colors group-hover:text-paper">
                  Enterprise Consultation
                </span>
                <span className="text-sm leading-relaxed text-ash transition-colors group-hover:text-paper/70">
                  Software, AI, Automation, Business Solutions.
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.16em] text-smoke transition-colors group-hover:text-paper">
                  Book enterprise call
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </button>

              <button
                onClick={choosePersonal}
                className="group relative flex flex-col items-start gap-4 bg-paper p-6 text-left transition-colors hover:bg-[#3a2415] md:p-8"
              >
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(ellipse 80% 80% at 30% 0%, rgba(230,165,50,0.25), transparent 70%)',
                  }}
                />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold">
                  <User className="h-5 w-5" />
                </span>
                <span className="relative font-display text-2xl font-medium text-ink transition-colors group-hover:text-cream">
                  Personal Consultation
                </span>
                <span className="relative text-sm leading-relaxed text-ash transition-colors group-hover:text-cream/75">
                  Portfolios, Personal Brands, Events, Memory Pages.
                </span>
                <span className="relative mt-2 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                  Enter Aperture Personal
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
