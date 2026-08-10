import { render, screen } from '@testing-library/react';

import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    render(
      <Button variant="outline" size="lg">
        Outlined
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'Outlined' });
    expect(btn.className).toContain('border');
  });

  it('supports asChild to render a custom element', () => {
    render(
      <Button asChild>
        <a href="/contact">Contact</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Contact' });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('is disabled when the disabled prop is set', () => {
    render(<Button disabled>Nope</Button>);
    expect(screen.getByRole('button', { name: 'Nope' })).toBeDisabled();
  });
});
