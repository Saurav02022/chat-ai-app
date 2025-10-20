'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Job } from '@/types/job';

interface DeleteJobDialogProps {
  job: Job;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteJobDialog({
  job,
  open,
  onOpenChange,
  onConfirm,
}: DeleteJobDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Job Application</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete your application for{' '}
            <span className="font-semibold">{job.role}</span> at{' '}
            <span className="font-semibold">{job.company}</span>?
            <br />
            <br />
            This action cannot be undone and will permanently remove all
            associated data including notes, timeline, and any uploaded
            documents.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Delete Application
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
