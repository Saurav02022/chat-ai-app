'use client';

import { ComingSoon } from '@/components/ComingSoon';
import { AuthGuard } from '@/components/AuthGuard';

function JobsContent() {
  return (
    <ComingSoon
      title="Job Applications"
      description="Manage all your job applications, track progress, and organize your job search in one place."
      backUrl="/dashboard"
      backLabel="Back to Dashboard"
      developmentDay={2}
      priority="high"
      category="job-management"
      features={[
        'Add and track job applications',
        'Resume optimization for each job',
        'Interview scheduling and preparation',
        'Application status tracking',
        'AI-powered job matching',
      ]}
    />
  );
}

export default function JobsPage() {
  return (
    <AuthGuard>
      <JobsContent />
    </AuthGuard>
  );
}
