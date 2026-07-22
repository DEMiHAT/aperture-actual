'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

/**
 * ProjectCarousel — shows one 16:9 screenshot at a time. A flex track
 * slides horizontally (translated by -index * 100%); circular arrows wrap
 * around, and the dot indicators jump straight to any slide.
 */
export function ProjectCarousel({ slides }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = (next) => setIndex((next + count) % count);

  return (
    <div className="relative aspect-video overflow-hidden border border-line bg-ink">
      {/* Sliding track */}
      <div
        className="flex h-full w-full"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: `transform 500ms cubic-bezier(${EASE.join(',')})`,
        }}
      >
        {slides.map((slide) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className="h-full w-full shrink-0 object-cover"
            loading="lazy"
            draggable={false}
          />
        ))}
      </div>

      {/* Prev / next — circular arrows, vertically centered, wrap around */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous screenshot"
        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-paper"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next screenshot"
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-paper"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to screenshot ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === index ? 'bg-paper' : 'bg-paper/35 hover:bg-paper/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
