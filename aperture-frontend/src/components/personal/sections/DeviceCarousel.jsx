'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Tablet, Laptop, Monitor } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { WebsiteMock, PhoneFrame, TabletFrame, LaptopFrame, DesktopFrame } from './Mock';
import { themePresets } from '../data';

const EASE = [0.16, 1, 0.3, 1];

const DEVICES = [
  { key: 'phone', label: 'Phone', icon: Smartphone, Frame: PhoneFrame, w: 'max-w-[200px]' },
  { key: 'tablet', label: 'Tablet', icon: Tablet, Frame: TabletFrame, w: 'max-w-sm' },
  { key: 'laptop', label: 'Laptop', icon: Laptop, Frame: LaptopFrame, w: 'max-w-lg' },
  { key: 'desktop', label: 'Desktop', icon: Monitor, Frame: DesktopFrame, w: 'max-w-xl' },
];

const theme = themePresets[0];

/**
 * DeviceCarousel — the same site shown responsive across phone, tablet,
 * laptop and desktop; pick a device to bring it forward.
 */
export function DeviceCarousel() {
  const [active, setActive] = useState('laptop');
  const ActiveDevice = DEVICES.find((d) => d.key === active) || DEVICES[2];
  const Frame = ActiveDevice.Frame;

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <span className="eyebrow text-white/50">Every Screen</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="Flawless on every device."
            className="mt-5 font-display text-4xl font-medium leading-[1.05] text-white md:text-6xl"
          />
        </div>

        {/* device switch */}
        <div className="mb-10 flex flex-wrap gap-2">
          {DEVICES.map((d) => (
            <button
              key={d.key}
              onClick={() => setActive(d.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-all ${
                active === d.key
                  ? 'border-transparent bg-gradient-to-r from-gold to-sunset text-white shadow-[0_6px_18px_-6px_rgba(244,117,75,0.6)]'
                  : 'border-white/[0.12] text-white/50 hover:text-white'
              }`}
            >
              <d.icon className="h-4 w-4" /> {d.label}
            </button>
          ))}
        </div>

        <div className="flex min-h-[420px] items-center justify-center rounded-2xl dark-glass p-8">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className={`w-full ${ActiveDevice.w}`}
          >
            <Frame>
              <WebsiteMock name="Sanjeev" role="Builder" type="brand" theme={theme} />
            </Frame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
