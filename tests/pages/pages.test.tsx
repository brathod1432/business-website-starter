import { render, screen } from '@testing-library/react';

import ServicesPage from '@/app/services/page';
import PricingPage from '@/app/pricing/page';
import ServiceDetailPage, {
  generateStaticParams as serviceParams,
} from '@/app/service/[slug]/page';
import { getServices } from '@/content/services';

describe('Services page', () => {
  it('renders a single h1 and lists every service', () => {
    render(<ServicesPage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    for (const service of getServices()) {
      expect(screen.getByRole('link', { name: service.title })).toBeInTheDocument();
    }
  });
});

describe('Pricing page', () => {
  it('renders every pricing plan CTA', () => {
    render(<PricingPage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('link', { name: /choose growth/i })).toBeInTheDocument();
  });
});

describe('Service detail page (dynamic)', () => {
  it('generates static params for every service', () => {
    expect(serviceParams()).toHaveLength(getServices().length);
  });

  it('renders the requested service', async () => {
    const service = getServices()[0]!;
    const ui = await ServiceDetailPage({ params: Promise.resolve({ slug: service.slug }) });
    render(ui);
    expect(screen.getByRole('heading', { level: 1, name: service.title })).toBeInTheDocument();
  });
});
