import Home from '../page';
import { MomentsEntry } from './MomentsEntry';

export const metadata = {
  title: 'Aperture Moments',
  description:
    'Turn birthdays, anniversaries, apologies, proposals and memories into beautiful personalized websites.',
  alternates: { canonical: '/moments' },
};

// Render the normal site underneath (so closing the portal reveals it),
// and open the warm experience on mount for direct / shared visits.
export default function MomentsPage() {
  return (
    <>
      <Home />
      <MomentsEntry />
    </>
  );
}
