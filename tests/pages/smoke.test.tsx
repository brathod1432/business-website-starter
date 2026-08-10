import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';
import AboutPage from '@/app/about/page';
import BlogPage from '@/app/blog/page';
import CaseStudiesPage from '@/app/case-studies/page';
import ContactPage from '@/app/contact/page';
import PrivacyPage from '@/app/privacy-policy/page';
import TermsPage from '@/app/terms/page';
import NotFound from '@/app/not-found';
import BlogPostPage from '@/app/blog/[slug]/page';
import BlogTagPage from '@/app/blog/tag/[tag]/page';
import CaseStudyPage from '@/app/case-studies/[slug]/page';
import { getAllTags, getBlogPosts } from '@/content/blog';
import { getCaseStudies } from '@/content/case-studies';

function expectSingleH1() {
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
}

describe('page rendering smoke tests', () => {
  it('renders the homepage with all major sections', () => {
    render(<HomePage />);
    expectSingleH1();
    expect(screen.getByRole('heading', { name: /industries we can serve/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /what our clients say/i })).toBeInTheDocument();
  });

  it('renders the about page', () => {
    render(<AboutPage />);
    expectSingleH1();
  });

  it('renders the blog listing', () => {
    render(<BlogPage />);
    expectSingleH1();
  });

  it('renders the case studies listing', () => {
    render(<CaseStudiesPage />);
    expectSingleH1();
  });

  it('renders the contact page with a form', () => {
    render(<ContactPage />);
    expectSingleH1();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('renders the legal pages', () => {
    const { unmount } = render(<PrivacyPage />);
    expectSingleH1();
    unmount();
    render(<TermsPage />);
    expectSingleH1();
  });

  it('renders the not-found page', () => {
    render(<NotFound />);
    expectSingleH1();
  });

  it('renders a blog post detail page', async () => {
    const post = getBlogPosts()[0]!;
    render(await BlogPostPage({ params: Promise.resolve({ slug: post.slug }) }));
    expect(screen.getByRole('heading', { level: 1, name: post.title })).toBeInTheDocument();
  });

  it('renders a case study detail page', async () => {
    const study = getCaseStudies()[0]!;
    render(await CaseStudyPage({ params: Promise.resolve({ slug: study.slug }) }));
    expect(screen.getByRole('heading', { level: 1, name: study.title })).toBeInTheDocument();
  });

  it('renders a blog tag page listing its posts', async () => {
    const tag = getAllTags()[0]!;
    render(await BlogTagPage({ params: Promise.resolve({ tag: tag.slug }) }));
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole('heading', { level: 1, name: `Tagged: ${tag.tag}` }),
    ).toBeInTheDocument();
  });
});
