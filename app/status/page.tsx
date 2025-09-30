'use client';

import { ComingSoon } from '@/components/ComingSoon';

export default function StatusPage() {
  return (
    <ComingSoon
      title="System Status"
      description="Check the current status of JobCraft AI services and get updates on any ongoing maintenance or issues."
      backUrl="/"
      backLabel="Back to Home"
      developmentDay={10}
      priority="low"
      category="dashboard"
      features={[
        'Real-time service status',
        'Maintenance notifications',
        'Historical uptime data',
        'Performance metrics',
        'Incident reports',
      ]}
    />
  );
}
