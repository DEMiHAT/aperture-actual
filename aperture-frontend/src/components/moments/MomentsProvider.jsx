'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

/**
 * MomentsContext — drives the real-time "portal" morph between the
 * monochrome Aperture Technologies site and the warm Aperture Moments
 * experience.
 *
 * `active` is the single source of truth for the morph. open()/close()
 * also sync the URL (`/moments` <-> previous path) via history.pushState
 * WITHOUT triggering a Next.js navigation, so the tech site stays mounted
 * underneath and can dissolve smoothly. A popstate listener keeps `active`
 * in sync with browser back/forward.
 */
const MomentsContext = createContext({
  active: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

const MOMENTS_PATH = '/moments';

export function MomentsProvider({ children }) {
  // Initialise from the current path so a cold load of /moments lands open.
  const [active, setActive] = useState(false);
  // Remember where the user came from so close() can restore it.
  const [returnPath, setReturnPath] = useState('/');

  // Sync initial state on mount (avoids SSR/client hydration mismatch by
  // only reading window after mount).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMoments = window.location.pathname.startsWith(MOMENTS_PATH);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(isMoments);
    if (!isMoments) setReturnPath(window.location.pathname + window.location.search);
  }, []);

  const open = useCallback(() => {
    if (typeof window === 'undefined') return;
    const current = window.location.pathname + window.location.search;
    if (!current.startsWith(MOMENTS_PATH)) {
      setReturnPath(current);
      window.history.pushState({ moments: true }, '', MOMENTS_PATH);
    }
    setActive(true);
  }, []);

  const close = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname.startsWith(MOMENTS_PATH)) {
      window.history.pushState({ moments: false }, '', returnPath || '/');
    }
    setActive(false);
  }, [returnPath]);

  const toggle = useCallback(() => {
    if (active) close();
    else open();
  }, [active, open, close]);

  // Keep `active` in sync with browser back/forward.
  useEffect(() => {
    const onPop = () => {
      if (typeof window === 'undefined') return;
      setActive(window.location.pathname.startsWith(MOMENTS_PATH));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Lock the underlying document scroll while the portal is open
  // (mirrors the modal pattern in components/ui/StartProject.jsx).
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = active ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <MomentsContext.Provider value={{ active, open, close, toggle }}>
      {children}
    </MomentsContext.Provider>
  );
}

export function useMoments() {
  return useContext(MomentsContext);
}
