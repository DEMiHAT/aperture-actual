'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, GraduationCap, PartyPopper } from 'lucide-react';
import { Reveal } from '@/components/ui/Motion';

const EASE = [0.16, 1, 0.3, 1];

const events = [
  {
    icon: Heart,
    title: 'Weddings',
    blurb: 'Your story, the schedule, a gallery and RSVPs — guests need just one link.',
    tone: 'from-rose/40 to-blush/30',
  },
  {
    icon: Users,
    title: 'Reunions',
    blurb: 'Bring everyone back together with a shared space for memories old and new.',
    tone: 'from-amber/40 to-honey/40',
  },
  {
    icon: GraduationCap,
    title: 'Graduations',
    blurb: 'Mark the milestone with a page that holds the journey and the celebration.',
    tone: 'from-gold/40 to-amber/30',
  },
  {
    icon: PartyPopper,
    title: 'Celebrations',
    blurb: 'Birthdays, anniversaries, milestones — an elegant home for any moment worth gathering for.',
    tone: 'from-sunset/40 to-rose/30',
  },
];

/**
 * EventsShowcase — the event-website category grid for the Events view.
 */
export function EventsShowcase() {
  return (
    <section className="relative px-6 py-16 md:px-12 md:py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {events.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: EASE }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl liquid-glass p-8"
            >
              <div
                className={`pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br ${e.tone} opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-90`}
              />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/60 text-sunset">
                <e.icon className="h-5 w-5" />
              </span>
              <h3 className="relative mt-6 font-display text-3xl font-medium text-cocoa">
                {e.title}
              </h3>
              <p className="relative mt-2 max-w-sm leading-relaxed text-cocoa-soft">{e.blurb}</p>
              <div className="relative mt-6 flex flex-wrap gap-2">
                {['Story', 'Schedule', 'Gallery', 'RSVP'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/60 bg-white/40 px-3 py-1 text-[11px] font-medium text-cocoa-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-cocoa-soft">
            Sample event concepts — every celebration is built bespoke around yours.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
