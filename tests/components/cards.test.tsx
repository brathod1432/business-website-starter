import { render, screen } from '@testing-library/react';

import { PricingCard } from '@/components/sections/pricing-card';
import { ServiceCard } from '@/components/sections/service-card';
import { TestimonialCard } from '@/components/sections/testimonial-card';
import { getServices } from '@/content/services';
import { pricingPlans, testimonials } from '@/content/site-data';

describe('ServiceCard', () => {
  it('renders the service title as a link to its detail page', () => {
    const service = getServices()[0]!;
    render(<ServiceCard service={service} />);
    const link = screen.getByRole('link', { name: service.title });
    expect(link).toHaveAttribute('href', `/service/${service.slug}`);
    expect(screen.getByText(service.summary)).toBeInTheDocument();
  });
});

describe('PricingCard', () => {
  it('renders plan details and a CTA link', () => {
    const plan = pricingPlans.find((p) => p.highlighted)!;
    render(<PricingCard plan={plan} />);
    expect(screen.getByText(plan.name)).toBeInTheDocument();
    expect(screen.getByText(plan.price)).toBeInTheDocument();
    expect(screen.getByText('Most popular')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: plan.cta })).toHaveAttribute('href', plan.href);
  });

  it('renders every feature in the plan', () => {
    const plan = pricingPlans[0]!;
    render(<PricingCard plan={plan} />);
    for (const feature of plan.features) {
      expect(screen.getByText(feature)).toBeInTheDocument();
    }
  });
});

describe('TestimonialCard', () => {
  it('renders the quote, author, and rating label', () => {
    const testimonial = testimonials[0]!;
    render(<TestimonialCard testimonial={testimonial} />);
    expect(screen.getByText(`“${testimonial.quote}”`)).toBeInTheDocument();
    expect(screen.getByText(testimonial.author)).toBeInTheDocument();
    expect(screen.getByLabelText(`Rated ${testimonial.rating} out of 5`)).toBeInTheDocument();
  });
});
