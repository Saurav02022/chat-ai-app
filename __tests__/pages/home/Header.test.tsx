import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '@/components/Header';

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

describe('Header Component', () => {
  it('renders the JobCraft AI logo', () => {
    render(<Header />);

    // JobCraft and AI are separate elements
    expect(screen.getAllByText('JobCraft').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AI').length).toBeGreaterThan(0);
  });

  it('renders navigation links', () => {
    render(<Header />);

    expect(screen.getByText('Demo')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('renders Get Started button when not authenticated', () => {
    render(<Header />);

    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger is clicked', () => {
    render(<Header />);

    // Find and click the mobile menu trigger (hamburger icon)
    const mobileMenuTrigger = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(mobileMenuTrigger);

    // Check if mobile menu content is visible
    expect(screen.getAllByText('Demo')).toHaveLength(2); // Desktop + Mobile
    expect(screen.getAllByText('Pricing')).toHaveLength(2); // Desktop + Mobile
  });

  it('has proper accessibility attributes', () => {
    render(<Header />);

    // Multiple navigation elements exist
    const navs = screen.getAllByRole('navigation');
    expect(navs.length).toBeGreaterThan(0);

    // Check for logo link
    const logoLinks = screen.getAllByRole('link', { name: /JobCraft/i });
    expect(logoLinks.length).toBeGreaterThan(0);
    expect(logoLinks[0]).toHaveAttribute('href', '/');
  });
});
