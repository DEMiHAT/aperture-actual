'use client';

import React, { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMomentsScroll } from './useMomentsScroll';
import { MomentsParticles } from './MomentsParticles';
import { MomentsNav } from './MomentsNav';
import { MomentsRegister } from './MomentsRegister';
import { Hero } from './sections/Hero';
import { StoryPolaroids } from './sections/StoryPolaroids';
import { Timeline } from './sections/Timeline';
import { PhoneDemo } from './sections/PhoneDemo';
import { EmotionalImpact } from './sections/EmotionalImpact';
import { Pricing } from './sections/Pricing';
import { Process } from './sections/Process';
import { MemoryWall } from './sections/MemoryWall';
import { FinalCTA } from './sections/FinalCTA';

const EASE = [0.16, 1, 0.3, 1];

/**
 * MomentsExperience — the warm portal overlay. Owns its own scroll
 * container (so Lenis + ScrollTrigger run isolated from the tech site
 * underneath), animates the 1.5s "dissolve into warmth" entrance, and
 * assembles every section.
 */
export function MomentsExperience() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const { ready } = useMomentsScroll(wrapperRef, contentRef);
  const [registerOpen, setRegisterOpen] = useState(false);

  // CTA helpers — scroll the user to the relevant section.
  const scrollTo = useCallback((selector) => {
    const el = wrapperRef.current?.querySelector(selector);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // "Create A Memory" opens the registration modal; "View Experiences" scrolls.
  const onCreate = useCallback(() => setRegisterOpen(true), []);
  const onExplore = useCallback(() => scrollTo('#moments-timeline'), [scrollTo]);

  return (
    <motion.div
      key="moments-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed inset-0 z-[60]"
    >
      {/* Warm base wash that fades in over the dissolving mono site (1.5s) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: EASE }}
        className="absolute inset-0 bg-cream"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(253,232,196,0.9), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 100%, rgba(247,168,184,0.5), transparent 60%)',
        }}
      />

      {/* Ambient particle atmosphere (fixed, behind scrolling content) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
        className="absolute inset-0"
      >
        <MomentsParticles density="full" />
      </motion.div>

      <MomentsNav />

      {/* Scroll container (Lenis wrapper) */}
      <div
        ref={wrapperRef}
        className="relative h-full w-full overflow-y-auto overflow-x-hidden"
      >
        <div ref={contentRef} className="relative text-cocoa">
          <Hero onCreate={onCreate} onExplore={onExplore} />
          <StoryPolaroids ready={ready} />
          <div id="moments-timeline">
            <Timeline ready={ready} />
          </div>
          <PhoneDemo ready={ready} />
          <EmotionalImpact />
          <div id="moments-pricing">
            <Pricing onCreate={onCreate} />
          </div>
          <Process />
          <MemoryWall />
          <FinalCTA onCreate={onCreate} />
        </div>
      </div>

      <MomentsRegister open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </motion.div>
  );
}
