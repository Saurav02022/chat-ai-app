'use client';

import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  FileText,
  Phone,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Calendar,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import type { Job } from '@/types/job';

interface TimelineEvent {
  id: string;
  type:
    | 'created'
    | 'status_change'
    | 'note_added'
    | 'resume_uploaded'
    | 'interview_scheduled';
  title: string;
  description?: string;
  timestamp: Date;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const statusColors = {
  applied: 'text-blue-600 bg-blue-100',
  reviewing: 'text-yellow-600 bg-yellow-100',
  'phone-screen': 'text-purple-600 bg-purple-100',
  interview: 'text-orange-600 bg-orange-100',
  waiting: 'text-gray-600 bg-gray-100',
  offer: 'text-green-600 bg-green-100',
  rejected: 'text-red-600 bg-red-100',
  withdrawn: 'text-gray-600 bg-gray-100',
};

interface JobTimelineProps {
  job: Job;
}

export function JobTimeline({ job }: JobTimelineProps) {
  // Helper functions (moved before useMemo to avoid hoisting issues)
  const formatStatus = (status: string) => {
    return status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return Plus;
      case 'reviewing':
        return Clock;
      case 'phone-screen':
        return Phone;
      case 'interview':
        return Users;
      case 'offer':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      case 'withdrawn':
        return XCircle;
      default:
        return Clock;
    }
  };

  const timelineEvents = useMemo(() => {
    const events: TimelineEvent[] = [];

    // Job created event
    events.push({
      id: 'created',
      type: 'created',
      title: 'Application Created',
      description: `Applied for ${job.role} at ${job.company}`,
      timestamp: new Date(job.appliedDate),
      icon: Plus,
      color: 'text-blue-600 bg-blue-100',
    });

    // Status change events (simulated based on current status)
    // In a real app, you'd track actual status changes with timestamps
    if (job.status !== 'applied') {
      const statusChangeDate = new Date(job.lastUpdated);

      events.push({
        id: 'status_change',
        type: 'status_change',
        title: `Status Updated`,
        description: `Changed to ${formatStatus(job.status)}`,
        timestamp: statusChangeDate,
        icon: getStatusIcon(job.status),
        color: statusColors[job.status] || 'text-gray-600 bg-gray-100',
      });
    }

    // Resume uploaded event (if resume is specified)
    if (job.resumeUsed) {
      const resumeDate = new Date(job.appliedDate);
      resumeDate.setHours(resumeDate.getHours() + 1); // Simulate 1 hour after application

      events.push({
        id: 'resume_uploaded',
        type: 'resume_uploaded',
        title: 'Resume Attached',
        description: `Uploaded ${job.resumeUsed}`,
        timestamp: resumeDate,
        icon: FileText,
        color: 'text-indigo-600 bg-indigo-100',
      });
    }

    // Interview scheduled event (if status is interview or beyond)
    if (['interview', 'waiting', 'offer', 'rejected'].includes(job.status)) {
      const interviewDate = new Date(job.lastUpdated);
      interviewDate.setDate(interviewDate.getDate() - 1); // Simulate 1 day before status change

      events.push({
        id: 'interview_scheduled',
        type: 'interview_scheduled',
        title: 'Interview Scheduled',
        description: 'Interview round scheduled',
        timestamp: interviewDate,
        icon: Calendar,
        color: 'text-purple-600 bg-purple-100',
      });
    }

    // Notes added event (if notes exist)
    if (job.notes) {
      const notesDate = new Date(job.lastUpdated);

      events.push({
        id: 'note_added',
        type: 'note_added',
        title: 'Notes Added',
        description: 'Personal notes updated',
        timestamp: notesDate,
        icon: Edit,
        color: 'text-gray-600 bg-gray-100',
      });
    }

    // Sort events by timestamp (newest first)
    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [job]);

  if (timelineEvents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No timeline events yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {timelineEvents.map((event, index) => {
        const Icon = event.icon;
        const isLast = index === timelineEvents.length - 1;

        return (
          <div key={event.id} className="relative">
            {/* Timeline line */}
            {!isLast && (
              <div className="absolute left-4 top-8 w-0.5 h-8 bg-gray-200" />
            )}

            {/* Event */}
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${event.color}`}
              >
                <Icon className="h-4 w-4" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">
                    {event.title}
                  </h4>
                  <time className="text-xs text-gray-500">
                    {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                  </time>
                </div>

                {event.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {event.description}
                  </p>
                )}

                <p className="text-xs text-gray-400 mt-1">
                  {format(event.timestamp, "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Timeline end */}
      <div className="flex items-center gap-3 pt-2">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gray-400" />
        </div>
        <p className="text-xs text-gray-400">Application started</p>
      </div>
    </div>
  );
}
