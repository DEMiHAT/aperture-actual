'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Marquee } from '@/components/ui/Motion';
import { wallItems } from '../data';

const EASE = [0.16, 1, 0.3, 1];

function WallCard({ item }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -8, zIndex: 20 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative mx-3 h-64 w-72 shrink-0 overflow-hidden rounded-2xl shadow-[0_20px_60px_-18px_rgba(91,59,34,0.5)]"
      style={{ background: `linear-gradient(155deg, ${item.from}, ${item.to})` }}
    >
      {/* Idle floating shimmer */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />

      <div className="absolute left-5 top-5 text-4xl drop-shadow">{item.emoji}</div>

      {/* Default label */}
      <div className="absolute inset-x-5 bottom-5">
        <span className="rounded-full bg-white/25 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur">
          {item.tag}
        </span>
        <h3 className="font-display mt-2 text-xl font-medium text-white drop-shadow">
          {item.title}
        </h3>
      </div>

      {/* Hover "live preview" overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-xs uppercase tracking-[0.2em] text-white/80">Live preview</span>
        <span className="font-display mt-2 text-2xl italic text-white">Open memory →</span>
      </div>
    </motion.div>
  );
}

export function MemoryWall() {
  const rowA = wallItems.slice(0, 4);
  const rowB = wallItems.slice(4);

  return (
    <section className="relative overflow-hidden py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mb-16 px-6 text-center"
      >
        <span className="text-[11px] uppercase tracking-[0.24em] text-gold">A wall of feelings</span>
        <h2 className="font-display mt-3 text-4xl font-medium text-cocoa md:text-6xl">
          The Memory <span className="italic text-warm-gradient">Wall</span>
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6">
        <Marquee>
          {rowA.map((item, i) => (
            <WallCard key={`a-${i}`} item={item} />
          ))}
        </Marquee>
        <Marquee reverse>
          {rowB.map((item, i) => (
            <WallCard key={`b-${i}`} item={item} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
