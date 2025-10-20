'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PUBLIC_ROUTES } from '@/lib/routes';
import { useAuthStore } from '@/lib/stores/authStore';
import { useJobStore } from '@/lib/stores/jobStore';
import {
  DashboardStats,
  QuickActions,
  RecentJobs,
} from '@/components/dashboard';
import { initializeMockData } from '@/lib/mockData';

function DashboardContent() {
  const { user, logout } = useAuthStore();
  const { jobs, addJob } = useJobStore();
  const router = useRouter();

  // Initialize with mock data if no jobs exist
  useEffect(() => {
    if (jobs.length === 0) {
      const mockJobs = initializeMockData();
      mockJobs.forEach((job) => addJob(job));
    }
  }, [jobs.length, addJob]);

  const handleSignOut = async () => {
    logout();
    router.push(PUBLIC_ROUTES.HOME);
  };

  return (
    <div className="container py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user?.avatar || ''} alt={user?.name || ''} />
            <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to land your dream job?
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Quick Actions */}
      <div className="mt-8">
        <QuickActions />
      </div>

      {/* Recent Jobs */}
      <div className="mt-8">
        <RecentJobs />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  // TODO: Add AuthGuard wrapper for authentication protection
  return <DashboardContent />;
}
