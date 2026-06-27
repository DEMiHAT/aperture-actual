'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { skillNodes } from '../data';

/**
 * SkillOrbit — skills as an orbiting ecosystem instead of progress bars.
 * Two counter-rotating rings; hovering a node pauses the feel and lifts it.
 */
export function SkillOrbit() {
  const [hovered, setHovered] = useState(null);

  const inner = skillNodes.slice(0, 4);
  const outer = skillNodes.slice(4);

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="eyebrow text-cocoa-soft">Skill Visualization</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="A living ecosystem of skills."
            className="mt-5 font-display text-4xl font-medium leading-[1.05] text-cocoa md:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cocoa-soft">
              No tired progress bars. Your abilities orbit as one connected system — the way they
              actually work together.
            </p>
          </Reveal>
          {hovered && (
            <motion.p
              key={hovered}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 text-sm font-medium uppercase tracking-[0.16em] text-gold"
            >
              ✦ {hovered}
            </motion.p>
          )}
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
          {/* rings */}
          <div className="absolute inset-[14%] rounded-full border border-gold/25" />
          <div className="absolute inset-[30%] rounded-full border border-sunset/25" />

          {/* center */}
          <div className="absolute flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold to-sunset text-center text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_40px_-8px_rgba(244,117,75,0.6)]">
            You
          </div>

          <OrbitRing items={outer} radiusPct={50} duration={34} onHover={setHovered} />
          <OrbitRing items={inner} radiusPct={33} duration={22} reverse onHover={setHovered} />
        </div>
      </div>
    </section>
  );
}

function OrbitRing({ items, radiusPct, duration, reverse = false, onHover }) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {items.map((skill, i) => {
        const angle = (i / items.length) * Math.PI * 2;
        const x = 50 + Math.cos(angle) * radiusPct;
        const y = 50 + Math.sin(angle) * radiusPct;
        return (
          <motion.div
            key={skill}
            className="absolute"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
            // counter-rotate so labels stay upright
            animate={{ rotate: reverse ? 360 : -360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
          >
            <motion.span
              onHoverStart={() => onHover(skill)}
              onHoverEnd={() => onHover(null)}
              whileHover={{ scale: 1.18 }}
              className="block cursor-default whitespace-nowrap rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-medium text-cocoa shadow-[0_8px_20px_-10px_rgba(91,59,34,0.5)] backdrop-blur"
            >
              {skill}
            </motion.span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
