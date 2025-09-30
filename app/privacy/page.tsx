'use client';

import { ComingSoon } from '@/components/ComingSoon';

export default function PrivacyPage() {
  return (
    <ComingSoon
      title="Privacy Policy"
      description="Learn how JobCraft AI protects and handles your personal information with transparency and care."
      backUrl="/"
      backLabel="Back to Home"
      features={[
        'GDPR compliant data handling',
        'Transparent data usage policies',
        'User control over personal data',
        'Secure data storage practices',
        'Regular privacy updates',
      ]}
      developmentDay={10}
      priority="low"
      category="dashboard"
    />
  );
}
