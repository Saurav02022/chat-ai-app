/**
 * Global test setup for Vitest + React Testing Library
 * This file runs before all tests and sets up the testing environment
 */

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi } from 'vitest';
import type { ReactNode } from 'react';

// ============================================================================
// Test Environment Setup
// ============================================================================

// Cleanup DOM after each test to prevent test pollution
afterEach(() => {
  cleanup();
  vi.clearAllMocks(); // Clear all mocks after each test
});

// ============================================================================
// Browser API Mocks (Required for JSDOM environment)
// ============================================================================

beforeAll(() => {
  // Mock IntersectionObserver (used by Framer Motion, lazy loading, etc.)
  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    value: vi.fn().mockImplementation((callback) => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      root: null,
      rootMargin: '',
      thresholds: [],
    })),
  });

  // Mock ResizeObserver (used by Framer Motion, responsive components, etc.)
  Object.defineProperty(global, 'ResizeObserver', {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    })),
  });

  // Mock matchMedia (used by responsive components)
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock scrollTo (used by navigation, smooth scrolling, etc.)
  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: vi.fn(),
  });
});

// ============================================================================
// Next.js Mocks
// ============================================================================

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
  notFound: vi.fn(),
  redirect: vi.fn(),
}));

// Note: Next.js Image and Link components are mocked per-test when needed
// Global mocks for these can interfere with component rendering

// ============================================================================
// Authentication Mocks
// ============================================================================

// Mock NextAuth.js
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated' as const,
    update: vi.fn(),
  }),
  signIn: vi.fn(),
  signOut: vi.fn(),
  getSession: vi.fn(),
  SessionProvider: ({ children }: { children: ReactNode }) => children,
}));

// ============================================================================
// Environment Variables
// ============================================================================

// Set test environment variables (if not already set)
if (!process.env.NODE_ENV) {
  Object.defineProperty(process.env, 'NODE_ENV', {
    value: 'test',
    writable: true,
    configurable: true,
  });
}
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
