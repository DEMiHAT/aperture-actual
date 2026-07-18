import { CustomSolutionsHero } from '@/components/sections/CustomSolutionsHero';
import { Services } from '@/components/sections/Services';

export const metadata = {
  title: 'Custom Solutions',
  description:
    "Every organization has unique challenges. When off-the-shelf software isn't enough, Aperture partners with businesses to design, engineer, and deliver software tailored to their exact requirements.",
  alternates: { canonical: '/custom-solutions' },
};

export default function CustomSolutionsPage() {
  return (
    <article className="bg-paper">
      <CustomSolutionsHero />
      {/* Existing capabilities accordion, reused verbatim from the homepage. */}
      <Services />
    </article>
  );
}
