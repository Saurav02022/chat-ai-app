'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useJobStore } from '@/lib/stores/jobStore';
import { useToast } from '@/hooks/use-toast';
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Edit,
  Save,
  X,
  User,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { format } from 'date-fns';
import type { Job } from '@/types/job';

const typeLabels = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  contract: 'Contract',
  internship: 'Internship',
};

interface JobOverviewTabProps {
  job: Job;
}

export function JobOverviewTab({ job }: JobOverviewTabProps) {
  const { updateJob } = useJobStore();
  const { toast } = useToast();
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState(job.notes || '');

  const handleSaveNotes = () => {
    updateJob(job.id, { notes: notesValue });
    setIsEditingNotes(false);
    toast({
      title: 'Notes Updated',
      description: 'Your notes have been saved successfully.',
    });
  };

  const handleCancelNotes = () => {
    setNotesValue(job.notes || '');
    setIsEditingNotes(false);
  };

  const formatJobType = (type: string) => {
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  return (
    <div className="space-y-6">
      {/* Job Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Job Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Company</div>
              <div className="text-base font-medium">{job.company}</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Role</div>
              <div className="text-base font-medium">{job.role}</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Location</div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{job.location}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Job Type</div>
              <Badge variant="outline">{formatJobType(job.type)}</Badge>
            </div>

            {job.salary && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">
                  Salary Range
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span>{job.salary}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">
                Applied Date
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{format(new Date(job.appliedDate), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>

          {/* Job URL */}
          {job.jobUrl && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">
                  Job Posting
                </div>
                <a
                  href={job.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Original Posting
                </a>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Job Description */}
      {job.description && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">
                {job.description}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requirements */}
      {job.requirements && job.requirements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {job.requirements.map((requirement, index) => (
                <Badge key={index} variant="secondary">
                  {requirement}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Notes
            </CardTitle>
            {!isEditingNotes && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingNotes(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
          <CardDescription>
            Add your personal notes about this job application
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditingNotes ? (
            <div className="space-y-4">
              <Textarea
                value={notesValue}
                onChange={(e) => setNotesValue(e.target.value)}
                placeholder="Add your notes here..."
                className="min-h-[120px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveNotes} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancelNotes} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-gray-700 whitespace-pre-wrap">
              {job.notes || (
                <span className="text-gray-400 italic">
                  No notes added yet. Click Edit to add your thoughts about this
                  application.
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Information */}
      {(job.contactPerson || job.contactEmail) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {job.contactPerson && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{job.contactPerson}</span>
              </div>
            )}
            {job.contactEmail && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <a
                  href={`mailto:${job.contactEmail}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {job.contactEmail}
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
