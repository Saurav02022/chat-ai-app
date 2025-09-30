'use client';

import { ComingSoon } from '@/components/ComingSoon';

export default function TermsPage() {
  return (
    <ComingSoon
      title="Terms of Service"
      description="Read our terms and conditions to understand your rights and responsibilities when using JobCraft AI."
      backUrl="/"
      backLabel="Back to Home"
      developmentDay={10}
      priority="low"
      category="dashboard"
      features={[
        'Clear usage guidelines',
        'User rights and responsibilities',
        'Service availability terms',
        'Data usage agreements',
        'Account management policies',
      ]}
    />
  );
}
