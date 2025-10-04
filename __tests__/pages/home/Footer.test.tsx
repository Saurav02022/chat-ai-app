import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

describe('Footer Component', () => {
  it('provides essential footer functionality', () => {
    render(<Footer />);

    // Should be wrapped in footer element for accessibility
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('includes legal and support links', () => {
    render(<Footer />);

    // Should have legal links
    const privacyLink = screen.getByRole('link', { name: /privacy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy');

    const termsLink = screen.getByRole('link', { name: /terms/i });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '/terms');

    const supportLink = screen.getByRole('link', { name: /support/i });
    expect(supportLink).toBeInTheDocument();
    expect(supportLink).toHaveAttribute('href', '/support');
  });

  it('includes social media links for engagement', () => {
    render(<Footer />);

    // Should have external social links
    const socialLinks = screen.getAllByRole('link', { name: '' });
    const externalLinks = socialLinks.filter(
      (link) =>
        link.getAttribute('target') === '_blank' &&
        link.getAttribute('rel')?.includes('noopener')
    );
    expect(externalLinks.length).toBeGreaterThan(2); // Twitter, LinkedIn, GitHub
  });

  it('displays copyright and branding information', () => {
    render(<Footer />);

    // Should have copyright text
    const copyrightText = screen.getByText(/©.*all rights reserved/i);
    expect(copyrightText).toBeInTheDocument();

    // Should have brand elements
    const brandElements = screen.getAllByText(/jobcraft|AI/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it('has responsive grid layout structure', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');

    // Should have grid container for responsive layout
    const gridContainer = footer.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();

    // Should have container for proper spacing
    const container = footer.querySelector('.container');
    expect(container).toBeInTheDocument();
  });

  it('maintains minimal and clean design', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');

    // Should have reasonable number of sections (not overcrowded)
    const headings = footer.querySelectorAll('h1, h2, h3, h4, h5, h6');
    expect(headings.length).toBeLessThan(5); // Keep it minimal

    // Should have essential links but not too many
    const links = footer.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(3); // At least some links
    expect(links.length).toBeLessThan(15); // But not overwhelming
  });
});
