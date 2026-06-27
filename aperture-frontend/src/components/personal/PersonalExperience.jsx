'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMode } from './ModeProvider';
import { PersonalNav } from './PersonalNav';
import { MomentsParticles } from '@/components/moments/MomentsParticles';

import { Hero } from './sections/Hero';
import { WhatWeBuild } from './sections/WhatWeBuild';
import { WhyAperture } from './sections/WhyAperture';
import { Showcase } from './sections/Showcase';
import { DeviceCarousel } from './sections/DeviceCarousel';
import { SkillOrbit } from './sections/SkillOrbit';
import { AchievementWall } from './sections/AchievementWall';
import { BusinessCard } from './sections/BusinessCard';
import { ResumeMode } from './sections/ResumeMode';
import { CareerTimeline } from './sections/CareerTimeline';
import { MomentsGallery } from './sections/MomentsGallery';
import { EventsShowcase } from './sections/EventsShowcase';
import { CostEstimator } from './sections/CostEstimator';
import { StoryQuiz } from './sections/StoryQuiz';
import { Process } from './sections/Process';
import { Pricing } from './sections/Pricing';
import { FAQ } from './sections/FAQ';
import { FinalCTA } from './sections/FinalCTA';
import { ViewIntro } from './sections/ViewIntro';

const EASE = [0.16, 1, 0.3, 1];

function HomeView() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <WhyAperture />
      <Showcase />
      <DeviceCarousel />
      <SkillOrbit />
      <AchievementWall />
      <BusinessCard />
      <CareerTimeline />
      <MomentsGallery />
      <CostEstimator />
      <StoryQuiz />
      <Process />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}

function PortfolioView() {
  return (
    <>
      <ViewIntro
        eyebrow="Portfolio Websites"
        title="Work that speaks before you do."
        body="A portfolio is the first handshake you never get to be in the room for. We make sure it lands — clean, fast and unmistakably you."
      />
      <Showcase />
      <DeviceCarousel />
      <CostEstimator />
      <Process />
      <Pricing />
      <FinalCTA />
    </>
  );
}

function BrandingView() {
  return (
    <>
      <ViewIntro
        eyebrow="Personal Branding"
        title="A presence that works while you sleep."
        body="Your name is a brand whether you tend to it or not. We give it a home that signals exactly who you are and where you're going."
      />
      <BusinessCard />
      <ResumeMode />
      <SkillOrbit />
      <AchievementWall />
      <CareerTimeline />
      <FinalCTA />
    </>
  );
}

function MomentsView() {
  return (
    <>
      <ViewIntro
        eyebrow="Moments"
        title="Some moments should never fade."
        body="Family milestones, weddings, graduations, the quiet wins. We build beautiful digital spaces that hold them — long after the day is gone."
      />
      <MomentsGallery />
      <FinalCTA />
    </>
  );
}

function EventsView() {
  return (
    <>
      <ViewIntro
        eyebrow="Event Websites"
        title="One link for the whole celebration."
        body="Weddings, reunions, milestones — everything your guests need and everything you'll want to remember, gathered in one elegant place."
      />
      <EventsShowcase />
      <MomentsGallery />
      <Process />
      <FinalCTA />
    </>
  );
}

const VIEWS = {
  home: HomeView,
  'portfolio-websites': PortfolioView,
  'personal-branding': BrandingView,
  moments: MomentsView,
  events: EventsView,
};

/**
 * PersonalExperience — the warm Personal-division overlay. Mirrors
 * MomentsExperience: owns its own scroll container (isolated from the
 * Enterprise site dissolving underneath), animates a "warm up" entrance,
 * and swaps the inner view without any page navigation.
 */
export function PersonalExperience() {
  const { view } = useMode();
  const scrollRef = useRef(null);
  const ViewComp = VIEWS[view] || HomeView;

  // Reset scroll to top whenever the sub-view changes.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  return (
    <motion.div
      key="personal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed inset-0 z-[60]"
    >
      {/* Warm base wash that fades in over the dissolving mono site */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute inset-0 bg-cream"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(253,232,196,0.95), transparent 60%), radial-gradient(ellipse 70% 50% at 85% 100%, rgba(247,168,184,0.45), transparent 60%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(245,158,66,0.3), transparent 60%)',
        }}
      />

      {/* Ambient particles (reuse the Moments atmosphere) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
        className="pointer-events-none absolute inset-0"
      >
        <MomentsParticles density="full" />
      </motion.div>

      <PersonalNav />

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="relative h-full w-full overflow-y-auto overflow-x-hidden"
      >
        <div className="relative text-cocoa">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <ViewComp />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
