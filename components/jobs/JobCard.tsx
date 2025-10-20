'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useJobStore } from '@/lib/stores/jobStore';
import { useRouter } from 'next/navigation';
import { PROTECTED_ROUTES } from '@/lib/routes';
import { formatDistanceToNow } from 'date-fns';
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Star,
  StarOff,
} from 'lucide-react';
import type { Job } from '@/types/job';
import { EditJobModal } from '@/components/jobs/EditJobModal';
import { DeleteJobDialog } from '@/components/jobs/DeleteJobDialog';

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

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter();
  const { deleteJob } = useJobStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleViewDetails = () => {
    router.push(`${PROTECTED_ROUTES.JOBS}/${job.id}`);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    deleteJob(job.id);
    setIsDeleteDialogOpen(false);
  };

  const formatJobType = (type: string) => {
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  const formatStatus = (status: string) => {
    return status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <>
      <Card
        className="hover:shadow-md transition-all duration-200 cursor-pointer group"
        onClick={handleViewDetails}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold text-gray-900 truncate">
                {job.role}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700 font-medium truncate">
                  {job.company}
                </span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails();
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit();
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Status and Type */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className={statusColors[job.status]}>
                {formatStatus(job.status)}
              </Badge>
              <Badge variant="outline">{formatJobType(job.type)}</Badge>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm truncate">{job.location}</span>
            </div>

            {/* Salary */}
            {job.salary && (
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm truncate">{job.salary}</span>
              </div>
            )}

            {/* Applied Date */}
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                Applied{' '}
                {formatDistanceToNow(new Date(job.appliedDate), {
                  addSuffix: true,
                })}
              </span>
            </div>

            {/* Notes Preview */}
            {job.notes && (
              <div className="text-sm text-gray-600 line-clamp-2">
                {job.notes}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <EditJobModal
        job={job}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />

      {/* Delete Dialog */}
      <DeleteJobDialog
        job={job}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </>
  );
}
