'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useJobStore } from '@/lib/stores/jobStore';
import { useToast } from '@/hooks/use-toast';
import { PROTECTED_ROUTES } from '@/lib/routes';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Edit,
  ExternalLink,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Job, JobStatus } from '@/types/job';
import { EditJobModal } from './EditJobModal';

const statusColors = {
  applied: 'bg-blue-100 text-blue-800 border-blue-200',
  reviewing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'phone-screen': 'bg-purple-100 text-purple-800 border-purple-200',
  interview: 'bg-orange-100 text-orange-800 border-orange-200',
  waiting: 'bg-gray-100 text-gray-800 border-gray-200',
  offer: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  withdrawn: 'bg-gray-100 text-gray-600 border-gray-200',
};

const typeLabels = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  contract: 'Contract',
  internship: 'Internship',
};

interface JobHeaderProps {
  job: Job;
}

export function JobHeader({ job }: JobHeaderProps) {
  const router = useRouter();
  const { updateJobStatus } = useJobStore();
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleBackToJobs = () => {
    router.push(PROTECTED_ROUTES.JOBS);
  };

  const handleStatusChange = (newStatus: JobStatus) => {
    updateJobStatus(job.id, newStatus);
    toast({
      title: 'Status Updated',
      description: `Job status changed to ${formatStatus(newStatus)}`,
    });
  };

  const formatStatus = (status: string) => {
    return status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatJobType = (type: string) => {
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  return (
    <>
      <div className="space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToJobs}
            className="p-0 h-auto font-normal hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Jobs
          </Button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{job.company}</span>
        </div>

        {/* Main Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left side - Job Info */}
            <div className="flex-1 space-y-4">
              {/* Company and Role */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {job.role}
                    </h1>
                    <p className="text-lg text-gray-600">{job.company}</p>
                  </div>
                </div>
              </div>

              {/* Status and Type Badges */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Status:
                  </span>
                  <Select value={job.status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-auto h-8 border-0 p-0 focus:ring-0">
                      <SelectValue asChild>
                        <Badge
                          variant="secondary"
                          className={`${statusColors[job.status]} cursor-pointer hover:opacity-80`}
                        >
                          {formatStatus(job.status)}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
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
                </div>

                <Badge variant="outline">{formatJobType(job.type)}</Badge>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>

                {job.salary && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Applied{' '}
                    {formatDistanceToNow(new Date(job.appliedDate), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                {job.jobUrl && (
                  <div className="flex items-center gap-2">
                    <a
                      href={job.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View Posting</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Button
                onClick={() => setIsEditModalOpen(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Details
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          {(job.contactPerson || job.contactEmail) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Contact Information
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                {job.contactPerson && (
                  <div>
                    <span className="font-medium">Contact: </span>
                    {job.contactPerson}
                  </div>
                )}
                {job.contactEmail && (
                  <div>
                    <span className="font-medium">Email: </span>
                    <a
                      href={`mailto:${job.contactEmail}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {job.contactEmail}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditJobModal
        job={job}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />
    </>
  );
}
