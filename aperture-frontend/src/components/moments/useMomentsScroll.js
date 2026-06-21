'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let registered = false;

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/**
 * useMomentsScroll — wires Lenis inertial smooth-scroll to the portal's
 * own scroll container and bridges it into GSAP ScrollTrigger.
 *
 * @param wrapperRef  ref to the scrolling element (overflow-y-auto)
 * @param contentRef  ref to the inner content element
 * @returns { ready } true once Lenis + ScrollTrigger are configured, so
 *          section components can safely create their own ScrollTriggers.
 */
export function useMomentsScroll(wrapperRef, contentRef) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const reduced = prefersReducedMotion();

    // ScrollTrigger should observe our nested scroller, not the window.
    ScrollTrigger.defaults({ scroller: wrapper });

    let lenis;
    let rafId;

    if (!reduced) {
      lenis = new Lenis({
        wrapper,
        content,
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // Let layout settle, then enable triggers.
    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      setReady(true);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      cancelAnimationFrame(refreshId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.defaults({ scroller: undefined });
      lenis?.destroy();
      setReady(false);
    };
  }, [wrapperRef, contentRef]);

  return { ready };
}
