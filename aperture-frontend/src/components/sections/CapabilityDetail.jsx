'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { Button } from '@/components/ui/Button';

export function CapabilityDetail({ service, index, next }) {
  return (
    <article className="bg-paper">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line pt-36 pb-20 md:pt-44 md:pb-28">
        <span className="pointer-events-none absolute -right-10 top-20 select-none font-display text-[30vw] italic leading-none text-mist md:text-[22vw]">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <Reveal>
            <Link
              href="/#services"
              className="mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ash transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" /> All Capabilities
            </Link>
          </Reveal>

          <span className="eyebrow">Capability {String(index + 1).padStart(2, '0')}</span>
          <AnimatedHeading
            as="h1"
            text={service.title}
            className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.02] text-ink md:text-8xl"
          />
          <Reveal delay={0.2} className="mt-8 max-w-2xl">
            <p className="font-display text-2xl italic text-ash md:text-3xl">{service.tagline}</p>
          </Reveal>
        </div>
      </section>

      {/* Overview + tech */}
      <section className="border-b border-line py-20 md:py-28">
        <div className="container mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
          <Reveal className="md:col-span-3">
            <span className="eyebrow">Overview</span>
          </Reveal>
          <div className="md:col-span-9">
            <Reveal>
              <p className="max-w-3xl text-2xl leading-relaxed text-ink md:text-3xl">
                {service.overview}
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-12 flex flex-wrap gap-2">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-ink px-4 py-2 text-xs uppercase tracking-wider text-ink"
                >
                  {t}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities list */}
      <section className="border-b border-line py-20 md:py-28">
        <div className="container mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
          <Reveal className="md:col-span-3">
            <span className="eyebrow">What we deliver</span>
          </Reveal>
          <div className="md:col-span-9">
            <ul className="border-t border-line">
              {service.capabilities.map((cap, i) => (
                <Reveal key={cap} delay={i * 0.05}>
                  <li className="group flex items-center gap-6 border-b border-line py-6">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="font-display text-2xl font-medium text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                      {cap}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-line bg-ink py-20 md:py-28">
        <div className="container mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
          <Reveal className="md:col-span-3">
            <span className="text-[0.7rem] uppercase tracking-[0.28em] text-paper/50">
              How we work
            </span>
          </Reveal>
          <div className="md:col-span-9">
            <div className="grid grid-cols-1 gap-px bg-paper/15 sm:grid-cols-2">
              {service.process.map((p, i) => (
                <Reveal key={p.step} delay={i * 0.08}>
                  <div className="h-full bg-ink p-8">
                    <span className="font-display text-xl italic text-paper/40">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 font-display text-3xl font-medium text-paper">
                      {p.step}
                    </h3>
                    <p className="mt-3 leading-relaxed text-paper/60">{p.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA + next */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal className="flex flex-col items-start justify-between gap-8 border-b border-line pb-20 md:flex-row md:items-center">
            <h2 className="max-w-2xl font-display text-4xl font-medium leading-tight text-ink md:text-6xl">
              Have a project in mind?
            </h2>
            <Link href="/#book">
              <Button size="lg">Start a Project</Button>
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              href={`/services/${next.slug}`}
              className="group mt-12 flex items-center justify-between gap-6"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-smoke">
                  Next Capability
                </span>
                <p className="mt-2 font-display text-3xl font-medium text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                  {next.title}
                </p>
              </div>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink text-ink transition-all duration-500 group-hover:bg-ink group-hover:text-paper">
                <ArrowUpRight className="h-6 w-6" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
