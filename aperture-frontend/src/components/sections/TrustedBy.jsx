'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Motion';

/**
 * TrustedBy — placeholder "Trusted By" section.
 *
 * Replace the placeholder logo boxes with real <img> tags (SVG logos
 * exported from each client's brand kit) as client relationships allow.
 * The grid auto-fills and the layout requires no changes.
 */

const clients = [
  { name: 'BrightEdu Trust', sector: 'Education' },
  { name: 'HealthBridge India', sector: 'Healthcare' },
  { name: 'LogiCore Systems', sector: 'Logistics' },
  { name: 'Nexus Fintech', sector: 'Finance' },
  { name: 'SpaceWorks Realty', sector: 'Real Estate' },
  { name: 'CloudNest Technologies', sector: 'Cloud' },
  { name: 'PulseHealth', sector: 'Healthcare' },
  { name: 'CodePath Academy', sector: 'EdTech' },
];

export function TrustedBy() {
  return (
    <section id="trusted-by" className="relative border-t border-line bg-mist py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12">

        <Reveal className="mb-12 text-center">
          <span className="eyebrow">Trusted By</span>
          <p className="mt-3 text-sm text-ash">
            Teams across healthcare, fintech, logistics, and education who have shipped with Aperture.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4 lg:grid-cols-8">
          {clients.map((client, i) => (
            <Reveal key={client.name} delay={i * 0.04}>
              <div className="group flex h-24 flex-col items-center justify-center gap-1 bg-mist px-4 transition-colors hover:bg-paper">
                {/* Replace this placeholder block with <img src="..." alt={client.name} /> once logos are available */}
                <div className="flex h-8 w-24 items-center justify-center">
                  <span className="text-center text-xs font-medium leading-tight text-ash transition-colors group-hover:text-ink">
                    {client.name}
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.15em] text-smoke">
                  {client.sector}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-8 text-center">
          <p className="text-xs text-smoke">
            Client logos are shown with permission and will be updated as formal agreements are established.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
