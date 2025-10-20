export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  uploadedAt: string;
  jobId?: string;
}

export interface StoredFile extends FileMetadata {
  data: string; // base64 encoded file data
  compressed?: boolean;
}

export interface FileUploadProgress {
  fileId: string;
  progress: number; // 0-100
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

export interface FileStorageQuota {
  used: number; // bytes
  limit: number; // bytes
  available: number; // bytes
  percentage: number; // 0-100
}

export type SupportedFileType =
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const SUPPORTED_FILE_TYPES: SupportedFileType[] = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const FILE_TYPE_EXTENSIONS = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    '.docx',
} as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
export const STORAGE_QUOTA_LIMIT = 50 * 1024 * 1024; // 50MB localStorage limit
