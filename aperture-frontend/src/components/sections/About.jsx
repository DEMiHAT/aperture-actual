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
    body: 'To empower organisations through software ecosystems that drive sustainable growth and operational excellence.',
  },
];

const stats = [
  { value: '04', label: 'Projects shipped' },
  { value: '10+', label: 'Core service offerings' },
  { value: '20+', label: 'Technologies mastered' },
  { value: '3', label: 'Industry verticals' },
  { value: '< 3 s', label: 'Avg page load target' },
  { value: '99.9%', label: 'Uptime SLA commitment' },
];

const timeline = [
  {
    year: 'Early 2025',
    title: 'Foundation',
    body: 'Aperture is incorporated in Chennai, Tamil Nadu. Core team assembled. Development stack selected. First client engagement begins.',
  },
  {
    year: 'Mid 2025',
    title: 'First Deliveries',
    body: 'ScholarHive and the Inventory Management System both go live. Early feedback shapes our discovery-first methodology.',
  },
  {
    year: 'Late 2025',
    title: 'AI Practice Launched',
    body: 'TB Detection AI project begins in partnership with a medical research team. Formal AI/ML service offering established.',
  },
  {
    year: 'Early 2026',
    title: 'Domain Established',
    body: 'aperturewebs.co.in is registered. Professional email infrastructure deployed. Apartment Utility Platform ships to production.',
  },
  {
    year: 'June 2026',
    title: 'Official Launch',
    body: 'Public website launches. Strategy call offering goes live. First enterprise retainer signed.',
  },
];

const roadmap = [
  {
    horizon: 'H2 2026',
    title: 'Self-Service Portal',
    body: 'Launch our automated project scoping and onboarding portal — letting clients configure, estimate, and initiate projects entirely online.',
  },
  {
    horizon: 'H2 2026',
    title: 'Open Source Contributions',
    body: 'Release selected internal tooling as open source to establish technical credibility and give back to the engineering community.',
  },
  {
    horizon: '2027',
    title: 'Enterprise Partnerships',
    body: 'Formalise tier-one technology partnerships with AWS, Azure, and select SaaS platforms to expand delivery capability.',
  },
  {
    horizon: '2027',
    title: 'Expand to 3 Verticals',
    body: 'Deepen domain expertise in healthcare technology, financial infrastructure, and agri-tech — sectors where we have early proof points.',
  },
];

const recognition = [
  { label: 'Shipped to Production', detail: '4 systems live and serving real users across education, logistics, and property management' },
  { label: 'Healthcare AI in Research', detail: 'TB detection model trained and validated on curated chest-imaging data' },
  { label: 'Student-Led, Outcome-Driven', detail: 'Every engagement measured by the result it delivered — not by headcount or titles' },
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

        {/* Stats bar */}
        <Reveal className="mb-24">
          <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <div key={s.label} className="group bg-paper p-6 transition-colors hover:bg-ink">
                <p className="font-display text-3xl font-medium text-ink transition-colors group-hover:text-paper md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-smoke transition-colors group-hover:text-paper/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

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
                <li key={v} className="group flex items-center gap-6 py-5 transition-colors">
                  <span className="font-display text-lg italic text-smoke">0{i + 1}</span>
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

        {/* ── Company Journey / Timeline ── */}
        <div className="mt-28 border-t border-line pt-20">
          <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <span className="eyebrow">Our Journey</span>
            </Reveal>
            <Reveal className="md:col-span-9">
              <h3 className="font-display text-4xl font-medium text-ink md:text-5xl">
                From a blank page to production.
              </h3>
            </Reveal>
          </div>

          <div className="relative ml-2 md:ml-0">
            {/* track */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-line md:left-[160px]" />
            <div className="flex flex-col">
              {timeline.map((event, i) => (
                <Reveal
                  key={event.year}
                  delay={i * 0.06}
                  className="group relative grid grid-cols-1 gap-4 py-8 pl-10 md:grid-cols-[160px_1fr] md:gap-12 md:pl-0"
                >
                  <div className="flex items-start md:justify-end md:pr-12 md:pt-1">
                    <span className="text-xs uppercase tracking-[0.18em] text-smoke transition-colors group-hover:text-ink">
                      {event.year}
                    </span>
                  </div>
                  <span className="absolute left-0 top-10 -translate-x-1/2 md:left-[160px]">
                    <span className="block h-3 w-3 rounded-full border border-ink bg-paper transition-all duration-300 group-hover:scale-150 group-hover:bg-ink" />
                  </span>
                  <div className="md:pl-4">
                    <h4 className="font-display text-2xl font-medium text-ink transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                      {event.title}
                    </h4>
                    <p className="mt-2 max-w-lg leading-relaxed text-ash">{event.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── Roadmap ── */}
        <div className="mt-28 border-t border-line pt-20">
          <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <span className="eyebrow">Roadmap</span>
            </Reveal>
            <Reveal className="md:col-span-9">
              <h3 className="font-display text-4xl font-medium text-ink md:text-5xl">
                Where we are headed.
              </h3>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ash">
                Aperture is a studio in motion. Here is what we are building toward.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {roadmap.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="group flex h-full flex-col bg-paper p-8 transition-colors hover:bg-ink">
                  <span className="mb-4 text-[10px] uppercase tracking-[0.2em] text-smoke transition-colors group-hover:text-paper/50">
                    {item.horizon}
                  </span>
                  <h4 className="font-display text-2xl font-medium text-ink transition-colors group-hover:text-paper md:text-3xl">
                    {item.title}
                  </h4>
                  <p className="mt-4 flex-1 leading-relaxed text-ash transition-colors group-hover:text-paper/70">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Recognition & Social Proof ── */}
        <div className="mt-28 border-t border-line pt-20">
          <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <span className="eyebrow">Recognition</span>
            </Reveal>
            <Reveal className="md:col-span-9">
              <h3 className="font-display text-4xl font-medium text-ink md:text-5xl">
                Early proof points.
              </h3>
              <p className="mt-4 max-w-xl text-lg text-ash">
                We are a young studio, but not an untested one.
              </p>
            </Reveal>
          </div>

          <ul className="border-t border-line">
            {recognition.map((r, i) => (
              <Reveal key={r.label} delay={i * 0.06}>
                <li className="group flex flex-col gap-2 border-b border-line py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                  <span className="font-display text-2xl font-medium text-ink transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                    {r.label}
                  </span>
                  <span className="shrink-0 text-sm text-ash sm:text-right">{r.detail}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
