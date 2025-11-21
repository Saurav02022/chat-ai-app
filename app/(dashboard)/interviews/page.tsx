'use client';

import { ComingSoon } from '@/components/ComingSoon';

export default function InterviewsPage() {
  return (
    <ComingSoon
      title="Interview Preparation"
      description="Schedule, track, and prepare for interviews with AI-powered mock interviews and personalized feedback."
      backUrl="/dashboard"
      backLabel="Back to Dashboard"
      developmentDay={8}
      priority="medium"
      category="job-management"
      features={[
        'Schedule and track upcoming interviews',
        'AI-powered mock interview practice',
        'Company-specific interview prep',
        'Common interview questions by role',
        'Real-time feedback and scoring',
      ]}
    />
  );
}
