import Home from '../../page';
import { PersonalEntry } from '@/components/personal/PersonalEntry';

export const metadata = {
  title: 'Moments | Aperture Personal',
  description:
    'Some moments should never fade. Beautiful digital spaces that preserve family milestones, weddings, graduations and personal journeys.',
  alternates: { canonical: '/personal/moments' },
};

export default function PersonalMomentsPage() {
  return (
    <>
      <Home />
      <PersonalEntry view="moments" />
    </>
  );
}
