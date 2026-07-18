'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';

export function CustomSolutionsHero() {
  // No bottom border here — the Services section below supplies its own border-t.
  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-20">
      <div className="container mx-auto px-6 md:px-12">
        <Reveal>
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ash transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </Reveal>

        <span className="eyebrow">Capabilities</span>
        <AnimatedHeading
          as="h1"
          text="Custom Solutions"
          className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.02] text-ink md:text-8xl"
        />
        <Reveal delay={0.2} className="mt-8 max-w-2xl space-y-5">
          <p className="text-lg leading-relaxed text-ash">
            Every organization has unique challenges.
          </p>
          <p className="text-lg leading-relaxed text-ash">
            When off-the-shelf software isn&rsquo;t enough, Aperture partners with
            businesses to design, engineer, and deliver software tailored to their exact
            requirements.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
