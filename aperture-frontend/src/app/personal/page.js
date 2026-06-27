import Home from '../page';
import { PersonalEntry } from '@/components/personal/PersonalEntry';

export const metadata = {
  title: 'Aperture Personal',
  description:
    'Beautiful digital experiences for individuals, creators, students and professionals — portfolios, personal brands, event websites and memory pages.',
  alternates: { canonical: '/personal' },
};

// Render the Enterprise site underneath (so leaving Personal reveals it) and
// open the warm Personal experience on mount for direct / shared visits.
export default function PersonalPage() {
  return (
    <>
      <Home />
      <PersonalEntry view="home" />
    </>
  );
}
