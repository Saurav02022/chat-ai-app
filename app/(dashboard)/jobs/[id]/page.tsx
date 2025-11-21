'use client';

import { useMemo, useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useJobStore } from '@/lib/stores/jobStore';
import { JobHeader } from '@/components/jobs/JobHeader';
import { JobOverviewTab } from '@/components/jobs/JobOverviewTab';
import { ResumeReviewTab } from '@/components/jobs/ResumeReviewTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { PROTECTED_ROUTES } from '@/lib/routes';

function JobDetailsContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { jobs } = useJobStore();

  const [isHydrated, setIsHydrated] = useState(false);

  const jobId = params.id as string;
  const activeTab = searchParams.get('tab') || 'overview';

  // Wait for Zustand store to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Find job reactively - updates when jobs array changes
  const job = useMemo(() => {
    return jobs.find((j) => j.id === jobId);
  }, [jobs, jobId]);

  // Three-state handling: loading, error, data
  const isLoading = !isHydrated;
  const hasError = isHydrated && !job;
  const hasData = isHydrated && !!job;

  const handleTabChange = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', value);
    router.replace(url.pathname + url.search);
  };

  // LOADING STATE: Store is hydrating from localStorage
  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="space-y-6">
          {/* Header skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-48" />
          </div>

          {/* Tabs skeleton */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // ERROR STATE: Job not found after hydration
  if (hasError) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Job Not Found
            </h3>
            <p className="text-gray-600 mb-4">
              The job you&apos;re looking for doesn&apos;t exist or may have
              been deleted.
            </p>
            <button
              onClick={() => router.push(PROTECTED_ROUTES.JOBS)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ← Back to Jobs
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // DATA STATE: Job found and ready to display
  // TypeScript knows job is defined here due to hasData check above
  if (!hasData || !job) {
    // This should never happen due to state checks above, but TypeScript needs it
    return null;
  }

  return (
    <div className="container py-8">
      <div className="space-y-6">
        {/* Job Header */}
        <JobHeader job={job} />

        {/* Tabbed Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resume">Resume Review</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="assistant">Live Assistant</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <JobOverviewTab job={job} />
          </TabsContent>

          <TabsContent value="resume" className="mt-6">
            <ResumeReviewTab job={job} />
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Templates
                </h3>
                <p className="text-gray-600">
                  Template management will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assistant" className="mt-6">
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Live Assistant
                </h3>
                <p className="text-gray-600">
                  AI-powered interview assistant will be implemented in a future
                  update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Analytics
                </h3>
                <p className="text-gray-600">
                  Job application analytics will be implemented in a future
                  update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function JobDetailsPage() {
  // TODO: Add AuthGuard wrapper for authentication protection
  return <JobDetailsContent />;
}
