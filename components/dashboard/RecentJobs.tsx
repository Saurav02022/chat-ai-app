'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useJobStore } from '@/lib/stores/jobStore';
import { useRouter } from 'next/navigation';
import { PROTECTED_ROUTES } from '@/lib/routes';
import { formatDistanceToNow } from 'date-fns';
import { Building2, MapPin, DollarSign } from 'lucide-react';

const statusColors = {
  applied: 'bg-blue-100 text-blue-800',
  reviewing: 'bg-yellow-100 text-yellow-800',
  'phone-screen': 'bg-purple-100 text-purple-800',
  interview: 'bg-orange-100 text-orange-800',
  waiting: 'bg-gray-100 text-gray-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  withdrawn: 'bg-gray-100 text-gray-600',
};

export function RecentJobs() {
  const { jobs } = useJobStore();
  const router = useRouter();

  // Get the 5 most recent jobs
  const recentJobs = jobs
    .sort(
      (a, b) =>
        new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
    )
    .slice(0, 5);

  const handleViewJob = (jobId: string) => {
    router.push(`${PROTECTED_ROUTES.JOBS}/${jobId}`);
  };

  const handleViewAllJobs = () => {
    router.push(PROTECTED_ROUTES.JOBS);
  };

  if (recentJobs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No applications yet</h3>
            <p className="text-muted-foreground mb-4">
              Start tracking your job applications to see them here.
            </p>
            <Button
              onClick={() =>
                router.push(PROTECTED_ROUTES.JOBS + '?action=create')
              }
            >
              Add Your First Job
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Applications</CardTitle>
        <Button variant="outline" size="sm" onClick={handleViewAllJobs}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => handleViewJob(job.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium truncate">{job.role}</h4>
                  <Badge
                    variant="secondary"
                    className={statusColors[job.status]}
                  >
                    {job.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    <span className="truncate">{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span className="truncate">{job.salary}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs text-muted-foreground ml-4">
                {formatDistanceToNow(new Date(job.appliedDate), {
                  addSuffix: true,
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
