'use client';

import React, { useEffect } from 'react';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { StrategyCallForm } from '@/components/forms/StrategyCallForm';
import { site } from '@/lib/site';

/**
 * CalendlyEmbed — renders the Calendly inline widget when a booking URL is set
 * (NEXT_PUBLIC_CALENDLY_URL). Until then it shows an honest fallback with the
 * direct contact options so the CTA is never a dead end.
 *
 * Calendly's widget.js auto-initialises any `.calendly-inline-widget` element
 * present in the DOM when it loads, so no explicit init call is needed.
 */
export function CalendlyEmbed() {
  const url = site.scheduling;

  useEffect(() => {
    if (!url || document.querySelector('script[data-calendly]')) return;
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.dataset.calendly = 'true';
    document.body.appendChild(script);
  }, [url]);

  return (
    <section id="book" className="relative border-t border-line bg-paper py-28 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <span className="eyebrow">Schedule</span>
          </Reveal>
          <div className="md:col-span-9">
            <AnimatedHeading
              as="h2"
              text="Pick a time that works for you."
              className="font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl"
            />
            <Reveal delay={0.15} className="mt-6">
              <p className="max-w-xl text-lg leading-relaxed text-ash">
                Book a free 30-minute discovery call with our founding engineers — no
                obligation, no sales pressure.
              </p>
            </Reveal>
          </div>
        </div>

        {url ? (
          <Reveal>
            <div
              className="calendly-inline-widget min-h-[680px] w-full border border-line"
              data-url={url}
            />
          </Reveal>
        ) : (
          <>
            {/* Booking form — emails the team directly */}
            <StrategyCallForm />

            {/* Or reach us directly */}
            <Reveal className="mt-px">
              <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
                <a
                  href={`mailto:${site.email.general}`}
                  className="group flex flex-col gap-3 bg-paper p-8 transition-colors hover:bg-ink md:p-10"
                >
                  <Mail className="h-6 w-6 text-ink transition-colors group-hover:text-paper" />
                  <span className="font-display text-2xl font-medium text-ink transition-colors group-hover:text-paper md:text-3xl">
                    Email us
                  </span>
                  <span className="text-sm text-ash transition-colors group-hover:text-paper/70">
                    {site.email.general}
                  </span>
                  <ArrowUpRight className="mt-2 h-5 w-5 text-smoke transition-all group-hover:rotate-45 group-hover:text-paper" />
                </a>
                <div className="group flex flex-col gap-3 bg-paper p-8 transition-colors hover:bg-ink md:p-10">
                  <MessageCircle className="h-6 w-6 text-ink transition-colors group-hover:text-paper" />
                  <span className="font-display text-2xl font-medium text-ink transition-colors group-hover:text-paper md:text-3xl">
                    WhatsApp Business
                  </span>
                  <div className="mt-2 flex flex-col gap-2">
                    <a
                      href={site.phone.primary.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ash transition-colors hover:underline group-hover:text-paper/70 group-hover:hover:text-paper"
                    >
                      Chat: {site.phone.primary.display}
                    </a>
                    <a
                      href={site.phone.secondary.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ash transition-colors hover:underline group-hover:text-paper/70 group-hover:hover:text-paper"
                    >
                      Chat: {site.phone.secondary.display}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
