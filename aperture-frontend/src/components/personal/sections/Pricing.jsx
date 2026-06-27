'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { useConsultation } from '../ConsultationProvider';
import { pricingTiers } from '../data';

const EASE = [0.16, 1, 0.3, 1];

export function Pricing() {
  const { open: openConsultation } = useConsultation();

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="eyebrow text-cocoa-soft">Pricing</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="Built for where you are."
            className="mt-5 font-display text-4xl font-medium leading-[1.05] text-cocoa md:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-lg text-cocoa-soft">
              Every story is different, so every quote is too. Tell us what you&rsquo;re imagining
              and we&rsquo;ll shape something that fits.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className={`relative flex flex-col rounded-2xl p-8 ${
                tier.featured
                  ? 'warm-glow text-white'
                  : 'liquid-glass text-cocoa'
              }`}
              style={
                tier.featured
                  ? { background: 'linear-gradient(150deg, #e6a532, #f4754b 60%, #ef6f8e)' }
                  : undefined
              }
            >
              {tier.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-white/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white">
                  Most loved
                </span>
              )}
              <h3 className="font-display text-3xl font-medium">{tier.name}</h3>
              <p className={`mt-2 text-sm ${tier.featured ? 'text-white/80' : 'text-cocoa-soft'}`}>
                {tier.tagline}
              </p>
              <ul className="mt-7 space-y-3">
                {tier.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${tier.featured ? 'text-white' : 'text-gold'}`}
                    />
                    <span className={tier.featured ? 'text-white/90' : 'text-cocoa'}>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-2">
                <button
                  onClick={openConsultation}
                  className={`w-full rounded-full py-3.5 text-sm font-medium uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5 ${
                    tier.featured
                      ? 'bg-white text-cocoa'
                      : 'bg-cocoa text-cream'
                  }`}
                >
                  Request Quote
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
