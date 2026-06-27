'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

/**
 * ConsultationProvider — global switch for the "Choose Your Consultation"
 * chooser. Any Strategy Call / Book-a-call CTA can open it via
 * useConsultation().open(); the modal lives once in PersonalRoot.
 */
const ConsultationContext = createContext({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function ConsultationProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <ConsultationContext.Provider value={{ open, close, isOpen }}>
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  return useContext(ConsultationContext);
}
