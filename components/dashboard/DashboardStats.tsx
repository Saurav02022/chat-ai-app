'use client';

import { Briefcase, Calendar, TrendingUp, Target } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { useJobStore } from '@/lib/stores/jobStore';
import { useMemo } from 'react';

export function DashboardStats() {
  const { jobs, getJobStats } = useJobStore();

  const stats = useMemo(() => {
    const jobStats = getJobStats();
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

    // Calculate success rate (offers / total applications)
    const successRate =
      jobStats.total > 0
        ? Math.round((jobStats.offers / jobStats.total) * 100)
        : 0;

    // Calculate interview rate (interviews / total applications)
    const interviewRate =
      jobStats.total > 0
        ? Math.round((jobStats.interviewing / jobStats.total) * 100)
        : 0;

    return {
      totalApplications: {
        value: jobStats.total,
        thisMonth: thisMonthJobs.length,
        trend: { value: 12, label: 'from last month', isPositive: true },
      },
      activeInterviews: {
        value: jobStats.interviewing,
        trend: { value: 8, label: 'from last week', isPositive: true },
      },
      successRate: {
        value: `${successRate}%`,
        trend: { value: 5, label: 'from last month', isPositive: true },
      },
      interviewRate: {
        value: `${interviewRate}%`,
        trend: { value: 3, label: 'from last month', isPositive: true },
      },
    };
  }, [jobs, getJobStats]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Applications"
        value={stats.totalApplications.value}
        description={`${stats.totalApplications.thisMonth} this month`}
        icon={Briefcase}
        trend={stats.totalApplications.trend}
      />
      <StatsCard
        title="Active Interviews"
        value={stats.activeInterviews.value}
        description="Scheduled and in progress"
        icon={Calendar}
        trend={stats.activeInterviews.trend}
      />
      <StatsCard
        title="Success Rate"
        value={stats.successRate.value}
        description="Offers received"
        icon={Target}
        trend={stats.successRate.trend}
      />
      <StatsCard
        title="Interview Rate"
        value={stats.interviewRate.value}
        description="Applications to interviews"
        icon={TrendingUp}
        trend={stats.interviewRate.trend}
      />
    </div>
  );
}
