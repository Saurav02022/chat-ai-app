'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useJobStore } from '@/lib/stores/jobStore';
import { JobCard } from '@/components/jobs/JobCard';
import { CreateJobModal } from '@/components/jobs/CreateJobModal';
import { Plus, Search, Filter } from 'lucide-react';
import type { JobStatus, JobType } from '@/types/job';

function JobsContent() {
  const searchParams = useSearchParams();
  const { jobs, setFilters, filters } = useJobStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Handle URL query parameter to open create modal
  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'create') {
      setIsCreateModalOpen(true);
    }
  }, [searchParams]);

  // Filter jobs based on search term and filters
  const filteredJobs = useMemo(() => {
    // Apply store filters first
    let result = jobs.filter((job) => {
      if (filters.status && job.status !== filters.status) return false;
      if (filters.type && job.type !== filters.type) return false;
      if (
        filters.company &&
        !job.company.toLowerCase().includes(filters.company.toLowerCase())
      )
        return false;
      return true;
    });

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by applied date (newest first)
    return result.sort(
      (a, b) =>
        new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
    );
  }, [jobs, filters, searchTerm]);

  const handleStatusFilter = (status: string) => {
    setFilters({
      status: status === 'all' ? undefined : (status as JobStatus),
    });
  };

  const handleTypeFilter = (type: string) => {
    setFilters({ type: type === 'all' ? undefined : (type as JobType) });
  };

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your job applications in one place
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Job
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
          <CardDescription>
            Filter and search through your job applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by company, role, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select
              value={filters.status || 'all'}
              onValueChange={handleStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="phone-screen">Phone Screen</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="withdrawn">Withdrawn</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select
              value={filters.type || 'all'}
              onValueChange={handleTypeFilter}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {jobs.length === 0
                ? 'No job applications yet'
                : 'No jobs match your filters'}
            </h3>
            <p className="text-gray-600 mb-4">
              {jobs.length === 0
                ? 'Start tracking your job applications by adding your first job.'
                : 'Try adjusting your search or filter criteria.'}
            </p>
            {jobs.length === 0 && (
              <Button onClick={() => setIsCreateModalOpen(true)}>
                Add Your First Job
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* Create Job Modal */}
      <CreateJobModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}

export default function JobsPage() {
  // TODO: Add AuthGuard wrapper for authentication protection
  return (
    <Suspense fallback={<div className="container py-8">Loading...</div>}>
      <JobsContent />
    </Suspense>
  );
}
