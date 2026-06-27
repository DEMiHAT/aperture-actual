import Home from '../../page';
import { PersonalEntry } from '@/components/personal/PersonalEntry';

export const metadata = {
  title: 'Personal Branding | Aperture Personal',
  description:
    'A personal brand presence that works while you sleep — business card, skills, achievements and resume in one home.',
  alternates: { canonical: '/personal/personal-branding' },
};

export default function PersonalBrandingPage() {
  return (
    <>
      <Home />
      <PersonalEntry view="personal-branding" />
    </>
  );
}
