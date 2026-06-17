import { industries } from '@/lib/industries';
import { IndustriesIndex } from '@/components/sections/IndustriesIndex';

export const metadata = {
  title: 'Industries We Serve',
  description:
    'Industry-specific software solutions for education, healthcare, retail, startups, manufacturing, and logistics.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return <IndustriesIndex industries={industries} />;
}
