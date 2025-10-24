'use client';

import { ComingSoon } from '@/components/ComingSoon';

function SettingsContent() {
  return (
    <ComingSoon
      title="Account Settings"
      description="Customize your JobCraft AI experience, manage preferences, and configure your profile."
      backUrl="/dashboard"
      backLabel="Back to Dashboard"
      features={[
        'Profile management',
        'Notification preferences',
        'Privacy settings',
        'AI coaching preferences',
        'Integration settings',
      ]}
      developmentDay={9}
      priority="low"
      category="dashboard"
    />
  );
}

export default function SettingsPage() {
  // TODO: Add AuthGuard wrapper for authentication protection
  return <SettingsContent />;
}
