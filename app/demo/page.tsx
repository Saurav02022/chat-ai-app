'use client';

import { ComingSoon } from '@/components/ComingSoon';

export default function DemoPage() {
  return (
    <ComingSoon
      title="Interactive Demo"
      description="Experience JobCraft AI's powerful features with our interactive demo. See how AI can transform your job search."
      backUrl="/"
      backLabel="Back to Home"
      developmentDay={3}
      priority="medium"
      category="ai-features"
      features={[
        'Live resume analysis demo',
        'AI interview assistant preview',
        'Template generation showcase',
        'Interactive feature walkthrough',
        'Real-time coaching simulation',
      ]}
    />
  );
}
