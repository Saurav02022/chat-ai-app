# Day 4: Dashboard Components & Job Store

**Type**: Weekend (Full Day - 6-8 hours)  
**Focus**: Job management system with CRUD operations  
**Difficulty**: Medium

## Goal

Build a complete job management system with Zustand store, create dashboard overview components, implement job list page with filtering, and enable full CRUD operations using localStorage.

## Prerequisites

- [ ] Day 3 completed
- [ ] Authentication working
- [ ] Dashboard foundation ready
- [ ] Full day available (weekend)

## Tasks Checklist

### Create Job Types & Interfaces (30 minutes)

- [x] Create `types/job.ts` file ✓
- [x] Define Job interface with all fields ✓
- [x] Define JobStatus enum ✓
- [x] Define JobType enum ✓
- [x] Define JobFilters interface ✓
- [x] Add TypeScript types for CRUD operations ✓
- [x] Export all types ✓

**File**: `types/job.ts`

```typescript
export enum JobStatus {
  APPLIED = 'applied',
  REVIEWING = 'reviewing',
  PHONE_SCREEN = 'phone_screen',
  INTERVIEW = 'interview',
  OFFER = 'offer',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

export enum JobPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface Job {
  id: string;
  userId: string;
  company: string;
  role: string;
  location: string;
  workType: 'remote' | 'hybrid' | 'onsite';
  salary?: string;
  status: JobStatus;
  priority: JobPriority;
  appliedDate: string;
  jobDescription?: string;
  notes?: string;
  resumeScore?: number;
  templateUsed?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Create Job Store with Zustand (90 minutes)

- [x] Create `lib/stores/jobStore.ts` file ✓
- [x] Set up Zustand store with localStorage persistence ✓
- [x] Add state: `jobs`, `selectedJob`, `filters`, `isLoading` ✓
- [x] Implement `addJob` action ✓
- [x] Implement `updateJob` action ✓
- [x] Implement `deleteJob` action ✓
- [x] Implement `getJobById` selector ✓
- [x] Implement `setFilters` action ✓
- [x] Implement `getFilteredJobs` selector ✓
- [x] Add search functionality ✓
- [x] Test store operations in console ✓

### Create Mock Job Data (20 minutes)

- [x] Create `lib/mockData.ts` file ✓
- [x] Generate 5-10 mock jobs with realistic data ✓
- [x] Include various statuses and priorities ✓
- [x] Add to job store on first load ✓
- [x] Test mock data displays correctly ✓

### Build Dashboard Overview Cards (90 minutes)

- [x] Create `components/dashboard/StatsCard.tsx` ✓
- [x] Create stats overview section: ✓
  - [x] Total Applications card ✓
  - [x] Active Interviews card ✓
  - [x] Success Rate card ✓
  - [x] Interview Rate card ✓
- [x] Calculate stats from job store ✓
- [x] Add icons for each stat ✓
- [x] Implement responsive grid (2x2 on mobile, 4x1 on desktop) ✓
- [x] Add hover effects ✓
- [x] Style with gradients and shadows ✓
- [x] Test with mock data ✓

### Build Quick Action Cards (60 minutes)

- [x] Create `components/dashboard/QuickActions.tsx` ✓
- [x] Create 4 quick action cards: ✓
  - [x] "Add New Job" - navigate to job creation ✓
  - [x] "Upload Resume" - navigate to resume page ✓
  - [x] "Schedule Interview" - navigate to interview prep ✓
  - [x] "View Analytics" - navigate to analytics ✓
- [x] Add descriptive icons ✓
- [x] Implement click handlers ✓
- [x] Style with consistent design ✓
- [x] Test navigation ✓

### Build Recent Jobs Component (45 minutes)

- [x] Create `components/dashboard/RecentJobs.tsx` ✓
- [x] Display 5 most recent job applications ✓
- [x] Show job details (company, role, location, salary) ✓
- [x] Add status badges with color coding ✓
- [x] Format dates with relative time ✓
- [x] Add click handlers for job details ✓
- [x] Handle empty state with call-to-action ✓
- [x] Style with consistent design ✓
- [x] Test with mock data ✓

### Create Job List Page (120 minutes)

- [x] Create `app/(dashboard)/jobs/page.tsx` ✓
- [x] Wrap with AuthGuard ✓
- [x] Add page header with title and "Add Job" button ✓
- [x] Create search input for filtering ✓
- [x] Create status filter dropdown ✓
- [x] Create type filter dropdown ✓
- [x] Display jobs in grid/list layout ✓
- [x] Show empty state when no jobs ✓
- [x] Implement responsive design ✓
- [x] Test filtering and search ✓

### Build Job Card Component (90 minutes)

- [x] Create `components/jobs/JobCard.tsx` ✓
- [x] Display job information: ✓
- [x] Company name and logo placeholder ✓
- [x] Role title ✓
- [x] Location and work type ✓
- [x] Status badge with color coding ✓
- [x] Applied date ✓
- [x] Salary (if available) ✓
- [x] Add action buttons: ✓
- [x] View details ✓
- [x] Edit ✓
- [x] Delete (with confirmation) ✓
- [x] Implement status color coding ✓
- [x] Add hover effects ✓
- [x] Make card clickable to view details ✓
- [x] Test all interactions ✓

### Create Job Creation Modal (90 minutes)

- [x] Create `components/jobs/CreateJobModal.tsx` ✓
- [x] Use Dialog component from Shadcn UI ✓
- [x] Create form with React Hook Form + Zod ✓
- [x] Add form fields: ✓
- [x] Company (required) ✓
- [x] Role (required) ✓
- [x] Location (required) ✓
- [x] Work Type (select) ✓
- [x] Salary (optional) ✓
- [x] Status (select) ✓
- [x] Job Description (textarea) ✓
- [x] Notes (textarea) ✓
- [x] Implement form validation ✓
- [x] Handle form submission ✓
- [x] Add to job store ✓
- [x] Show success toast ✓
- [x] Close modal after creation ✓
- [x] Test form validation and submission ✓

### Implement Job Edit & Delete (60 minutes)

- [x] Create `components/jobs/EditJobModal.tsx` ✓
- [x] Reuse form from CreateJobModal ✓
- [x] Pre-fill form with existing job data ✓
- [x] Implement update functionality ✓
- [x] Create delete confirmation dialog ✓
- [x] Implement delete functionality ✓
- [x] Update job store ✓
- [x] Show appropriate toasts ✓
- [x] Test edit and delete operations ✓

### Testing & Polish (60 minutes)

- [x] Test job creation flow ✓
- [x] Test job editing flow ✓
- [x] Test job deletion with confirmation ✓
- [x] Verify localStorage persistence ✓
- [x] Test filtering and search ✓
- [x] Check responsive design on mobile ✓
- [x] Verify stats update correctly ✓
- [x] Test with 0 jobs (empty state) ✓
- [x] Test with many jobs (20+) ✓
- [x] Fix any bugs or UI issues ✓
- [x] Run TypeScript check ✓
- [x] Run linting ✓
- [x] Commit changes to Git ✓

## Deliverables

- [x] Complete job store with CRUD operations ✓
- [x] Dashboard with stats and quick actions ✓
- [x] Job list page with filtering ✓
- [x] Job card component ✓
- [x] Job creation modal with form validation ✓
- [x] Job edit and delete functionality ✓
- [x] localStorage persistence working ✓
- [x] Responsive design on all devices ✓

## Success Criteria

- Jobs can be created, read, updated, and deleted
- Job data persists in localStorage
- Dashboard stats calculate correctly
- Filtering and search work properly
- All forms have validation
- Mobile-responsive design
- No TypeScript or linting errors

## Files Created/Modified

### New Files

- `types/job.ts`
- `lib/stores/jobStore.ts`
- `lib/mockData.ts`
- `components/dashboard/StatsCard.tsx`
- `components/dashboard/QuickActionCard.tsx`
- `components/jobs/JobCard.tsx`
- `components/jobs/CreateJobModal.tsx`
- `components/jobs/EditJobModal.tsx`
- `app/(dashboard)/jobs/page.tsx`

### Modified Files

- `app/(dashboard)/dashboard/page.tsx`

## Time Breakdown

- Types & Interfaces: 30 min
- Job Store: 90 min
- Mock Data: 20 min
- Dashboard Cards: 90 min
- Quick Actions: 60 min
- Job List Page: 120 min
- Job Card: 90 min
- Create Modal: 90 min
- Edit & Delete: 60 min
- Testing: 60 min

**Total**: ~8 hours

## Next Steps

Tomorrow (Day 5 - Weekday), you'll:

- Create individual job page with tabs
- Build job overview tab
- Implement job details editing
- Add timeline component

## Tips

- Use Zod for form validation
- Keep localStorage keys consistent
- Test with realistic data
- Use status colors consistently
- Implement optimistic UI updates

---

**Status**: [x] Completed  
**Time Spent**: ~4 hours  
**Completed On**: Day 4 (Completed before Day 5)
