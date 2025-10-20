import type {
  FileMetadata,
  StoredFile,
  FileStorageQuota,
  FileValidationResult,
  SupportedFileType,
} from '@/types/file';
import {
  SUPPORTED_FILE_TYPES,
  MAX_FILE_SIZE,
  STORAGE_QUOTA_LIMIT,
} from '@/types/file';

const STORAGE_KEY = 'jobcraft-files';

/**
 * Validate file before upload
 */
export function validateFile(file: File): FileValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check file type
  if (!SUPPORTED_FILE_TYPES.includes(file.type as SupportedFileType)) {
    errors.push(
      'File type not supported. Please upload PDF, DOC, or DOCX files only.'
    );
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push(
      `File size too large. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}.`
    );
  }

  // Check if file is empty
  if (file.size === 0) {
    errors.push('File appears to be empty.');
  }

  // Warnings for large files
  if (file.size > 2 * 1024 * 1024) {
    // 2MB
    warnings.push('Large file detected. Upload may take longer.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Convert file to base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Compress base64 data (simple compression)
 */
function compressBase64(data: string): string {
  try {
    // Simple compression by removing data URL prefix and using btoa/atob
    const base64Data = data.split(',')[1];
    return base64Data;
  } catch {
    return data;
  }
}

/**
 * Decompress base64 data
 */
function decompressBase64(data: string, mimeType: string): string {
  try {
    // Add back data URL prefix
    if (!data.startsWith('data:')) {
      return `data:${mimeType};base64,${data}`;
    }
    return data;
  } catch {
    return data;
  }
}

/**
 * Store file in localStorage
 */
export async function storeFile(
  file: File,
  jobId?: string
): Promise<FileMetadata> {
  // Validate file first
  const validation = validateFile(file);
  if (!validation.isValid) {
    throw new Error(validation.errors.join(', '));
  }

  // Check storage quota
  const quota = getStorageQuota();
  if (quota.available < file.size) {
    throw new Error(
      'Not enough storage space. Please delete some files first.'
    );
  }

  try {
    // Convert to base64
    const base64Data = await fileToBase64(file);

    // Create file metadata
    const fileId = crypto.randomUUID();
    const metadata: FileMetadata = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      uploadedAt: new Date().toISOString(),
      jobId,
    };

    // Compress data for storage
    const compressedData = compressBase64(base64Data);

    const storedFile: StoredFile = {
      ...metadata,
      data: compressedData,
      compressed: true,
    };

    // Get existing files
    const existingFiles = getStoredFiles();

    // Add new file
    existingFiles[fileId] = storedFile;

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingFiles));

    return metadata;
  } catch (error) {
    throw new Error(
      `Failed to store file: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Retrieve file from localStorage
 */
export function getFile(fileId: string): StoredFile | null {
  try {
    const files = getStoredFiles();
    const file = files[fileId];

    if (!file) {
      return null;
    }

    // Decompress data if needed
    if (file.compressed) {
      file.data = decompressBase64(file.data, file.type);
    }

    return file;
  } catch {
    return null;
  }
}

/**
 * Get all stored files
 */
function getStoredFiles(): Record<string, StoredFile> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/**
 * Get file metadata only (without data)
 */
export function getFileMetadata(fileId: string): FileMetadata | null {
  try {
    const files = getStoredFiles();
    const file = files[fileId];

    if (!file) {
      return null;
    }

    // Return metadata without data
    const { data, compressed, ...metadata } = file;
    return metadata;
  } catch {
    return null;
  }
}

/**
 * Get all files for a specific job
 */
export function getJobFiles(jobId: string): FileMetadata[] {
  try {
    const files = getStoredFiles();
    return Object.values(files)
      .filter((file) => file.jobId === jobId)
      .map(({ data, compressed, ...metadata }) => metadata);
  } catch {
    return [];
  }
}

/**
 * Delete file from localStorage
 */
export function deleteFile(fileId: string): boolean {
  try {
    const files = getStoredFiles();

    if (!files[fileId]) {
      return false;
    }

    delete files[fileId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    return true;
  } catch {
    return false;
  }
}

/**
 * Get storage quota information
 */
export function getStorageQuota(): FileStorageQuota {
  try {
    const files = getStoredFiles();
    const used = Object.values(files).reduce(
      (total, file) => total + file.size,
      0
    );
    const available = Math.max(0, STORAGE_QUOTA_LIMIT - used);
    const percentage = Math.round((used / STORAGE_QUOTA_LIMIT) * 100);

    return {
      used,
      limit: STORAGE_QUOTA_LIMIT,
      available,
      percentage,
    };
  } catch {
    return {
      used: 0,
      limit: STORAGE_QUOTA_LIMIT,
      available: STORAGE_QUOTA_LIMIT,
      percentage: 0,
    };
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file type icon name
 */
export function getFileTypeIcon(mimeType: string): string {
  switch (mimeType) {
    case 'application/pdf':
      return 'FileText';
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'FileText';
    default:
      return 'File';
  }
}

/**
 * Clear all stored files (for testing/cleanup)
 */
export function clearAllFiles(): void {
  localStorage.removeItem(STORAGE_KEY);
}
