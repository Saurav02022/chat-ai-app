'use client';

import { ComingSoon } from '@/components/ComingSoon';

export default function PricingPage() {
  return (
    <ComingSoon
      title="Pricing Plans"
      description="Choose the perfect plan for your job search journey. From free basic features to premium AI coaching."
      backUrl="/"
      backLabel="Back to Home"
      developmentDay={10}
      priority="low"
      category="dashboard"
      features={[
        'Free tier with basic features',
        'Premium AI coaching plans',
        'Enterprise solutions',
        'Flexible monthly/yearly billing',
        'Money-back guarantee',
      ]}
    />
  );
}
