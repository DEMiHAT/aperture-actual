import { notFound } from 'next/navigation';
import { industries, getIndustry } from '@/lib/industries';
import { IndustryDetail } from '@/components/sections/IndustryDetail';

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return {
    title: `${industry.title} Solutions`,
    description: industry.description,
    alternates: { canonical: `/industries/${slug}` },
  };
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const index = industries.findIndex((i) => i.slug === slug);
  const next = industries[(index + 1) % industries.length];

  return <IndustryDetail industry={industry} index={index} next={next} />;
}
