'use client';

import { useEffect } from 'react';
import { useMode } from './ModeProvider';

/**
 * PersonalEntry — opens the Personal overlay on mount (at the given view) so
 * a direct or shared visit to /personal/* lands straight in the warm
 * experience. Renders nothing. Mirrors moments/MomentsEntry.
 */
export function PersonalEntry({ view = 'home' }) {
  const { enterPersonal } = useMode();
  useEffect(() => {
    enterPersonal(view);
  }, [enterPersonal, view]);
  return null;
}
