import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FAQ } from '@/components/sections/faq';

const items = [
  { question: 'How long does a project take?', answer: 'Usually 4 to 8 weeks.' },
  { question: 'Do you offer support?', answer: 'Yes, with defined SLAs.' },
];

describe('FAQ', () => {
  it('renders all questions as buttons', () => {
    render(<FAQ items={items} />);
    for (const item of items) {
      expect(screen.getByRole('button', { name: item.question })).toBeInTheDocument();
    }
  });

  it('reveals the answer when a question is activated', async () => {
    const user = userEvent.setup();
    render(<FAQ items={items} />);
    await user.click(screen.getByRole('button', { name: items[0]!.question }));
    expect(await screen.findByText(items[0]!.answer)).toBeVisible();
  });
});
