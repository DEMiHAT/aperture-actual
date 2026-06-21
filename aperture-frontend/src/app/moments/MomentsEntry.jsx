'use client';

import { useEffect } from 'react';
import { useMoments } from '@/components/moments/MomentsProvider';

/**
 * MomentsEntry — opens the portal on mount so a direct or shared visit to
 * /moments lands straight in the warm experience. Renders nothing itself.
 */
export function MomentsEntry() {
  const { open } = useMoments();
  useEffect(() => {
    open();
  }, [open]);
  return null;
}
