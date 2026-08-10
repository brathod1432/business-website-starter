import { getAggregateRating, testimonials } from '@/content/site-data';

describe('getAggregateRating', () => {
  it('returns a rating derived from testimonials', () => {
    const rating = getAggregateRating();
    expect(rating).not.toBeNull();
    expect(rating!.reviewCount).toBe(testimonials.filter((t) => t.rating > 0).length);
    expect(rating!.ratingValue).toBeGreaterThan(0);
    expect(rating!.ratingValue).toBeLessThanOrEqual(5);
    expect(rating!.best).toBe(5);
  });

  it('computes the average correctly', () => {
    const rated = testimonials.filter((t) => t.rating > 0);
    const expected = Math.round((rated.reduce((a, t) => a + t.rating, 0) / rated.length) * 10) / 10;
    expect(getAggregateRating()!.ratingValue).toBe(expected);
  });
});
