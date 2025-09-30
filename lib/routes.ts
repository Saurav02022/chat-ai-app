/**
 * Centralized route definitions for the JobCraft AI application
 * This file contains all route paths used throughout the application
 */

// Public routes - accessible without authentication
export const PUBLIC_ROUTES = {
  HOME: '/',
  DEMO: '/demo',
  PRICING: '/pricing',
  SUPPORT: '/support',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  STATUS: '/status',
} as const;

// Protected routes - require authentication
export const PROTECTED_ROUTES = {
  DASHBOARD: '/dashboard',
  JOBS: '/jobs',
  SETTINGS: '/settings',
} as const;

// Job-specific routes (dynamic)
export const JOB_ROUTES = {
  DETAILS: (id: string) => `/jobs/${id}`,
  RESUME_REVIEW: (id: string) => `/jobs/${id}/resume-review`,
  TEMPLATES: (id: string) => `/jobs/${id}/templates`,
  LIVE_ASSISTANT: (id: string) => `/jobs/${id}/live-assistant`,
  ANALYTICS: (id: string) => `/jobs/${id}/analytics`,
} as const;

// API routes
export const API_ROUTES = {
  AUTH: {
    BASE: '/api/auth',
    SIGNIN: '/api/auth/signin',
    SIGNOUT: '/api/auth/signout',
    SESSION: '/api/auth/session',
    CALLBACK: '/api/auth/callback',
  },
  CHAT: '/api/chat',
  AI: '/api/ai',
  UPLOAD: '/api/upload',
  RESUME: {
    BASE: '/api/resume',
    ANALYZE: '/api/resume/analyze',
    OPTIMIZE: '/api/resume/optimize',
    GENERATE: '/api/resume/generate',
  },
  JOBS: {
    BASE: '/api/jobs',
    SEARCH: '/api/jobs/search',
    SAVE: '/api/jobs/save',
    APPLY: '/api/jobs/apply',
  },
  INTERVIEWS: {
    BASE: '/api/interviews',
    PRACTICE: '/api/interviews/practice',
    ASSISTANT: '/api/interviews/assistant',
    FEEDBACK: '/api/interviews/feedback',
  },
} as const;

// External routes
export const EXTERNAL_ROUTES = {
  TWITTER: 'https://twitter.com',
  LINKEDIN: 'https://linkedin.com',
  GITHUB: 'https://github.com',
} as const;

// Route groups for easier management
export const NAVIGATION_ROUTES = [
  { name: 'Demo', href: PUBLIC_ROUTES.DEMO },
  { name: 'Pricing', href: PUBLIC_ROUTES.PRICING },
] as const;

export const FOOTER_ROUTES = {
  LEGAL: [
    { name: 'Privacy Policy', href: PUBLIC_ROUTES.PRIVACY },
    { name: 'Terms of Service', href: PUBLIC_ROUTES.TERMS },
    { name: 'Support', href: PUBLIC_ROUTES.SUPPORT },
    { name: 'Status', href: PUBLIC_ROUTES.STATUS },
  ],
} as const;

// Dashboard navigation routes
export const DASHBOARD_ROUTES = [
  {
    name: 'Job Applications',
    href: PROTECTED_ROUTES.JOBS,
    description: 'Manage your job applications',
    icon: '💼',
  },
  {
    name: 'Settings',
    href: PROTECTED_ROUTES.SETTINGS,
    description: 'Account preferences',
    icon: '⚙️',
  },
] as const;

// Helper functions
export function isPublicRoute(pathname: string): boolean {
  return Object.values(PUBLIC_ROUTES).some((route) => route === pathname);
}

export function isProtectedRoute(pathname: string): boolean {
  return Object.values(PROTECTED_ROUTES).some((route) => route === pathname);
}

export function isApiRoute(pathname: string): boolean {
  return pathname.startsWith('/api/');
}

export function getRouteTitle(pathname: string): string {
  const routeTitles: Record<string, string> = {
    [PUBLIC_ROUTES.HOME]: 'JobCraft AI - Land Your Dream Job',
    [PUBLIC_ROUTES.DEMO]: 'Demo - JobCraft AI',
    [PUBLIC_ROUTES.PRICING]: 'Pricing - JobCraft AI',
    [PUBLIC_ROUTES.SUPPORT]: 'Support - JobCraft AI',
    [PROTECTED_ROUTES.DASHBOARD]: 'Dashboard - JobCraft AI',
    [PROTECTED_ROUTES.JOBS]: 'Job Applications - JobCraft AI',
    [PROTECTED_ROUTES.SETTINGS]: 'Settings - JobCraft AI',
  };

  return routeTitles[pathname] || 'JobCraft AI';
}

// Type exports for better TypeScript support
export type PublicRoute = (typeof PUBLIC_ROUTES)[keyof typeof PUBLIC_ROUTES];
export type ProtectedRoute =
  (typeof PROTECTED_ROUTES)[keyof typeof PROTECTED_ROUTES];
export type ApiRoute = (typeof API_ROUTES)[keyof typeof API_ROUTES];
export type ExternalRoute =
  (typeof EXTERNAL_ROUTES)[keyof typeof EXTERNAL_ROUTES];
