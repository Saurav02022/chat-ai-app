'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PUBLIC_ROUTES } from '@/lib/routes';
import { useAuthStore } from '@/lib/stores/authStore';
import { useJobStore } from '@/lib/stores/jobStore';
import { DashboardStats, RecentJobs } from '@/components/dashboard';
import { HeroSection } from '@/components/HeroSection';
import { ProcessFlow } from '@/components/ProcessFlow';
import { FeatureCards } from '@/components/FeatureCards';

function DashboardContent() {
  const { user, logout } = useAuthStore();
  const { jobs } = useJobStore();
  const router = useRouter();

  const handleSignOut = async () => {
    logout();
    router.push(PUBLIC_ROUTES.HOME);
  };

  return (
    <div className="container py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
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
          <Button
            onClick={() => router.push('/jobs?action=create')}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Job
          </Button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Recent Jobs */}
      <div className="mt-8">
        <RecentJobs />
      </div>
    </div>
  );
}

function LandingContent() {
  return (
    <>
      <HeroSection />
      <ProcessFlow />
      <FeatureCards />
    </>
  );
}

export default function Home() {
  const { isAuthenticated, isLoading } = useAuthStore();

  // Show loading state during auth check
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Conditionally render based on auth state
  return isAuthenticated ? <DashboardContent /> : <LandingContent />;
}
