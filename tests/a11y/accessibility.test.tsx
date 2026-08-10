import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ContactForm } from '@/components/sections/contact-form';
import { Footer } from '@/components/layout/footer';
import { PricingCard } from '@/components/sections/pricing-card';
import { pricingPlans } from '@/content/site-data';

describe('accessibility (jest-axe)', () => {
  it('ContactForm has no detectable a11y violations', async () => {
    const { container } = render(<ContactForm />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Footer has no detectable a11y violations', async () => {
    const { container } = render(<Footer />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('PricingCard has no detectable a11y violations', async () => {
    const { container } = render(<PricingCard plan={pricingPlans[0]!} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
