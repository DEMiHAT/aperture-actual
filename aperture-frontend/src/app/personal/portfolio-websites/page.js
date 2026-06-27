import Home from '../../page';
import { PersonalEntry } from '@/components/personal/PersonalEntry';

export const metadata = {
  title: 'Portfolio Websites | Aperture Personal',
  description:
    'Portfolio websites that make a sharp first impression — clean, fast and unmistakably you.',
  alternates: { canonical: '/personal/portfolio-websites' },
};

export default function PortfolioWebsitesPage() {
  return (
    <>
      <Home />
      <PersonalEntry view="portfolio-websites" />
    </>
  );
}
