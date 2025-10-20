# Day 1: Project Setup & Landing Page Structure

**Type**: Weekday Evening (2-3 hours)  
**Focus**: Foundation and landing page basics  
**Difficulty**: Easy

## Goal

Clean up the existing chat app, set up the development environment, and create the foundation for the JobCraft AI landing page.

## Prerequisites

- [ ] Node.js 18+ installed
- [ ] Git configured
- [ ] Code editor ready (VS Code recommended)
- [ ] OpenAI API key obtained
- [ ] 2-3 hours available

## Tasks Checklist

### Setup & Cleanup (30 minutes)

- [x] Open project in code editor
- [x] Review current project structure
- [x] Delete old chat app code from `app/page.tsx` _(Landing page now uses new components)_
- [x] Delete `app/components/Chat.tsx` if exists ✓
- [x] Delete `app/components/Message.tsx` if exists ✓
- [x] Clean up unused imports in `app/layout.tsx`
- [x] Verify `package.json` dependencies
- [x] Run `npm install` to ensure all packages are installed

### Install Required Dependencies (15 minutes)

- [x] Install Zustand: `npm install zustand` ✓
- [x] Install Framer Motion: `npm install framer-motion` ✓
- [x] Verify installation in `package.json` ✓
- [x] Test dev server: `npm run dev` ✓
- [x] Verify app loads at `http://localhost:3000` ✓

### Create Route Management System (20 minutes)

- [x] Create `lib/routes.ts` file ✓
- [x] Define `PUBLIC_ROUTES` object (HOME, ABOUT, PRICING, CONTACT) ✓
- [x] Define `PROTECTED_ROUTES` object (DASHBOARD, JOBS, RESUME, INTERVIEWS, SETTINGS) ✓
- [x] Export route constants ✓
- [x] Add TypeScript types for routes ✓

**File**: `lib/routes.ts`

```typescript
// Public routes - accessible to everyone
export const PUBLIC_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PRICING: '/pricing',
  CONTACT: '/contact',
  TERMS: '/terms',
  PRIVACY: '/privacy',
} as const;

// Protected routes - require authentication
export const PROTECTED_ROUTES = {
  DASHBOARD: '/dashboard',
  JOBS: '/jobs',
  RESUME: '/resume',
  INTERVIEWS: '/interviews',
  SETTINGS: '/settings',
} as const;

// Helper type for route values
export type PublicRoute = (typeof PUBLIC_ROUTES)[keyof typeof PUBLIC_ROUTES];
export type ProtectedRoute =
  (typeof PROTECTED_ROUTES)[keyof typeof PROTECTED_ROUTES];
```

### Create Header Component (45 minutes)

- [x] Create `components/Header.tsx` file ✓
- [x] Import necessary Shadcn UI components (Button, Sheet) ✓
- [x] Add logo/brand name "JobCraft AI" ✓
- [x] Add navigation links (Home, Features, Pricing) ✓
- [x] Add "Get Started" CTA button ✓
- [x] Implement mobile hamburger menu with Sheet ✓
- [x] Add responsive design (mobile/desktop) ✓
- [x] Style with Tailwind CSS ✓
- [x] Test on mobile and desktop views ✓

**Key Features**:

- Sticky header on scroll
- Mobile-responsive hamburger menu
- Smooth transitions
- Professional styling

### Create Hero Section (45 minutes)

- [x] Create `components/HeroSection.tsx` file ✓
- [x] Add main headline: "Land Your Dream Job with AI Power" ✓
- [x] Add subheadline describing the platform ✓
- [x] Create two CTA buttons (primary and secondary) ✓
- [x] Add success metrics section (3 key stats) ✓
- [x] Add gradient background ✓
- [x] Implement responsive design ✓
- [x] Add Framer Motion animations for entrance ✓
- [x] Test animations and responsiveness ✓

**Key Elements**:

- Compelling headline
- Clear value proposition
- Prominent CTAs
- Social proof (metrics)

### Update Landing Page (15 minutes)

- [x] Open `app/page.tsx` ✓
- [x] Import Header and HeroSection components ✓
- [x] Create basic page structure ✓
- [x] Add components to page ✓
- [x] Remove old chat app code ✓
- [x] Test page loads correctly ✓
- [x] Verify no console errors ✓
- [x] Check mobile responsiveness ✓

### Test & Verify (10 minutes)

- [x] Run `npm run dev` ✓
- [x] Open `http://localhost:3000` ✓
- [x] Verify header displays correctly ✓
- [x] Test navigation links ✓
- [x] Test mobile menu ✓
- [x] Verify hero section displays ✓
- [x] Test CTA buttons (opens login modal) ✓
- [x] Check responsive design on mobile ✓
- [x] Verify no TypeScript errors: `npm run build` ✓
- [x] Verify no linting errors: `npm run lint` ✓

## Deliverables

- [x] Clean project structure without chat app code ✓
- [x] Working header with navigation ✓
- [x] Hero section with CTAs ✓
- [x] Responsive design for mobile and desktop ✓
- [x] No TypeScript or linting errors ✓
- [x] Dev server running successfully ✓

## Success Criteria

- Landing page loads without errors
- Header is sticky and responsive
- Mobile menu works correctly
- Hero section displays with animations
- All components use Tailwind CSS
- Code follows TypeScript best practices
- Ready for Day 2 components

## Files Created/Modified

### New Files

- `lib/routes.ts`
- `components/Header.tsx`
- `components/HeroSection.tsx`

### Modified Files

- `app/page.tsx`
- `package.json` (new dependencies)

## Common Issues & Solutions

**Issue**: Framer Motion animations not working

- **Solution**: Ensure component is marked as 'use client' directive

**Issue**: Mobile menu not closing

- **Solution**: Use Sheet component's `onOpenChange` prop correctly

**Issue**: Tailwind classes not applying

- **Solution**: Verify `tailwind.config.ts` includes correct content paths

## Time Breakdown

- Setup & Cleanup: 30 min
- Dependencies: 15 min
- Route Management: 20 min
- Header Component: 45 min
- Hero Section: 45 min
- Integration: 15 min
- Testing: 10 min

**Total**: ~3 hours

## Next Steps

Tomorrow (Day 2), you'll complete the landing page by adding:

- Process flow section (6 steps)
- Feature cards
- Footer component
- Full responsive design
- Smooth scroll animations

## Notes

- Keep components simple and reusable
- Use Shadcn UI components where possible
- Focus on mobile-first design
- Don't worry about functionality yet - UI only
- Save frequently and commit to Git
- Take breaks if needed

---

**Status**: [x] **COMPLETED** ✓  
**Time Spent**: ~3 hours (estimated)  
**Completed On**: October 6, 2025

**Note**: Day 1 is essentially complete! Only minor cleanup needed (remove old Chat.tsx/Message.tsx files).
