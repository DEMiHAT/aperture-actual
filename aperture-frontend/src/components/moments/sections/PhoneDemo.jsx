'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { phoneScreens } from '../data';

const EASE = [0.16, 1, 0.3, 1];

export function PhoneDemo({ ready }) {
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      ScrollTriggerSetup(sectionRef.current, (p) => {
        const i = Math.min(
          phoneScreens.length - 1,
          Math.floor(p * phoneScreens.length)
        );
        setIndex(i);
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [ready]);

  const screen = phoneScreens[index];

  return (
    <section ref={sectionRef} className="relative" style={{ height: '320vh' }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-display mb-10 max-w-2xl text-center text-3xl font-medium text-cocoa md:text-5xl"
        >
          One link. <span className="italic text-warm-gradient">Every feeling.</span>
        </motion.h2>

        {/* Phone mockup */}
        <div className="relative h-[560px] w-[280px] rounded-[3rem] border-[10px] border-cocoa/85 bg-cocoa/90 shadow-[0_40px_90px_-20px_rgba(91,59,34,0.55)] warm-glow">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-cocoa" />
          {/* Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[2.2rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen.key}
                initial={{ opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                style={{ background: `linear-gradient(160deg, ${screen.from}, ${screen.to})` }}
              >
                <span className="text-6xl drop-shadow">{screen.emoji}</span>
                <h3 className="font-display mt-6 text-3xl font-medium leading-tight text-white drop-shadow">
                  {screen.title}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/85">
                  {screen.subtitle}
                </p>
                <span className="mt-8 rounded-full bg-white/25 px-5 py-2 text-xs uppercase tracking-[0.16em] text-white backdrop-blur">
                  Open the memory
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Screen indicators */}
        <div className="mt-8 flex items-center gap-3">
          {phoneScreens.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <span
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === index ? 'w-8 bg-gradient-to-r from-gold to-sunset' : 'w-2 bg-cocoa/25'
                }`}
              />
            </div>
          ))}
        </div>
        <span className="mt-3 text-[11px] uppercase tracking-[0.22em] text-cocoa-soft">
          {screen.label} site
        </span>
      </div>
    </section>
  );
}

// Helper kept outside the component to avoid re-creation churn.
function ScrollTriggerSetup(trigger, onProgress) {
  gsap.to(trigger, {
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => onProgress(self.progress),
    },
  });
}
