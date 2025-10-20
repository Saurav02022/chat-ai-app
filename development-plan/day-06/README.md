# Day 6: Resume Upload & File Handling

**Type**: Weekday Evening (2-3 hours)  
**Focus**: File upload system with validation and storage  
**Difficulty**: Medium

## Goal

Create a complete file upload system for resumes with drag-and-drop functionality, file validation, preview capabilities, and localStorage persistence. This will be the foundation for AI resume analysis in later days.

## Prerequisites

- [x] Day 5 completed ✓
- [x] Individual job pages working ✓
- [x] Job store functional ✓
- [x] 2-3 hours available ✓

## Tasks Checklist

### Create File Upload Component (60 minutes)

- [x] Create `components/shared/FileUpload.tsx` ✓
- [x] Add drag-and-drop functionality ✓
- [x] Support click to upload ✓
- [x] Add file type validation (PDF, DOC, DOCX) ✓
- [x] Add file size validation (max 5MB) ✓
- [x] Show upload progress ✓
- [x] Display file preview/info ✓
- [x] Handle upload errors ✓
- [x] Style with Shadcn UI components ✓

### Implement Resume Storage (45 minutes)

- [x] Create `lib/fileStorage.ts` utility ✓
- [x] Convert files to base64 for localStorage ✓
- [x] Add file metadata storage ✓
- [x] Implement file retrieval ✓
- [x] Add file deletion ✓
- [x] Handle storage quota limits ✓
- [x] Add compression for large files ✓
- [x] Test storage persistence ✓

### Add Resume Upload to Job Pages (30 minutes)

- [x] Add resume upload to job overview tab ✓
- [x] Show currently uploaded resume ✓
- [x] Allow resume replacement ✓
- [x] Display upload date and file info ✓
- [x] Add download/view functionality ✓
- [x] Update job store with resume data ✓
- [x] Test integration with existing UI ✓

### Create Resume Preview Component (30 minutes)

- [x] Create `components/shared/ResumePreview.tsx` ✓
- [x] Show file name and size ✓
- [x] Display upload date ✓
- [x] Add file type icon ✓
- [x] Show file status (uploaded/processing/error) ✓
- [x] Add action buttons (view, replace, delete) ✓
- [x] Style consistently with design system ✓
- [x] Test with different file types ✓

### File Validation & Error Handling (25 minutes)

- [x] Validate file types (PDF, DOC, DOCX only) ✓
- [x] Check file size limits (5MB max) ✓
- [x] Validate file integrity ✓
- [x] Handle corrupted files ✓
- [x] Show clear error messages ✓
- [x] Add retry functionality ✓
- [x] Test with invalid files ✓
- [x] Test edge cases ✓

### Testing & Polish (30 minutes)

- [x] Test drag-and-drop on different browsers ✓
- [x] Test file upload flow end-to-end ✓
- [x] Verify localStorage persistence ✓
- [x] Test file size and type validation ✓
- [x] Check mobile responsiveness ✓
- [x] Test error scenarios ✓
- [x] Verify file preview works ✓
- [x] Run TypeScript check ✓
- [x] Run linting ✓
- [x] Fix any bugs ✓

## Deliverables

- [x] Complete file upload component with drag-and-drop ✓
- [x] File storage utility with localStorage ✓
- [x] Resume upload integrated into job pages ✓
- [x] File preview and management UI ✓
- [x] Comprehensive file validation ✓
- [x] Error handling and user feedback ✓
- [x] Mobile-responsive design ✓
- [x] Persistent file storage ✓

## Success Criteria

- Files can be uploaded via drag-and-drop or click
- Only valid file types and sizes are accepted
- Files persist in localStorage across sessions
- Upload progress is clearly shown
- Error messages are helpful and actionable
- Mobile experience works smoothly
- File previews display correctly
- Users can replace/delete uploaded files

## Files Created/Modified

### New Files

- `components/shared/FileUpload.tsx`
- `components/shared/ResumePreview.tsx`
- `lib/fileStorage.ts`
- `types/file.ts`

### Modified Files

- `components/jobs/JobOverviewTab.tsx`
- `lib/stores/jobStore.ts`
- `types/job.ts`

## Time Breakdown

- File Upload Component: 60 min
- Resume Storage: 45 min
- Job Page Integration: 30 min
- Resume Preview: 30 min
- Validation & Errors: 25 min
- Testing: 30 min

**Total**: ~3.5 hours

## Next Steps

Tomorrow (Day 7), you'll:

- Complete Week 1 testing and polish
- Fix any remaining bugs
- Optimize performance
- Prepare for Week 2 AI features

## Tips

- Use HTML5 File API for drag-and-drop
- Convert files to base64 for localStorage storage
- Implement proper error boundaries
- Test with real resume files
- Consider file compression for storage efficiency
- Use proper MIME type checking
- Handle browser compatibility issues

---

**Status**: [x] Completed  
**Time Spent**: ~3 hours  
**Completed On**: Day 6 (Completed)
