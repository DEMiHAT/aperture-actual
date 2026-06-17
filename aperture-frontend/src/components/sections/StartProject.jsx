'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, ArrowUpRight, MessageCircle } from 'lucide-react';
import { cn } from '@/components/ui/Button';
import { site } from '@/lib/site';

const PHONE = site.phone.display;
const PHONE_HREF = `tel:${site.phone.display.replace(/\s+/g, '')}`;
const EMAIL_HELLO = site.email.general;
const EMAIL_CONTACT = site.email.projects;
const WHATSAPP_HREF = site.phone.whatsapp;

const sizes = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-sm',
  lg: 'px-9 py-4 text-sm',
};

export function StartProjectButton({ size = 'md', className, label = 'Start a Project' }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center justify-center rounded-full border border-ink bg-ink font-medium uppercase tracking-[0.12em] text-paper transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
          sizes[size],
          className
        )}
      >
        {label}
      </button>
      <StartProjectModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function StartProjectModal({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center md:items-center"
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg overflow-hidden border border-line bg-paper"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-4 md:px-8">
              <span className="eyebrow flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-ink animate-blink" />
                Heads up
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-8 md:px-8 md:py-10">
              <h3 className="font-display text-4xl font-medium leading-tight text-ink md:text-5xl">
                Our self-service portal is underway.
              </h3>
              <p className="mt-5 leading-relaxed text-ash">
                We&rsquo;re building an automated, self-service way to scope and start your
                project online. While it&rsquo;s being finished, please reach out directly —
                we&rsquo;d love to discuss what you&rsquo;re building.
              </p>

              {/* Contact options */}
              <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
                <a
                  href={PHONE_HREF}
                  className="group flex flex-col gap-2 bg-paper p-5 transition-colors hover:bg-ink"
                >
                  <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-smoke transition-colors group-hover:text-paper/60">
                    <Phone className="h-3.5 w-3.5" /> Call us
                  </span>
                  <span className="text-lg font-medium text-ink transition-colors group-hover:text-paper">
                    {PHONE}
                  </span>
                </a>
                <a
                  href={`mailto:${EMAIL_CONTACT}`}
                  className="group flex flex-col gap-2 bg-paper p-5 transition-colors hover:bg-ink"
                >
                  <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-smoke transition-colors group-hover:text-paper/60">
                    <Mail className="h-3.5 w-3.5" /> Email us
                  </span>
                  <span className="break-all text-lg font-medium text-ink transition-colors group-hover:text-paper">
                    {EMAIL_CONTACT}
                  </span>
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 bg-paper p-5 transition-colors hover:bg-ink sm:col-span-2"
                >
                  <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-smoke transition-colors group-hover:text-paper/60">
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Business
                  </span>
                  <span className="text-lg font-medium text-ink transition-colors group-hover:text-paper">
                    Chat with us instantly → wa.me/919003472654
                  </span>
                </a>
              </div>

              {/* General enquiries */}
              <p className="mt-4 text-xs text-smoke">
                General enquiries:{' '}
                <a href={`mailto:${EMAIL_HELLO}`} className="text-ink underline hover:no-underline">
                  {EMAIL_HELLO}
                </a>
              </p>

              {/* Book a call */}
              <Link href="/#strategy-call" onClick={onClose} className="mt-4 block">
                <button className="group flex w-full items-center justify-between rounded-full bg-ink px-7 py-4 text-paper">
                  <span className="text-sm font-medium uppercase tracking-[0.12em]">
                    Book a strategy call
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
