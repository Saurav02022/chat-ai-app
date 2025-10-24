# Day 3: Authentication & Dashboard Foundation

**Type**: Weekend (Full Day - 6-8 hours)  
**Focus**: Mock authentication and dashboard structure  
**Difficulty**: Medium

## Goal

Set up a mock authentication system using localStorage, create a login modal, build the dashboard foundation, and implement protected routes.

## Prerequisites

- [ ] Days 1-2 completed
- [ ] Landing page fully functional
- [ ] Full day available (weekend)
- [ ] Understanding of React state management

## Tasks Checklist

### Create Auth Store with Zustand (45 minutes)

- [x] Create `lib/stores/authStore.ts` file ✓
- [x] Define User interface in `types/auth.ts` ✓
- [x] Create auth store with Zustand ✓
- [x] Add state: `user`, `isAuthenticated`, `isLoading` ✓
- [x] Add actions: `login`, `logout`, `setUser`, `setLoading` ✓
- [x] Implement localStorage persistence ✓
- [x] Add mock user data structure ✓
- [x] Test store in browser console ✓

**File**: `types/auth.ts`

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}
```

### Create Login Modal Component (90 minutes)

- [ ] Create `components/LoginModal.tsx` file
- [ ] Use Dialog component from Shadcn UI
- [ ] Add modal header with logo and title
- [ ] Create Google OAuth button (UI only, non-functional)
- [ ] Add Google logo SVG
- [ ] Add trust indicators (benefits)
- [ ] Add legal links (Terms, Privacy)
- [ ] Implement open/close state
- [ ] Add Framer Motion animations
- [ ] Style with professional design
- [ ] Test modal open/close

**Key Features**:

- Clean, minimal design
- Google OAuth button styling
- Animated entrance
- Professional appearance

### Implement Mock Authentication (60 minutes)

- [ ] Create mock login function in `LoginModal.tsx`
- [ ] Generate mock user data on login
- [ ] Store user in auth store
- [ ] Save to localStorage
- [ ] Add loading state during "login"
- [ ] Show success toast notification
- [ ] Close modal after successful login
- [ ] Test login flow
- [ ] Verify localStorage persistence
- [ ] Test page refresh (should stay logged in)

**Mock User Data**:

```typescript
{
  id: 'mock-user-' + Date.now(),
  email: 'demo@jobcraft.ai',
  name: 'Demo User',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
  createdAt: new Date().toISOString(),
}
```

### Update Header with Login State (30 minutes)

- [ ] Open `components/Header.tsx`
- [ ] Import auth store
- [ ] Add login modal state
- [ ] Update "Get Started" button to open modal
- [ ] Show user avatar when logged in
- [ ] Add logout functionality
- [ ] Test login/logout flow
- [ ] Verify UI updates correctly

### Create AuthGuard Component (45 minutes)

- [ ] Create `components/AuthGuard.tsx` file
- [ ] Check authentication status
- [ ] Show loading skeleton while checking
- [ ] Redirect to home if not authenticated
- [ ] Allow access if authenticated
- [ ] Add proper TypeScript types
- [ ] Test with protected routes

**File**: `components/AuthGuard.tsx`

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { PUBLIC_ROUTES } from '@/lib/routes';
import { Skeleton } from '@/components/ui/skeleton';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(PUBLIC_ROUTES.HOME);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className="p-8"><Skeleton className="h-screen" /></div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
```

### Create Dashboard Layout (60 minutes)

- [ ] Create `app/(dashboard)/layout.tsx` file
- [ ] Add dashboard navigation sidebar
- [ ] Add top navigation bar
- [ ] Include user avatar and name
- [ ] Add navigation links (Dashboard, Jobs, Resume, Interviews, Settings)
- [ ] Implement mobile-responsive sidebar
- [ ] Style with Tailwind CSS
- [ ] Test navigation

### Create Dashboard Page (90 minutes)

- [ ] Create `app/(dashboard)/dashboard/page.tsx` file
- [ ] Wrap with AuthGuard component
- [ ] Create welcome header section:
  - [ ] User greeting with name
  - [ ] Success rate display
  - [ ] User avatar
  - [ ] Settings dropdown
- [ ] Add stats overview cards:
  - [ ] Total applications
  - [ ] Active interviews
  - [ ] Success rate
  - [ ] Average ATS score
- [ ] Create quick action cards:
  - [ ] Upload Resume
  - [ ] Add New Job
  - [ ] Practice Interview
- [ ] Use mock data for stats
- [ ] Implement responsive grid layout
- [ ] Test on mobile and desktop

### Add Toast Notifications (30 minutes)

- [ ] Ensure Toaster is in root layout
- [ ] Create toast utility functions
- [ ] Add success toast for login
- [ ] Add success toast for logout
- [ ] Add error toast for failures
- [ ] Test all toast notifications
- [ ] Style toasts appropriately

### Testing & Polish (60 minutes)

- [ ] Test complete login flow
- [ ] Verify logout functionality
- [ ] Test protected route access
- [ ] Test localStorage persistence
- [ ] Check mobile responsiveness
- [ ] Verify no TypeScript errors
- [ ] Run linting: `npm run lint`
- [ ] Test on different browsers
- [ ] Fix any UI issues
- [ ] Commit changes to Git

## Deliverables

- [ ] Working mock authentication system
- [ ] Login modal with Google OAuth UI
- [ ] Auth store with localStorage persistence
- [ ] AuthGuard for protected routes
- [ ] Dashboard layout with navigation
- [ ] Dashboard page with welcome section
- [ ] Toast notifications working
- [ ] Fully responsive design

## Success Criteria

- User can "log in" via modal
- Authentication state persists on refresh
- Protected routes redirect when not authenticated
- Dashboard displays after login
- User can log out successfully
- All components are mobile-responsive
- No console errors or warnings

## Files Created/Modified

### New Files

- `lib/stores/authStore.ts`
- `types/auth.ts`
- `components/LoginModal.tsx`
- `components/AuthGuard.tsx`
- `app/(dashboard)/layout.tsx`
- `app/(dashboard)/dashboard/page.tsx`

### Modified Files

- `components/Header.tsx`
- `app/layout.tsx` (add Toaster if not present)

## Common Issues & Solutions

**Issue**: Auth state not persisting

- **Solution**: Ensure Zustand persist middleware is configured correctly

**Issue**: Redirect loop on protected routes

- **Solution**: Check AuthGuard logic and loading state

**Issue**: Modal not closing after login

- **Solution**: Call `onOpenChange(false)` after successful login

## Time Breakdown

- Auth Store: 45 min
- Login Modal: 90 min
- Mock Auth: 60 min
- Header Update: 30 min
- AuthGuard: 45 min
- Dashboard Layout: 60 min
- Dashboard Page: 90 min
- Toasts: 30 min
- Testing: 60 min

**Total**: ~8 hours

## Next Steps

Tomorrow (Day 4 - Weekend), you'll:

- Create job management store
- Build dashboard components
- Implement job CRUD operations
- Add job list page

## Tips

- Use localStorage.getItem/setItem for persistence
- Mock realistic user data for better testing
- Keep authentication logic simple for now
- Focus on UI/UX flow
- Test edge cases (refresh, logout, etc.)

---

**Status**: [ ] Not Started | [ ] In Progress | [ ] Completed  
**Time Spent**: **\_** hours  
**Completed On**: ****\_\_\_****
