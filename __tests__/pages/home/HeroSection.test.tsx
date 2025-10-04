import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from '@/components/HeroSection';

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  signIn: vi.fn(),
}));

describe('HeroSection Component', () => {
  it('renders main call-to-action elements', () => {
    render(<HeroSection />);

    // Should have a primary CTA button
    const primaryCTA = screen.getByRole('button');
    expect(primaryCTA).toBeInTheDocument();

    // Should have a secondary CTA link
    const secondaryCTA = screen.getByRole('link');
    expect(secondaryCTA).toBeInTheDocument();
    expect(secondaryCTA).toHaveAttribute('href', '/demo');
  });

  it('opens authentication modal when primary CTA is clicked', () => {
    render(<HeroSection />);

    const primaryButton = screen.getByRole('button');
    fireEvent.click(primaryButton);

    // Should open login modal (check for modal content)
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('has proper semantic structure and accessibility', () => {
    render(<HeroSection />);

    // Should have main heading
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();

    // Should be wrapped in a section
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('displays trust indicators and social proof', () => {
    render(<HeroSection />);

    // Should have multiple badge/metric elements
    const badges = screen.getAllByText(/rate|help|coaching/i);
    expect(badges.length).toBeGreaterThan(2);
  });

  it('is responsive and has proper layout structure', () => {
    render(<HeroSection />);

    // Should have container structure
    const container = document.querySelector('.container');
    expect(container).toBeInTheDocument();

    // Should have flex layout for content
    const flexContainer = document.querySelector('.flex');
    expect(flexContainer).toBeInTheDocument();
  });
});
