import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeatureCards } from '@/components/FeatureCards';

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  signIn: vi.fn(),
}));

describe('FeatureCards Component', () => {
  it('displays multiple feature cards with interactive elements', () => {
    render(<FeatureCards />);

    // Should have multiple cards (at least 3)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(2);
  });

  it('each feature card has proper structure and interactivity', () => {
    render(<FeatureCards />);

    // Should have feature headings (at least 1, flexible for content changes)
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBeGreaterThan(0);

    // Should have interactive buttons
    const actionButtons = screen.getAllByRole('button');
    expect(actionButtons.length).toBeGreaterThan(2);
  });

  it('opens authentication modal when feature buttons are clicked', () => {
    render(<FeatureCards />);

    const firstButton = screen.getAllByRole('button')[0];
    fireEvent.click(firstButton);

    // Should open login modal
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('has responsive grid layout for different screen sizes', () => {
    render(<FeatureCards />);

    // Should have grid container
    const gridContainer = document.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();

    // Should have responsive classes
    const responsiveElements = document.querySelectorAll(
      '[class*="md:grid-cols"], [class*="lg:grid-cols"]'
    );
    expect(responsiveElements.length).toBeGreaterThan(0);
  });

  it('includes visual icons and proper card structure', () => {
    render(<FeatureCards />);

    // Should have icons for each feature
    const icons = document.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(2);

    // Should have card containers
    const cards = document.querySelectorAll('[class*="card"], .rounded');
    expect(cards.length).toBeGreaterThan(2);
  });

  it('provides clear feature descriptions and benefits', () => {
    render(<FeatureCards />);

    // Should have descriptive text about features
    const descriptions = screen.getAllByText(
      /resume|interview|template|AI|optimization/i
    );
    expect(descriptions.length).toBeGreaterThan(3);
  });

  it('includes bottom call-to-action section', () => {
    render(<FeatureCards />);

    // Should have final CTA section
    const ctaButtons = screen.getAllByRole('button');
    const finalCTA = ctaButtons[ctaButtons.length - 1];
    expect(finalCTA).toBeInTheDocument();

    // Should have encouraging text
    const encouragingText = screen.getAllByText(
      /ready|start|join|get started/i
    );
    expect(encouragingText.length).toBeGreaterThan(0);
  });
});
