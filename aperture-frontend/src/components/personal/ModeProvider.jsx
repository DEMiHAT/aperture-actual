'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

/**
 * ModeProvider — drives the real-time morph between the monochrome
 * Aperture *Enterprise* site and the warm Aperture *Personal* division.
 *
 * It deliberately mirrors MomentsProvider: `mode` is the single source of
 * truth for the morph, and entering/leaving Personal syncs the URL via
 * history.pushState (NO Next.js navigation) so the Enterprise site stays
 * mounted underneath and can dissolve smoothly. A `view` adds a second
 * dimension for the Personal sub-routes (/personal, /personal/<view>).
 *
 * Enterprise is always the default.
 */

export const PERSONAL_VIEWS = [
  'home',
  'portfolio-websites',
  'personal-branding',
  'moments',
  'events',
];

const PERSONAL_BASE = '/personal';

const ModeContext = createContext({
  mode: 'enterprise',
  view: 'home',
  isPersonal: false,
  enterPersonal: () => {},
  exitPersonal: () => {},
  setView: () => {},
  toggle: () => {},
});

function pathForView(view) {
  return view && view !== 'home' ? `${PERSONAL_BASE}/${view}` : PERSONAL_BASE;
}

function viewFromPath(pathname) {
  if (!pathname.startsWith(PERSONAL_BASE)) return null;
  const rest = pathname.slice(PERSONAL_BASE.length).replace(/^\/+|\/+$/g, '');
  if (!rest) return 'home';
  return PERSONAL_VIEWS.includes(rest) ? rest : 'home';
}

export function ModeProvider({ children }) {
  const [mode, setMode] = useState('enterprise');
  const [view, setViewState] = useState('home');
  // Remember where the user came from so exitPersonal can restore it.
  const returnPath = useRef('/');

  // Sync initial state on mount so a cold load of /personal lands open.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const v = viewFromPath(window.location.pathname);
    if (v) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode('personal');
      setViewState(v);
    } else {
      returnPath.current = window.location.pathname + window.location.search;
    }
  }, []);

  const enterPersonal = useCallback((nextView = 'home') => {
    if (typeof window === 'undefined') return;
    const safeView = PERSONAL_VIEWS.includes(nextView) ? nextView : 'home';
    const current = window.location.pathname + window.location.search;
    if (!current.startsWith(PERSONAL_BASE)) {
      returnPath.current = current;
    }
    window.history.pushState({ personal: true, view: safeView }, '', pathForView(safeView));
    setMode('personal');
    setViewState(safeView);
  }, []);

  const exitPersonal = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname.startsWith(PERSONAL_BASE)) {
      window.history.pushState({ personal: false }, '', returnPath.current || '/');
    }
    setMode('enterprise');
  }, []);

  const setView = useCallback(
    (nextView) => {
      const safeView = PERSONAL_VIEWS.includes(nextView) ? nextView : 'home';
      if (typeof window !== 'undefined') {
        window.history.pushState(
          { personal: true, view: safeView },
          '',
          pathForView(safeView),
        );
      }
      setViewState(safeView);
    },
    [],
  );

  const toggle = useCallback(() => {
    if (mode === 'personal') exitPersonal();
    else enterPersonal('home');
  }, [mode, enterPersonal, exitPersonal]);

  // Keep state in sync with browser back/forward.
  useEffect(() => {
    const onPop = () => {
      if (typeof window === 'undefined') return;
      const v = viewFromPath(window.location.pathname);
      if (v) {
        setMode('personal');
        setViewState(v);
      } else {
        setMode('enterprise');
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Lock the underlying document scroll while Personal is active
  // (mirrors MomentsProvider).
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = mode === 'personal' ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mode]);

  return (
    <ModeContext.Provider
      value={{
        mode,
        view,
        isPersonal: mode === 'personal',
        enterPersonal,
        exitPersonal,
        setView,
        toggle,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  return useContext(ModeContext);
}
