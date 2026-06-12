'use client';

import React from 'react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';

const paragraphs = [
  "When I started Aperture, I wasn't trying to build just another software company.",
  'I wanted to build a team that cared about the details.',
  'As students, we often see the world differently. We are naturally curious, constantly learning, and unafraid to challenge conventional approaches. While many view being student-led as a limitation, I see it as one of our greatest strengths. We bring fresh perspectives, adaptability, and a genuine passion for creating solutions that make a difference.',
  'At Aperture, we believe that great products are not defined by the number of features they have, but by how thoughtfully they solve a problem. A fast-loading website, an intuitive user experience, a seamless workflow, a reliable backend, or a simple interaction that feels effortless to the user—these are the details that matter.',
  'That is why we pay close attention to every aspect of the solutions we build.',
  'We take time to understand the people behind every project. We listen before we build. We analyze before we implement. We question assumptions, explore possibilities, and refine every element until it aligns with the vision and goals of our clients.',
  'Being student-led also means we carry an endless drive to improve. We are not constrained by "how things have always been done." Instead, we focus on how they can be done better. Every project is an opportunity to learn, innovate, and deliver something we are genuinely proud of.',
  'Aperture was founded on a simple belief: excellence comes from commitment, not titles. When passion meets discipline, and creativity meets attention to detail, remarkable things can be built.',
  "Whether you're a startup with an ambitious idea, a business looking to scale, or an organization seeking digital transformation, our promise remains the same—we will treat your project with the same care, ownership, and dedication as if it were our own.",
  'Thank you for visiting Aperture. We look forward to building something meaningful together.',
];

export function Team() {
  return (
    <section id="team" className="relative overflow-hidden border-t border-line bg-ink py-28 md:py-40">
      {/* Oversized quotation mark */}
      <span className="pointer-events-none absolute -top-10 right-6 select-none font-display text-[28vw] italic leading-none text-paper/[0.04] md:right-20 md:text-[20vw]">
        &rdquo;
      </span>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <span className="text-[0.7rem] uppercase tracking-[0.28em] text-paper/50">
              (02) — Founder&rsquo;s Note
            </span>
          </Reveal>
          <div className="md:col-span-9">
            <AnimatedHeading
              as="h2"
              text="A Note from the Founder"
              className="font-display text-5xl font-medium leading-[1.05] text-paper md:text-7xl"
            />
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-3" />
          <div className="md:col-span-9 lg:col-span-8">
            <div className="space-y-7">
              {paragraphs.map((text, i) => (
                <Reveal key={i} delay={Math.min(i * 0.04, 0.3)}>
                  <p
                    className={
                      i < 2
                        ? 'font-display text-2xl leading-snug text-paper md:text-3xl'
                        : 'text-lg leading-relaxed text-paper/70'
                    }
                  >
                    {text}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Signature */}
            <Reveal delay={0.1} className="mt-16 border-t border-paper/15 pt-10">
              <p className="font-display text-5xl italic text-paper md:text-6xl">Sanjeev</p>
              <p className="mt-4 text-[0.7rem] uppercase tracking-[0.28em] text-paper/50">
                Founder &amp; Team Lead — Aperture
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
