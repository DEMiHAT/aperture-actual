'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { timelineCards } from '../data';

const EASE = [0.16, 1, 0.3, 1];

export function Timeline({ ready }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const mq = window.matchMedia('(min-width: 768px)');
    if (!mq.matches) return; // mobile uses vertical fallback below

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const distance = () => track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance() + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:h-screen md:py-0">
      <div className="md:flex md:h-full md:flex-col md:justify-center">
        <div className="mb-12 px-6 md:mb-10 md:px-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[11px] uppercase tracking-[0.24em] text-gold"
          >
            A moment for everything
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display mt-3 text-4xl font-medium text-cocoa md:text-6xl"
          >
            A Memory <span className="italic text-warm-gradient">Timeline</span>
          </motion.h2>
        </div>

        {/* Horizontal track (md+) / vertical stack (mobile) */}
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-6 md:flex-row md:gap-8 md:px-12 md:will-change-transform"
        >
          {timelineCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.05, ease: EASE }}
              className="tl-card group relative flex w-full shrink-0 flex-col justify-between rounded-3xl liquid-glass p-7 md:w-[320px]"
            >
              <div className="text-5xl">{card.emoji}</div>
              <div className="mt-8">
                <h3 className="font-display text-2xl font-medium text-cocoa">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cocoa-soft">{card.desc}</p>
              </div>
              <span className="mt-6 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-sunset transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
