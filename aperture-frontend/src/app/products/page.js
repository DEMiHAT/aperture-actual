import { ProductsLanding } from '@/components/sections/ProductsLanding';

export const metadata = {
  title: 'The Aperture Suite',
  description:
    'A growing collection of intelligent software products engineered to solve real-world challenges across education, developer productivity, and enterprise operations.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return <ProductsLanding />;
}
