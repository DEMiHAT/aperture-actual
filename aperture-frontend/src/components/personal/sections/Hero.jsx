'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { MomentsButton } from '@/components/moments/MomentsButton';
import { useMode } from '../ModeProvider';
import { useConsultation } from '../ConsultationProvider';
import { heroRoles, previewSites, themePresets } from '../data';
import { WebsiteMock, LaptopFrame, AnimatedMock } from './Mock';

const EASE = [0.16, 1, 0.3, 1];
const HEADLINE = ['Your', 'Story', 'Deserves', 'a', 'Digital', 'Home'];

export function Hero() {
  const { setView } = useMode();
  const { open: openConsultation } = useConsultation();

  // --- Dynamic Identity Builder -------------------------------------------
  const [name, setName] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const displayName = name.trim() || 'Sanjeev';

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % heroRoles.length), 2200);
    return () => clearInterval(id);
  }, []);

  // --- Preview Generator + Theme Switcher ---------------------------------
  const [previewIndex, setPreviewIndex] = useState(0);
  const [theme, setTheme] = useState(themePresets[0]);
  const userPickedPreview = useRef(false);

  // Auto-cycle the preview until the visitor interacts.
  useEffect(() => {
    const id = setInterval(() => {
      if (userPickedPreview.current) return;
      setPreviewIndex((i) => (i + 1) % previewSites.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const activePreview = previewSites[previewIndex];

  return (
    <section className="relative grid min-h-screen grid-cols-1 items-center gap-12 px-6 pt-28 pb-20 md:px-12 lg:grid-cols-2 lg:gap-8 lg:pt-24">
      {/* ---- Left: copy + identity builder ---- */}
      <div className="relative z-10 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mb-7 inline-flex items-center gap-2 rounded-full liquid-glass px-4 py-2"
        >
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          <span className="text-[10px] uppercase tracking-[0.24em] text-cocoa-soft">
            Aperture Personal
          </span>
        </motion.div>

        <h1 className="font-display text-5xl font-medium leading-[1.0] tracking-tight text-cocoa md:text-6xl lg:text-7xl">
          {HEADLINE.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className={`inline-block ${i === 1 || i === 4 || i === 5 ? 'italic text-warm-gradient' : ''}`}
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: 0.55 + i * 0.08, ease: EASE }}
              >
                {word}
                {i < HEADLINE.length - 1 ? ' ' : ''}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: EASE }}
          className="mt-7 max-w-md text-lg leading-relaxed text-cocoa-soft"
        >
          We build beautiful digital experiences for individuals, creators, students, and
          professionals.
        </motion.p>

        {/* Dynamic Identity Builder */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.25, ease: EASE }}
          className="mt-8 rounded-2xl liquid-glass p-5"
        >
          <label className="text-[10px] uppercase tracking-[0.22em] text-cocoa-soft">
            Try it — type your name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sanjeev"
            maxLength={24}
            className="mt-2 w-full bg-transparent font-display text-3xl font-medium text-cocoa placeholder-cocoa/30 focus:outline-none"
          />
          <div className="mt-3 flex items-baseline gap-2 border-t border-white/50 pt-3">
            <span className="font-display text-xl text-cocoa">Hi, I&rsquo;m {displayName}.</span>
            <span className="flex items-center gap-2 text-sm text-cocoa-soft">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-warm-gradient font-medium"
                >
                  {heroRoles[roleIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="text-cocoa/40">• Builder</span>
            </span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <MomentsButton variant="primary" onClick={openConsultation}>
            Start Your Project
          </MomentsButton>
          <MomentsButton variant="secondary" onClick={() => setView('portfolio-websites')}>
            View Examples
          </MomentsButton>
        </motion.div>
      </div>

      {/* ---- Right: live preview ---- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
        className="relative z-10 mx-auto w-full max-w-lg"
      >
        <div className="animate-float">
          <LaptopFrame>
            <AnimatePresence mode="wait">
              <AnimatedMock mockKey={`${activePreview.key}-${theme.key}`}>
                <WebsiteMock
                  name={displayName}
                  role={heroRoles[roleIndex]}
                  type={activePreview.key}
                  theme={theme}
                />
              </AnimatedMock>
            </AnimatePresence>
          </LaptopFrame>
        </div>

        {/* Preview type tabs */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {previewSites.map((p, i) => (
            <button
              key={p.key}
              onClick={() => {
                userPickedPreview.current = true;
                setPreviewIndex(i);
              }}
              className={`rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-all ${
                previewIndex === i
                  ? 'border-transparent bg-gradient-to-r from-gold to-sunset text-white shadow-[0_6px_18px_-6px_rgba(244,117,75,0.6)]'
                  : 'border-white/60 text-cocoa-soft hover:text-cocoa'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Theme switcher */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.22em] text-cocoa-soft">
            Preview a style
          </span>
          <div className="flex items-center gap-2">
            {themePresets.map((preset) => (
              <button
                key={preset.key}
                onClick={() => setTheme(preset)}
                aria-label={preset.label}
                title={preset.label}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-all ${
                  theme.key === preset.key
                    ? 'border-cocoa/30 bg-white/70 text-cocoa'
                    : 'border-white/50 text-cocoa-soft hover:text-cocoa'
                }`}
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: preset.accent, boxShadow: `inset 0 0 0 2px ${preset.bg}` }}
                />
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cocoa-soft lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.22em]">Scroll to explore</span>
        <ArrowRight className="h-4 w-4 rotate-90 animate-bounce" />
      </motion.div>
    </section>
  );
}
