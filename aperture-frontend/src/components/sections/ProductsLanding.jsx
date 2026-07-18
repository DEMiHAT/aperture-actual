'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { StartProjectButton } from '@/components/ui/StartProject';
import { products, principles } from '@/lib/products';

/**
 * ProductMockup — monochrome placeholder panel standing in for a real
 * product screenshot. Uses the same hairline/mist vocabulary as the rest
 * of the site, with the giant display numeral idiom from CapabilityDetail.
 */
function ProductMockup({ index, title }) {
  return (
    <div className="group/mock relative aspect-[4/3] overflow-hidden border border-line bg-mist">
      {/* Blueprint rules */}
      <div className="absolute inset-0 grid grid-cols-4">
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="border-l border-line/70 first:border-l-0" />
        ))}
      </div>

      {/* Window chrome */}
      <div className="relative z-10 flex items-center gap-2 border-b border-line bg-mist px-5 py-4">
        {[0, 1, 2].map((n) => (
          <span key={n} className="h-2.5 w-2.5 rounded-full border border-smoke" />
        ))}
        <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-smoke">
          {title}
        </span>
      </div>

      {/* Giant numeral */}
      <span className="pointer-events-none absolute -right-6 bottom-[-6%] select-none font-display text-[38vw] italic leading-none text-paper transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/mock:-translate-y-3 md:text-[16vw]">
        {String(index + 1).padStart(2, '0')}
      </span>

    </div>
  );
}

export function ProductsLanding() {
  return (
    <article className="bg-paper">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative border-b border-line pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal>
            <Link
              href="/"
              className="mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ash transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
          </Reveal>

          <span className="eyebrow">Products</span>
          <AnimatedHeading
            as="h1"
            text="The Aperture Suite"
            className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.02] text-ink md:text-8xl"
          />
          <Reveal delay={0.2} className="mt-8 max-w-2xl">
            <p className="text-lg leading-relaxed text-ash">
              A growing collection of intelligent software products engineered to solve
              real-world challenges across education, developer productivity, and
              enterprise operations.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-6 max-w-2xl">
            <p className="leading-relaxed text-smoke">
              Every product within the Aperture Suite is built around the same
              philosophy—beautiful user experiences, scalable architecture, intelligent
              automation, and uncompromising engineering quality.
            </p>
          </Reveal>
          <Reveal delay={0.4} className="mt-12">
            <Link
              href="#suite"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-9 py-4 text-sm font-medium uppercase tracking-[0.12em] text-paper transition-transform hover:-translate-y-0.5"
            >
              Explore the Suite
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Product showcase — alternating alignment                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="suite" className="scroll-mt-24">
        {products.map((product, i) => {
          const flipped = i % 2 === 1;
          return (
            <div
              key={product.slug}
              className="border-b border-line py-20 md:py-28"
            >
              <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-12">
                {/* Mockup */}
                <Reveal
                  delay={0.05}
                  className={`md:col-span-7 ${flipped ? 'md:order-2' : 'md:order-1'}`}
                >
                  <ProductMockup index={i} title={product.title} />
                </Reveal>

                {/* Content */}
                <div
                  className={`md:col-span-5 ${flipped ? 'md:order-1' : 'md:order-2'}`}
                >
                  <Reveal>
                    <span className="eyebrow">
                      Product {String(i + 1).padStart(2, '0')}
                    </span>
                  </Reveal>

                  <AnimatedHeading
                    as="h2"
                    text={product.title}
                    className="mt-6 font-display text-5xl font-medium leading-[1.02] text-ink md:text-7xl"
                  />

                  <Reveal delay={0.1} className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-ink px-4 py-1.5 text-xs uppercase tracking-wider text-ink">
                      {product.category}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs uppercase tracking-wider text-paper">
                      <span className="h-1.5 w-1.5 rounded-full bg-paper animate-blink" />
                      {product.status}
                    </span>
                  </Reveal>

                  <Reveal delay={0.15} className="mt-8 space-y-5">
                    {product.description.map((para) => (
                      <p key={para} className="leading-relaxed text-ash">
                        {para}
                      </p>
                    ))}
                  </Reveal>

                  <Reveal delay={0.2} className="mt-10">
                    <Link
                      href="/#book"
                      className="group/link inline-flex items-center gap-2 rounded-full border border-ink px-7 py-3 text-xs font-medium uppercase tracking-[0.12em] text-ink transition-colors duration-500 hover:bg-ink hover:text-paper"
                    >
                      Learn More
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:rotate-45" />
                    </Link>
                  </Reveal>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Philosophy                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-line py-28 md:py-40">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <span className="eyebrow">Philosophy</span>
            </Reveal>
            <div className="md:col-span-9">
              <AnimatedHeading
                as="h2"
                text="One Philosophy. Multiple Products."
                className="font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl"
              />
              <Reveal delay={0.2} className="mt-8 max-w-2xl space-y-5">
                <p className="text-lg leading-relaxed text-ash">
                  Whether we&rsquo;re building educational platforms, developer tools, or
                  enterprise software, every Aperture product shares the same engineering
                  DNA.
                </p>
                <p className="text-lg leading-relaxed text-ash">
                  We believe great software should be intuitive, scalable, reliable, and
                  built to solve meaningful problems—not simply add more features.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Principle cards */}
          <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            {principles.map((principle, i) => (
              <Reveal key={principle.title} delay={(i % 2) * 0.07}>
                <div className="group flex h-full flex-col bg-paper p-8 transition-colors duration-500 hover:bg-ink md:p-10">
                  <span className="font-display text-lg italic text-smoke transition-colors group-hover:text-paper/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-medium text-ink transition-colors duration-500 group-hover:text-paper md:text-4xl">
                    {principle.title}
                  </h3>
                  <p className="mt-4 flex-1 leading-relaxed text-ash transition-colors duration-500 group-hover:text-paper/70">
                    {principle.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Final CTA                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-28 md:py-40">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <AnimatedHeading
                as="h2"
                text="Need something built specifically for your organization?"
                className="font-display text-4xl font-medium leading-[1.05] text-ink md:text-6xl"
              />
              <Reveal delay={0.2} className="mt-8 max-w-2xl">
                <p className="text-lg leading-relaxed text-ash">
                  While the Aperture Suite solves common challenges through our own
                  products, we also partner with organizations to design and engineer
                  custom software tailored to their unique needs.
                </p>
              </Reveal>
            </div>

            <Reveal
              delay={0.1}
              className="flex flex-col items-start justify-end gap-4 md:col-span-4 md:items-end"
            >
              <Link
                href="/custom-solutions"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-9 py-4 text-sm font-medium uppercase tracking-[0.12em] text-paper transition-transform hover:-translate-y-0.5"
              >
                Explore Custom Solutions
                <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
              </Link>
              <StartProjectButton
                size="lg"
                label="Start a Project"
                className="border-ink bg-paper text-ink"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </article>
  );
}
