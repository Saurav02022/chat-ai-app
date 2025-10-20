'use client';

import Link from 'next/link';
import { useJobStore } from '@/lib/stores/jobStore';
import { PUBLIC_ROUTES } from '@/lib/routes';

export function DashboardFooter() {
  const { jobs } = useJobStore();
  const currentYear = new Date().getFullYear();

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter((job) =>
      ['applied', 'reviewing', 'phone-screen', 'interview', 'waiting'].includes(
        job.status
      )
    ).length,
    successRate:
      jobs.length > 0
        ? Math.round(
            (jobs.filter((job) => job.status === 'offer').length /
              jobs.length) *
              100
          )
        : 0,
  };

  return (
    <footer className="border-t bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/30">
      <div className="container py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left side - Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium">{stats.totalJobs}</span>
              <span>Total Applications</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{stats.activeJobs}</span>
              <span>Active</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{stats.successRate}%</span>
              <span>Success Rate</span>
            </div>
          </div>

          {/* Right side - Links and Copyright */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <div className="flex items-center gap-4 text-sm">
              <Link
                href={PUBLIC_ROUTES.SUPPORT}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Support
              </Link>
              <Link
                href={PUBLIC_ROUTES.PRIVACY}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href={PUBLIC_ROUTES.TERMS}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Terms
              </Link>
            </div>
            <div className="text-sm text-gray-500">
              © {currentYear} JobCraft AI. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
