'use client';

import { ComingSoon } from '@/components/ComingSoon';

export default function ResumePage() {
  return (
    <ComingSoon
      title="Resume Management"
      description="Upload, optimize, and tailor your resume for each job application with AI-powered suggestions."
      backUrl="/dashboard"
      backLabel="Back to Dashboard"
      developmentDay={5}
      priority="high"
      category="ai-features"
      features={[
        'Upload and parse PDF/Word resumes',
        'AI-powered resume optimization',
        'Tailor resume for specific job postings',
        'ATS score analysis and improvements',
        'Version history and templates',
      ]}
    />
  );
}
