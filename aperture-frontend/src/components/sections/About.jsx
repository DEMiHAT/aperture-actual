'use client';

import React from 'react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';

const values = ['Innovation', 'Integrity', 'Excellence', 'Transparency', 'Continuous Learning'];

const reasons = [
  'Modern Technology Stack',
  'Scalable Architecture',
  'Product Thinking',
  'Enterprise Engineering Standards',
  'Long-Term Strategic Support',
];

const pillars = [
  {
    label: 'Vision',
    title: 'A trusted global technology partner.',
    body: 'To deliver future-ready digital solutions that transform industries and elevate human potential.',
  },
  {
    label: 'Mission',
    title: 'Scalable, secure, intelligent systems.',
    body: 'To empower organizations through software ecosystems that drive sustainable growth and operational excellence.',
  },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-line bg-paper py-28 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-24 grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <span className="eyebrow">(01) — About Aperture</span>
          </Reveal>
          <div className="md:col-span-9">
            <AnimatedHeading
              as="h2"
              text="Bridging technology and business innovation."
              className="font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl"
            />
            <Reveal delay={0.2} className="mt-10 max-w-xl">
              <p className="text-lg leading-relaxed text-ash">
                Aperture was founded with a vision to deliver world-class software
                engineering, strategic design, and intelligent automation. We build the
                digital foundation for the future.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Vision / Mission */}
        <div className="grid grid-cols-1 border-t border-line md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal
              key={p.label}
              delay={i * 0.1}
              className={`group py-14 ${i === 0 ? 'md:border-r md:border-line md:pr-14' : 'md:pl-14'}`}
            >
              <div className="mb-8 flex items-baseline justify-between">
                <span className="eyebrow">{p.label}</span>
                <span className="font-display text-2xl italic text-smoke">0{i + 1}</span>
              </div>
              <h3 className="font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
                {p.title}
              </h3>
              <p className="mt-6 max-w-md leading-relaxed text-ash">{p.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Values + Why */}
        <div className="mt-24 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Core Values</span>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {values.map((v, i) => (
                <li
                  key={v}
                  className="group flex items-center gap-6 py-5 transition-colors"
                >
                  <span className="font-display text-lg italic text-smoke">
                    0{i + 1}
                  </span>
                  <span className="font-display text-2xl font-medium text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                    {v}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <span className="eyebrow">Why Aperture</span>
            <ul className="mt-8 space-y-6">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-4 border-b border-line pb-6">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ink" />
                  <span className="text-xl text-ink">{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
