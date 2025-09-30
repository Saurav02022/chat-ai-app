'use client';

import { ComingSoon } from '@/components/ComingSoon';

export default function SupportPage() {
  return (
    <ComingSoon
      title="Support Center"
      description="Get help with JobCraft AI. Find answers, contact our team, and access helpful resources."
      backUrl="/"
      backLabel="Back to Home"
      features={[
        'Comprehensive FAQ section',
        'Live chat support',
        'Email support',
        'Video tutorials',
        'Community forum',
      ]}
      developmentDay={9}
      priority="medium"
      category="dashboard"
    />
  );
}
