# Day 5: Individual Job Pages

**Type**: Weekday Evening (2-3 hours)  
**Focus**: Dynamic job routes and tabbed interface  
**Difficulty**: Medium

## Goal

Create individual job pages with dynamic routing, implement a tabbed navigation system, and build the job overview tab with status management and timeline.

## Prerequisites

- [x] Day 4 completed ✓
- [x] Job store working ✓
- [x] Jobs can be created and listed ✓
- [x] 2-3 hours available ✓

## Tasks Checklist

### Create Dynamic Job Route (30 minutes)

- [x] Create `app/(dashboard)/jobs/[id]/page.tsx` file ✓
- [x] Wrap with AuthGuard component ✓
- [x] Get job ID from URL params ✓
- [x] Fetch job from store using ID ✓
- [x] Handle job not found case (404) ✓
- [x] Add loading state ✓
- [x] Test with different job IDs ✓

### Build Job Header Component (30 minutes)

- [x] Create `components/jobs/JobHeader.tsx` ✓
- [x] Add breadcrumb navigation (← Back to Jobs) ✓
- [x] Display company name prominently ✓
- [x] Display role title ✓
- [x] Add status badge with color coding ✓
- [x] Add status dropdown for quick changes ✓
- [x] Implement responsive design ✓
- [x] Test navigation ✓

### Implement Tabbed Navigation (45 minutes)

- [x] Use Tabs component from Shadcn UI ✓
- [x] Create 5 tabs: ✓
  - [x] Overview ✓
  - [x] Resume Review ✓
  - [x] Templates ✓
  - [x] Live Assistant ✓
  - [x] Analytics ✓
- [x] Implement URL-based tab navigation (query params) ✓
- [x] Style active/inactive states ✓
- [x] Make tabs responsive ✓
- [x] Test tab switching ✓

### Create Job Overview Tab (45 minutes)

- [x] Create `components/jobs/JobOverviewTab.tsx` ✓
- [x] Display job details: ✓
  - [x] Company and role ✓
  - [x] Location and work type ✓
  - [x] Salary range ✓
  - [x] Applied date ✓
  - [x] Current status ✓
- [x] Add status dropdown for quick changes ✓
- [x] Show job description ✓
- [x] Add notes section ✓
- [x] Implement responsive layout ✓
- [x] Test data display ✓

### Build Timeline Component (30 minutes)

- [x] Create `components/jobs/JobTimeline.tsx` ✓
- [x] Display chronological events: ✓
  - [x] Job created ✓
  - [x] Status changes ✓
  - [x] Resume uploaded ✓
  - [x] Interview scheduled ✓
- [x] Add timestamps ✓
- [x] Use vertical timeline design ✓
- [x] Add icons for event types ✓
- [x] Style with connecting lines ✓
- [x] Test with mock timeline data ✓

### Implement Job Details Editing (30 minutes)

- [x] Add "Edit Details" button ✓
- [x] Create inline edit mode or modal ✓
- [x] Allow editing of: ✓
  - [x] Company ✓
  - [x] Role ✓
  - [x] Location ✓
  - [x] Work type ✓
  - [x] Salary ✓
  - [x] Job description ✓
  - [x] Notes ✓
- [x] Update job in store ✓
- [x] Show success toast ✓
- [x] Test editing and saving ✓

## Deliverables

- [x] Dynamic job route working ✓
- [x] Job header with breadcrumb ✓
- [x] Tabbed navigation system ✓
- [x] Job overview tab complete ✓
- [x] Timeline component displaying events ✓
- [x] Job details editing functional ✓
- [x] Responsive design on mobile ✓

## Success Criteria

- Can navigate to individual job pages
- All tabs are accessible
- Job details display correctly
- Status can be changed via dropdown
- Timeline shows job history
- Job details can be edited
- Mobile-responsive design works

## Files Created/Modified

### New Files

- `app/(dashboard)/jobs/[id]/page.tsx`
- `components/jobs/JobHeader.tsx`
- `components/jobs/JobOverviewTab.tsx`
- `components/jobs/JobTimeline.tsx`

### Modified Files

- `components/jobs/JobCard.tsx` (add click to navigate)
- `lib/stores/jobStore.ts` (add timeline events)

## Common Issues & Solutions

**Issue**: Tab state not persisting on refresh

- **Solution**: Use URL query params for tab state

**Issue**: Job not found after refresh

- **Solution**: Ensure localStorage is loaded before rendering

**Issue**: Timeline events not showing

- **Solution**: Add timeline events when job status changes

## Time Breakdown

- Dynamic Route: 30 min
- Job Header: 30 min
- Tabbed Navigation: 45 min
- Overview Tab: 45 min
- Timeline: 30 min
- Editing: 30 min

**Total**: ~3 hours

## Next Steps

Tomorrow (Day 6), you'll:

- Create file upload component
- Implement resume upload
- Add file validation
- Store files in localStorage

## Tips

- Use Next.js dynamic routes properly
- Keep tab content in separate components
- Use query params for tab state
- Test with multiple jobs
- Handle edge cases (no job found)

---

**Status**: [x] Completed  
**Time Spent**: ~2.5 hours  
**Completed On**: Day 5 (Completed)
