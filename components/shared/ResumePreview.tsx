'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { useToast } from '@/hooks/use-toast';
import {
  FileText,
  Download,
  Trash2,
  RefreshCw,
  Calendar,
  HardDrive,
  Eye,
} from 'lucide-react';
import {
  getFile,
  deleteFile,
  formatFileSize,
  getFileTypeIcon,
} from '@/lib/fileStorage';
import { formatDistanceToNow } from 'date-fns';
import type { FileMetadata } from '@/types/file';

interface ResumePreviewProps {
  file: FileMetadata;
  onDelete?: (fileId: string) => void;
  onReplace?: () => void;
  showActions?: boolean;
  className?: string;
}

export function ResumePreview({
  file,
  onDelete,
  onReplace,
  showActions = true,
  className = '',
}: ResumePreviewProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleView = async () => {
    try {
      const storedFile = getFile(file.id);
      if (!storedFile) {
        toast({
          title: 'Error',
          description: 'File not found',
          variant: 'destructive',
        });
        return;
      }

      // Create blob and open in new tab
      const response = await fetch(storedFile.data);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');

      // Clean up URL after a delay
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to open file',
        variant: 'destructive',
      });
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const storedFile = getFile(file.id);
      if (!storedFile) {
        throw new Error('File not found');
      }

      // Create download link
      const link = document.createElement('a');
      link.href = storedFile.data;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Download Started',
        description: `${file.name} is being downloaded.`,
      });
    } catch (error) {
      toast({
        title: 'Download Failed',
        description:
          error instanceof Error ? error.message : 'Failed to download file',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = () => {
    try {
      const success = deleteFile(file.id);
      if (success) {
        onDelete?.(file.id);
        toast({
          title: 'File Deleted',
          description: `${file.name} has been deleted.`,
        });
      } else {
        throw new Error('Failed to delete file');
      }
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description:
          error instanceof Error ? error.message : 'Failed to delete file',
        variant: 'destructive',
      });
    }
    setIsDeleteDialogOpen(false);
  };

  const getFileIcon = () => {
    const iconName = getFileTypeIcon(file.type);
    return <FileText className="h-5 w-5 text-blue-600" />;
  };

  const getFileTypeLabel = () => {
    switch (file.type) {
      case 'application/pdf':
        return 'PDF';
      case 'application/msword':
        return 'DOC';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'DOCX';
      default:
        return 'Document';
    }
  };

  return (
    <>
      <Card className={`${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {getFileIcon()}
              <div className="min-w-0 flex-1">
                <CardTitle className="text-base font-medium truncate">
                  {file.name}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {getFileTypeLabel()}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* File Info */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  Uploaded{' '}
                  {formatDistanceToNow(new Date(file.uploadedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <HardDrive className="h-3 w-3" />
                <span>{formatFileSize(file.size)}</span>
              </div>
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex items-center gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleView}
                  className="flex-1"
                >
                  <Eye className="h-3 w-3 mr-2" />
                  View
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  <Download className="h-3 w-3 mr-2" />
                  {isDownloading ? 'Downloading...' : 'Download'}
                </Button>

                {onReplace && (
                  <Button variant="outline" size="sm" onClick={onReplace}>
                    <RefreshCw className="h-3 w-3 mr-2" />
                    Replace
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{file.name}&quot;? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
