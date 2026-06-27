'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ModeProvider, useMode } from './ModeProvider';
import { ConsultationProvider } from './ConsultationProvider';
import { ConsultationModal } from './ConsultationModal';
import { PersonalExperience } from './PersonalExperience';

function PersonalOverlay() {
  const { isPersonal } = useMode();
  return <AnimatePresence>{isPersonal && <PersonalExperience />}</AnimatePresence>;
}

/**
 * PersonalRoot — wraps the site chrome so the Navbar (and any Strategy Call
 * CTA) can drive the Enterprise <-> Personal morph and the consultation
 * chooser via context, then mounts the warm Personal overlay + the
 * consultation modal on top. Purely additive: the Enterprise tree underneath
 * is untouched.
 */
export function PersonalRoot({ children }) {
  return (
    <ModeProvider>
      <ConsultationProvider>
        {children}
        <PersonalOverlay />
        <ConsultationModal />
      </ConsultationProvider>
    </ModeProvider>
  );
}
