'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PUBLIC_ROUTES } from '@/lib/routes';
import { useAuthStore } from '@/lib/stores/authStore';
import { useJobStore } from '@/lib/stores/jobStore';
import { DashboardStats, RecentJobs } from '@/components/dashboard';

function DashboardContent() {
  const { user, logout } = useAuthStore();
  const { jobs } = useJobStore();
  const router = useRouter();

  const handleSignOut = async () => {
    logout();
    router.push(PUBLIC_ROUTES.HOME);
  };

  return (
    <div className="container py-8 relative">
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

      {/* Recent Jobs */}
      <div className="mt-8">
        <RecentJobs />
      </div>

      {/* Floating Add Job Button */}
      <Button
        onClick={() => router.push('/jobs?action=create')}
        size="lg"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 h-14 px-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 z-50 flex items-center gap-2 font-semibold"
      >
        <Plus className="h-5 w-5" />
        <span>Add Job</span>
      </Button>
    </div>
  );
}

export default function DashboardPage() {
  // TODO: Add AuthGuard wrapper for authentication protection
  return <DashboardContent />;
}
