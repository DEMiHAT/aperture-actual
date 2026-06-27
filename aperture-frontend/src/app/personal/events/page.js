import Home from '../../page';
import { PersonalEntry } from '@/components/personal/PersonalEntry';

export const metadata = {
  title: 'Event Websites | Aperture Personal',
  description:
    'One elegant link for the whole celebration — weddings, reunions, graduations and milestones.',
  alternates: { canonical: '/personal/events' },
};

export default function PersonalEventsPage() {
  return (
    <>
      <Home />
      <PersonalEntry view="events" />
    </>
  );
}
