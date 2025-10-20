'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  X,
  Loader2,
} from 'lucide-react';
import {
  validateFile,
  storeFile,
  formatFileSize,
  getStorageQuota,
} from '@/lib/fileStorage';
import type {
  FileMetadata,
  FileUploadProgress,
  FileValidationResult,
} from '@/types/file';

interface FileUploadProps {
  onFileUploaded?: (file: FileMetadata) => void;
  onError?: (error: string) => void;
  jobId?: string;
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
}

export function FileUpload({
  onFileUploaded,
  onError,
  jobId,
  maxFiles = 1,
  className = '',
  disabled = false,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<FileUploadProgress[]>(
    []
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const processFile = useCallback(
    async (file: File) => {
      const fileId = crypto.randomUUID();

      // Add to upload progress
      const progress: FileUploadProgress = {
        fileId,
        progress: 0,
        status: 'uploading',
      };

      setUploadProgress((prev) => [...prev, progress]);

      try {
        // Validate file
        const validation: FileValidationResult = validateFile(file);

        if (!validation.isValid) {
          throw new Error(validation.errors.join(', '));
        }

        // Show warnings if any
        if (validation.warnings && validation.warnings.length > 0) {
          validation.warnings.forEach((warning) => {
            toast({
              title: 'Warning',
              description: warning,
              variant: 'default',
            });
          });
        }

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) =>
            prev.map((p) =>
              p.fileId === fileId
                ? { ...p, progress: Math.min(p.progress + 10, 90) }
                : p
            )
          );
        }, 100);

        // Store file
        const metadata = await storeFile(file, jobId);

        // Complete upload
        clearInterval(progressInterval);
        setUploadProgress((prev) =>
          prev.map((p) =>
            p.fileId === fileId
              ? { ...p, progress: 100, status: 'completed' }
              : p
          )
        );

        // Success callback
        onFileUploaded?.(metadata);

        toast({
          title: 'File Uploaded',
          description: `${file.name} has been uploaded successfully.`,
        });

        // Remove from progress after delay
        setTimeout(() => {
          setUploadProgress((prev) => prev.filter((p) => p.fileId !== fileId));
        }, 2000);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Upload failed';

        // Update progress with error
        setUploadProgress((prev) =>
          prev.map((p) =>
            p.fileId === fileId
              ? { ...p, status: 'error', error: errorMessage }
              : p
          )
        );

        // Error callback
        onError?.(errorMessage);

        toast({
          title: 'Upload Failed',
          description: errorMessage,
          variant: 'destructive',
        });

        // Remove from progress after delay
        setTimeout(() => {
          setUploadProgress((prev) => prev.filter((p) => p.fileId !== fileId));
        }, 3000);
      }
    },
    [jobId, onFileUploaded, onError, toast]
  );

  const processFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      // Check max files limit
      if (files.length > maxFiles) {
        const error = `Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`;
        setValidationErrors([error]);
        onError?.(error);
        return;
      }

      // Clear previous errors
      setValidationErrors([]);

      // Check storage quota
      const quota = getStorageQuota();
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);

      if (quota.available < totalSize) {
        const error = `Not enough storage space. Need ${formatFileSize(totalSize)}, but only ${formatFileSize(quota.available)} available.`;
        setValidationErrors([error]);
        onError?.(error);
        return;
      }

      // Process each file
      for (const file of files) {
        await processFile(file);
      }
    },
    [maxFiles, onError, processFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    },
    [disabled, processFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      processFiles(files);

      // Reset input value to allow re-uploading the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [processFiles]
  );

  const removeUploadProgress = useCallback((fileId: string) => {
    setUploadProgress((prev) => prev.filter((p) => p.fileId !== fileId));
  }, []);

  const openFileDialog = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  return (
    <div className={className}>
      {/* Upload Area */}
      <Card
        className={`
          border-2 border-dashed transition-colors cursor-pointer
          ${
            isDragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <CardContent className="flex flex-col items-center justify-center py-8 px-4 text-center">
          <div className="mb-4">
            <Upload
              className={`h-12 w-12 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`}
            />
          </div>

          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900">
              {isDragOver ? 'Drop files here' : 'Upload Resume'}
            </p>
            <p className="text-sm text-gray-600">
              Drag and drop your resume here, or click to browse
            </p>
            <p className="text-xs text-gray-500">
              Supports PDF, DOC, DOCX • Max {formatFileSize(5 * 1024 * 1024)}
            </p>
          </div>

          <Button
            variant="outline"
            className="mt-4"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              openFileDialog();
            }}
          >
            Choose File
          </Button>
        </CardContent>
      </Card>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        multiple={maxFiles > 1}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
        aria-label="Upload resume file"
        id="resume-file-input"
      />

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Upload Progress */}
      {uploadProgress.length > 0 && (
        <div className="mt-4 space-y-3">
          {uploadProgress.map((progress) => (
            <Card key={progress.fileId} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {progress.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : progress.status === 'error' ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  )}
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">
                    {progress.status === 'uploading'
                      ? 'Uploading...'
                      : progress.status === 'processing'
                        ? 'Processing...'
                        : progress.status === 'completed'
                          ? 'Upload Complete'
                          : 'Upload Failed'}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeUploadProgress(progress.fileId)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              {progress.status !== 'completed' && (
                <Progress value={progress.progress} className="mb-2" />
              )}

              {progress.error && (
                <p className="text-xs text-red-600">{progress.error}</p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
