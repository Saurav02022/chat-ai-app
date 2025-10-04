import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  usePathname: () => '/',
}));

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

describe('Home Page Integration', () => {
  it('renders complete landing page with all key sections', () => {
    render(<HomePage />);

    // Should have header with navigation
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Should have main content area
    expect(screen.getByRole('main')).toBeInTheDocument();

    // Should have footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    // Should have multiple call-to-action buttons
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(3);
  });

  it('provides clear user journey and conversion funnel', () => {
    render(<HomePage />);

    // Should have multiple CTAs for conversion
    const allButtons = screen.getAllByRole('button');
    expect(allButtons.length).toBeGreaterThan(4); // Multiple CTAs throughout

    // Should have demo/learn more options
    const demoLinks = screen.getAllByRole('link', {
      name: /demo|watch|learn/i,
    });
    expect(demoLinks.length).toBeGreaterThan(0);

    // Should have primary CTA buttons (check for CTA-like text)
    const ctaButtons = allButtons.filter((button) =>
      /start|get started|try|free|trial/i.test(button.textContent || '')
    );
    expect(ctaButtons.length).toBeGreaterThan(1); // Multiple conversion points
  });

  it('displays trust signals and social proof', () => {
    render(<HomePage />);

    // Should have metrics/badges showing credibility
    const trustSignals = screen.getAllByText(/rate|help|coaching|%|AI/i);
    expect(trustSignals.length).toBeGreaterThan(3);
  });

  it('shows clear value proposition and process', () => {
    render(<HomePage />);

    // Should have step-by-step process
    const processSteps = ['1', '2', '3', '4', '5', '6'];
    processSteps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });

    // Should have feature benefits
    const benefits = screen.getAllByText(
      /resume|interview|job|AI|optimization/i
    );
    expect(benefits.length).toBeGreaterThan(5);
  });

  it('has proper semantic structure and accessibility', () => {
    render(<HomePage />);

    // Should have proper heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();

    // Should have multiple section headings
    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s.length).toBeGreaterThan(1);

    // Should have navigation landmarks
    const navs = screen.getAllByRole('navigation');
    expect(navs.length).toBeGreaterThan(0);
  });

  it('supports responsive design and mobile experience', () => {
    render(<HomePage />);

    // Should have responsive containers
    const containers = document.querySelectorAll('.container');
    expect(containers.length).toBeGreaterThan(0);

    // Should have grid layouts for responsive design
    const grids = document.querySelectorAll('.grid');
    expect(grids.length).toBeGreaterThan(0);

    // Should have mobile menu functionality
    const mobileMenuTrigger = screen.getByRole('button', {
      name: /menu|toggle/i,
    });
    expect(mobileMenuTrigger).toBeInTheDocument();
  });

  it('enables user interaction and engagement', () => {
    render(<HomePage />);

    // Should have interactive elements
    const interactiveElements = [
      ...screen.getAllByRole('button'),
      ...screen.getAllByRole('link'),
    ];
    expect(interactiveElements.length).toBeGreaterThan(5);

    // Should have hover states and animations (check for motion classes)
    const animatedElements = document.querySelectorAll(
      '[style*="transform"], [class*="hover:"], [class*="transition"]'
    );
    expect(animatedElements.length).toBeGreaterThan(0);
  });
});
