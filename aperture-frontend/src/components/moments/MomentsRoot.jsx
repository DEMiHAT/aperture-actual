'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { MomentsProvider, useMoments } from './MomentsProvider';
import { MomentsExperience } from './MomentsExperience';

function MomentsOverlay() {
  const { active } = useMoments();
  return (
    <AnimatePresence>{active && <MomentsExperience />}</AnimatePresence>
  );
}

/**
 * MomentsRoot — wraps the entire site chrome so the Navbar (and anything
 * else) can trigger the portal via context, and mounts the warm overlay
 * on top when active. Place this around Navbar + main + Footer in the
 * root layout.
 */
export function MomentsRoot({ children }) {
  return (
    <MomentsProvider>
      {children}
      <MomentsOverlay />
    </MomentsProvider>
  );
}
