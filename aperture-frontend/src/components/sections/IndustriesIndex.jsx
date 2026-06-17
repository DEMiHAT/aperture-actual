'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';

export function IndustriesIndex({ industries }) {
  return (
    <article className="bg-paper">
      <section className="relative border-b border-line pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal>
            <Link
              href="/"
              className="mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ash transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
          </Reveal>

          <span className="eyebrow">Industries</span>
          <AnimatedHeading
            as="h1"
            text="Solutions shaped to your sector."
            className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.02] text-ink md:text-8xl"
          />
          <Reveal delay={0.2} className="mt-8 max-w-2xl">
            <p className="text-lg leading-relaxed text-ash">
              The fundamentals of good engineering are universal — but the problems are not.
              Here is how we apply our work to the realities of specific industries.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={(i % 3) * 0.07}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex h-full flex-col bg-paper p-8 transition-colors duration-500 hover:bg-ink md:p-10"
                >
                  <span className="font-display text-lg italic text-smoke transition-colors group-hover:text-paper/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-medium text-ink transition-colors duration-500 group-hover:text-paper md:text-4xl">
                    {industry.title}
                  </h2>
                  <p className="mt-4 flex-1 leading-relaxed text-ash transition-colors duration-500 group-hover:text-paper/70">
                    {industry.description}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-ink transition-colors group-hover:text-paper">
                    Explore
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
