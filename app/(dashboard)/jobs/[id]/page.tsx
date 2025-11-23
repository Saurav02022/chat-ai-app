'use client';

import { useMemo, useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useJobStore } from '@/lib/stores/jobStore';
import { JobHeader } from '@/components/jobs/JobHeader';
import { JobOverviewTab } from '@/components/jobs/JobOverviewTab';
import { ResumeReviewTab } from '@/components/jobs/ResumeReviewTab';
import { InterviewPrepTab } from '@/components/jobs/InterviewPrepTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, FileText, Video, BarChart3 } from 'lucide-react';
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
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
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-32" />
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Job Not Found
            </h3>
            <p className="text-gray-600 mb-6">
              The job you&apos;re looking for doesn&apos;t exist or may have
              been deleted.
            </p>
            <button
              onClick={() => router.push(PROTECTED_ROUTES.JOBS)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              ← Back to Jobs
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // DATA STATE: Job found and ready to display
  if (!hasData || !job) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      <div className="space-y-6">
        {/* Job Header */}
        <JobHeader job={job} />

        {/* Tabbed Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Info</span>
            </TabsTrigger>
            <TabsTrigger
              value="resume"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Resume & Analysis</span>
              <span className="sm:hidden">Resume</span>
            </TabsTrigger>
            <TabsTrigger
              value="interview"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Interview Prep</span>
              <span className="sm:hidden">Interview</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <JobOverviewTab job={job} />
          </TabsContent>

          <TabsContent value="resume" className="mt-6">
            <ResumeReviewTab job={job} />
          </TabsContent>

          <TabsContent value="interview" className="mt-6">
            <InterviewPrepTab job={job} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function JobDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-4" />
              <p className="text-gray-600">Loading job details...</p>
            </div>
          </div>
        </div>
      }
    >
      <JobDetailsContent />
    </Suspense>
  );
}
