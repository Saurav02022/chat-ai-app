'use client';

import { Briefcase, Calendar, Clock, Gift } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { useJobStore } from '@/lib/stores/jobStore';
import { useMemo } from 'react';

export function DashboardStats() {
  const { jobs } = useJobStore();

  const stats = useMemo(() => {
    // Calculate job stats directly from jobs array (REAL data, no fake trends)
    const jobStats = {
      total: jobs.length,
      interviewing: jobs.filter((job) =>
        ['phone-screen', 'interview'].includes(job.status)
      ).length,
      pending: jobs.filter((job) =>
        ['applied', 'reviewing'].includes(job.status)
      ).length,
      offers: jobs.filter((job) => job.status === 'offer').length,
    };

    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    // Calculate this month's applications
    const thisMonthJobs = jobs.filter((job) => {
      const appliedDate = new Date(job.appliedDate);
      return (
        appliedDate.getMonth() === thisMonth &&
        appliedDate.getFullYear() === thisYear
      );
    });

    return {
      totalApplications: {
        value: jobStats.total,
        description: `${thisMonthJobs.length} this month`,
      },
      activeInterviews: {
        value: jobStats.interviewing,
        description: 'Scheduled and in progress',
      },
      pendingResponses: {
        value: jobStats.pending,
        description: 'Awaiting response',
      },
      offersReceived: {
        value: jobStats.offers,
        description: 'Offers in hand',
      },
    };
  }, [jobs]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Applications"
        value={stats.totalApplications.value}
        description={stats.totalApplications.description}
        icon={Briefcase}
      />
      <StatsCard
        title="Active Interviews"
        value={stats.activeInterviews.value}
        description={stats.activeInterviews.description}
        icon={Calendar}
      />
      <StatsCard
        title="Pending Responses"
        value={stats.pendingResponses.value}
        description={stats.pendingResponses.description}
        icon={Clock}
      />
      <StatsCard
        title="Offers Received"
        value={stats.offersReceived.value}
        description={stats.offersReceived.description}
        icon={Gift}
      />
    </div>
  );
}
