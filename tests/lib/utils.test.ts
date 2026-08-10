import { cn, formatDate, readingTime } from '@/lib/utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('resolves conflicting tailwind classes (last wins)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('handles conditional and falsy values', () => {
    expect(cn('a', false && 'b', undefined, 'c')).toBe('a c');
  });
});

describe('formatDate', () => {
  it('formats an ISO string into a readable date', () => {
    expect(formatDate('2026-06-18')).toBe('June 18, 2026');
  });
});

describe('readingTime', () => {
  it('returns at least 1 minute for short text', () => {
    expect(readingTime('a few words')).toBe(1);
  });

  it('scales with word count (~200 wpm)', () => {
    const text = Array.from({ length: 400 }, () => 'word').join(' ');
    expect(readingTime(text)).toBe(2);
  });
});
