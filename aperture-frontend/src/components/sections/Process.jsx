'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';

const steps = [
  { title: 'Discovery', description: 'Deep dive into your business objectives, technical constraints, and market landscape.' },
  { title: 'Strategy', description: 'Formulating a robust technical architecture and product roadmap aligned with your goals.' },
  { title: 'UI/UX Design', description: 'Creating premium, user-centric interfaces and interactive prototypes.' },
  { title: 'Engineering', description: 'Agile development utilizing modern frameworks and enterprise standards.' },
  { title: 'Quality Assurance', description: 'Rigorous automated and manual testing to ensure flawless performance and security.' },
  { title: 'Deployment', description: 'Seamless cloud deployment with zero-downtime CI/CD pipelines.' },
  { title: 'Continuous Support', description: 'Ongoing maintenance, performance monitoring, and iterative enhancements.' },
];

export function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="process" ref={containerRef} className="relative border-t border-line bg-paper py-28 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-24 grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <span className="eyebrow">(05) — Methodology</span>
          </Reveal>
          <div className="md:col-span-9">
            <AnimatedHeading
              as="h2"
              text="Our development process."
              className="font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative ml-2 md:ml-0">
          {/* track */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-line md:left-[120px]" />
          {/* progress */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-0 top-0 w-px bg-ink md:left-[120px]"
          />

          <div className="flex flex-col">
            {steps.map((step, index) => (
              <Reveal
                key={step.title}
                delay={index * 0.05}
                className="group relative grid grid-cols-1 gap-4 py-10 pl-10 md:grid-cols-[120px_1fr] md:gap-12 md:pl-0"
              >
                {/* number */}
                <div className="flex items-center md:justify-end md:pr-12">
                  <span className="font-display text-2xl italic text-smoke transition-colors group-hover:text-ink">
                    0{index + 1}
                  </span>
                </div>

                {/* node */}
                <span className="absolute left-0 top-12 -translate-x-1/2 md:left-[120px]">
                  <span className="block h-3 w-3 rounded-full border border-ink bg-paper transition-all duration-300 group-hover:scale-150 group-hover:bg-ink" />
                </span>

                {/* content */}
                <div className="md:pl-4">
                  <h3 className="font-display text-3xl font-medium text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-ash">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
