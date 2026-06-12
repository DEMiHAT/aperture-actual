'use client';

import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Reveal — fades + slides children into view on scroll.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  once = true,
  as = 'div',
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/**
 * AnimatedHeading — splits text into words and reveals each with a
 * clip-mask "rise" on scroll. Gives the editorial, dynamic feel.
 */
export function AnimatedHeading({
  text,
  className = '',
  as = 'h2',
  delay = 0,
  stagger = 0.06,
}) {
  const Comp = motion[as] || motion.h2;
  const words = String(text).split(' ');

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%' },
            }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/**
 * Marquee — infinite horizontal scrolling strip. Duplicates children
 * so the loop is seamless.
 */
export function Marquee({ children, className = '', reverse = false, slow = false }) {
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div
        className={`flex shrink-0 ${slow ? 'animate-marquee-slow' : 'animate-marquee'}`}
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

/**
 * Magnetic — element subtly follows the cursor, then springs back.
 * Measures against the element's RESTING rect (captured on enter) so the
 * applied transform never feeds back into the next measurement — no jitter.
 */
export function Magnetic({ children, className = '', strength = 0.35 }) {
  const ref = React.useRef(null);
  const rectRef = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const captureRect = () => {
    const el = ref.current;
    if (el) rectRef.current = el.getBoundingClientRect();
  };

  const handleMove = (e) => {
    const rect = rectRef.current;
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={captureRect}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
