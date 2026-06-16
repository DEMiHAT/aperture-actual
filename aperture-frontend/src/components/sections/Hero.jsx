'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StartProjectButton } from '@/components/ui/StartProject';
import { Marquee } from '@/components/ui/Motion';

const EASE = [0.16, 1, 0.3, 1];

const metrics = [
  { label: 'Official Launch', value: 'June 2026' },
  { label: 'Initial Portfolio', value: '04' },
  { label: 'Core Services', value: '10+' },
  { label: 'Tech Expertise', value: '20+' },
];

const ticker = ['Software', 'Platforms', 'AI Systems', 'Cloud', 'Design', 'Automation'];

const lineVariants = {
  hidden: { y: '110%' },
  show: { y: '0%' },
};

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-paper pt-32 pb-12"
    >
      {/* Faint grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

      {/* Rotating aperture mark */}
      <motion.div
        style={{ rotate: markRotate }}
        className="pointer-events-none absolute -right-40 top-1/4 h-[640px] w-[640px] opacity-[0.06] md:opacity-100"
      >
        <ApertureMark />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 mx-auto px-6 md:px-12"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-10 flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-ink animate-blink" />
          <span className="eyebrow">Next-Generation Software Studio</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="font-display text-[15vw] font-medium leading-[0.92] tracking-[-0.02em] text-ink md:text-[11vw] lg:text-[9.5vw]"
        >
          <span className="block overflow-hidden">
            <motion.span variants={lineVariants} transition={{ duration: 1, ease: EASE }} className="block">
              Engineering
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={lineVariants} transition={{ duration: 1, ease: EASE }} className="block italic">
              Intelligent
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={lineVariants} transition={{ duration: 1, ease: EASE }} className="block">
              Experiences
            </motion.span>
          </span>
        </motion.h1>

        {/* Sub + CTA row */}
        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-line pt-10 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="max-w-md text-base leading-relaxed text-ash md:col-span-6 lg:col-span-5"
          >
            We design and engineer scalable software products, enterprise platforms, and
            AI-powered solutions that help businesses innovate, automate, and grow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            className="flex flex-wrap items-start gap-4 md:col-span-6 md:justify-end lg:col-span-7"
          >
            <StartProjectButton size="lg" />
            <Link href="#strategy-call">
              <Button variant="secondary" size="lg">
                Schedule Consultation
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Metrics */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
              className="group flex flex-col gap-2 bg-paper p-6 transition-colors duration-300 hover:bg-ink"
            >
              <span className="font-display text-4xl font-medium text-ink transition-colors duration-300 group-hover:text-paper">
                {metric.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-smoke transition-colors duration-300 group-hover:text-paper/70">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 md:flex"
      >
        <ArrowDown className="h-4 w-4 animate-bounce text-ink" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-smoke">Scroll</span>
      </motion.div>

      {/* Bottom ticker */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-line bg-paper">
        <Marquee className="py-3">
          {ticker.map((t, i) => (
            <span key={i} className="flex items-center whitespace-nowrap px-6 text-xs uppercase tracking-[0.2em] text-ash">
              {t}
              <span className="mx-6 inline-block h-1 w-1 rounded-full bg-ink" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function ApertureMark() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={i}
          x1="100"
          y1="100"
          x2={100 + 95 * Math.cos((i * Math.PI) / 3)}
          y2={100 + 95 * Math.sin((i * Math.PI) / 3)}
          stroke="#000"
          strokeWidth="0.75"
        />
      ))}
      <circle cx="100" cy="100" r="95" stroke="#000" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="64" stroke="#000" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="32" stroke="#000" strokeWidth="0.75" />
      <polygon
        points="100,40 152,70 152,130 100,160 48,130 48,70"
        stroke="#000"
        strokeWidth="0.75"
        fill="none"
      />
    </svg>
  );
}
