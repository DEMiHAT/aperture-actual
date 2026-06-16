'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { services } from '@/lib/services';

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative border-t border-line bg-paper py-28 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <span className="eyebrow">(04) — Capabilities</span>
          </Reveal>
          <div className="md:col-span-9">
            <AnimatedHeading
              as="h2"
              text="Engineering solutions for complex challenges."
              className="font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl"
            />
          </div>
        </div>

        {/* Accordion list */}
        <div className="border-t border-line">
          {services.map((service, i) => {
            const isOpen = active === i;
            return (
              <Reveal key={service.title} delay={i * 0.04}>
                <div
                  onMouseEnter={() => setActive(i)}
                  className={`group border-b border-line transition-colors duration-500 ${
                    isOpen ? 'bg-ink' : 'bg-paper'
                  }`}
                >
                  <div className="flex cursor-pointer items-center gap-6 px-2 py-8 md:py-10">
                    <span
                      className={`font-display text-lg italic transition-colors md:text-2xl ${
                        isOpen ? 'text-paper/50' : 'text-smoke'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className={`flex-1 font-display text-3xl font-medium transition-colors duration-500 md:text-5xl ${
                        isOpen ? 'text-paper' : 'text-ink'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        isOpen
                          ? 'rotate-0 border-paper bg-paper text-ink'
                          : 'border-ink text-ink'
                      }`}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-6 px-2 pb-10 md:grid-cols-12 md:pl-16">
                          <p className="text-lg leading-relaxed text-paper/70 md:col-span-7">
                            {service.description}
                          </p>
                          <div className="flex flex-col items-start gap-5 md:col-span-5 md:items-end">
                            <div className="flex flex-wrap gap-2 md:justify-end">
                              {service.tech.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full border border-paper/30 px-4 py-1.5 text-xs uppercase tracking-wider text-paper/80"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            <Link
                              href={`/services/${service.slug}`}
                              className="group/link inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-0.5"
                            >
                              Explore Capability
                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:rotate-45" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
