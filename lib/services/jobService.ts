/**
 * Job Service Layer
 *
 * This service provides an abstraction over the data storage mechanism.
 * Currently uses Zustand with localStorage, but can be easily migrated
 * to a backend API (Supabase, Firebase, etc.) by updating this file.
 *
 * Migration strategy:
 * 1. Keep the same interface/function signatures
 * 2. Replace localStorage operations with API calls
 * 3. Add proper error handling and loading states
 * 4. Implement data syncing strategies (optimistic updates, etc.)
 */

import type {
  Job,
  JobFilters,
  JobStatus,
  JobType,
  ATSAnalysisResult,
  CompanyInsights,
} from '@/types/job';

/**
 * Job Service Interface
 * This interface defines all job-related operations.
 * When migrating to a backend, implement this interface with API calls.
 */
export interface IJobService {
  // CRUD Operations
  getAllJobs(): Promise<Job[]>;
  getJobById(id: string): Promise<Job | undefined>;
  createJob(
    jobData: Omit<Job, 'id' | 'appliedDate' | 'lastUpdated'>
  ): Promise<Job>;
  updateJob(id: string, updates: Partial<Job>): Promise<Job>;
  deleteJob(id: string): Promise<void>;

  // Query Operations
  getFilteredJobs(filters: JobFilters): Promise<Job[]>;
  searchJobs(query: string): Promise<Job[]>;

  // Status Operations
  updateJobStatus(id: string, status: JobStatus): Promise<Job>;

  // Analysis Operations
  saveAnalysis(
    jobId: string,
    analysis: ATSAnalysisResult,
    insights?: CompanyInsights
  ): Promise<void>;
  getAnalysisHistory(jobId: string): Promise<
    Array<{
      id: string;
      analysisDate: string;
      atsResult: ATSAnalysisResult;
      companyInsights?: CompanyInsights;
      resumeFileId: string;
      jobDescriptionHash: string;
    }>
  >;

  // Statistics
  getJobStats(): Promise<{
    total: number;
    applied: number;
    interviewing: number;
    offers: number;
    rejected: number;
  }>;
}

/**
 * LocalStorage Job Service Implementation
 * Current implementation using Zustand store with localStorage
 *
 * TO MIGRATE TO DATABASE:
 * 1. Create a new file: lib/services/jobService.api.ts
 * 2. Implement IJobService interface with API calls
 * 3. Replace import in components from './jobService' to './jobService.api'
 * 4. Update environment variables for API endpoints
 */
export class LocalStorageJobService implements IJobService {
  private getStore() {
    // This is a temporary solution to access the store
    // In a real app, you'd inject the store or use a singleton pattern
    if (typeof window === 'undefined') {
      throw new Error('LocalStorage not available on server');
    }

    // Access the store from localStorage directly
    const stored = localStorage.getItem('job-storage');
    if (!stored) {
      return { jobs: [], filters: {} };
    }

    try {
      const parsed = JSON.parse(stored);
      return parsed.state || { jobs: [], filters: {} };
    } catch {
      return { jobs: [], filters: {} };
    }
  }

  private saveStore(data: { jobs: Job[]; filters: JobFilters }) {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('job-storage');
    let current: {
      state: { jobs: Job[]; filters: JobFilters };
      version: number;
    } = {
      state: data,
      version: 0,
    };

    if (stored) {
      try {
        current = JSON.parse(stored);
        current.state = data;
      } catch {
        // Use default if parse fails
      }
    }

    localStorage.setItem('job-storage', JSON.stringify(current));
  }

  async getAllJobs(): Promise<Job[]> {
    const store = this.getStore();
    return store.jobs || [];
  }

  async getJobById(id: string): Promise<Job | undefined> {
    const jobs = await this.getAllJobs();
    return jobs.find((job) => job.id === id);
  }

  async createJob(
    jobData: Omit<Job, 'id' | 'appliedDate' | 'lastUpdated'>
  ): Promise<Job> {
    const newJob: Job = {
      ...jobData,
      id: crypto.randomUUID(),
      appliedDate: new Date(),
      lastUpdated: new Date(),
    };

    const store = this.getStore();
    store.jobs = [...(store.jobs || []), newJob];
    this.saveStore(store);

    return newJob;
  }

  async updateJob(id: string, updates: Partial<Job>): Promise<Job> {
    const store = this.getStore();
    const jobIndex = store.jobs.findIndex((job: Job) => job.id === id);

    if (jobIndex === -1) {
      throw new Error(`Job with id ${id} not found`);
    }

    const updatedJob = {
      ...store.jobs[jobIndex],
      ...updates,
      lastUpdated: new Date(),
    };

    store.jobs[jobIndex] = updatedJob;
    this.saveStore(store);

    return updatedJob;
  }

  async deleteJob(id: string): Promise<void> {
    const store = this.getStore();
    store.jobs = store.jobs.filter((job: Job) => job.id !== id);
    this.saveStore(store);
  }

  async getFilteredJobs(filters: JobFilters): Promise<Job[]> {
    const jobs = await this.getAllJobs();

    return jobs.filter((job) => {
      if (filters.status && job.status !== filters.status) return false;
      if (filters.type && job.type !== filters.type) return false;
      if (
        filters.company &&
        !job.company.toLowerCase().includes(filters.company.toLowerCase())
      )
        return false;
      return true;
    });
  }

  async searchJobs(query: string): Promise<Job[]> {
    const jobs = await this.getAllJobs();
    const lowerQuery = query.toLowerCase();

    return jobs.filter(
      (job) =>
        job.company.toLowerCase().includes(lowerQuery) ||
        job.role.toLowerCase().includes(lowerQuery) ||
        job.location.toLowerCase().includes(lowerQuery)
    );
  }

  async updateJobStatus(id: string, status: JobStatus): Promise<Job> {
    return this.updateJob(id, { status });
  }

  async saveAnalysis(
    jobId: string,
    analysis: ATSAnalysisResult,
    insights?: CompanyInsights
  ): Promise<void> {
    const job = await this.getJobById(jobId);
    if (!job) {
      throw new Error(`Job with id ${jobId} not found`);
    }

    const historyEntry = {
      id: `analysis_${Date.now()}`,
      analysisDate: new Date().toISOString(),
      atsResult: analysis,
      companyInsights: insights,
      resumeFileId: job.resumeFileId || '',
      jobDescriptionHash: btoa(job.description || '').substring(0, 16),
    };

    await this.updateJob(jobId, {
      currentAnalysis: analysis,
      companyInsights: insights,
      analysisHistory: [historyEntry, ...(job.analysisHistory || [])].slice(
        0,
        10
      ),
    });
  }

  async getAnalysisHistory(jobId: string): Promise<
    Array<{
      id: string;
      analysisDate: string;
      atsResult: ATSAnalysisResult;
      companyInsights?: CompanyInsights;
      resumeFileId: string;
      jobDescriptionHash: string;
    }>
  > {
    const job = await this.getJobById(jobId);
    return job?.analysisHistory || [];
  }

  async getJobStats(): Promise<{
    total: number;
    applied: number;
    interviewing: number;
    offers: number;
    rejected: number;
  }> {
    const jobs = await this.getAllJobs();

    return {
      total: jobs.length,
      applied: jobs.filter((job) => job.status === 'applied').length,
      interviewing: jobs.filter((job) =>
        ['phone-screen', 'interview'].includes(job.status)
      ).length,
      offers: jobs.filter((job) => job.status === 'offer').length,
      rejected: jobs.filter((job) => job.status === 'rejected').length,
    };
  }
}

// Export singleton instance
export const jobService = new LocalStorageJobService();

/**
 * MIGRATION EXAMPLE to Supabase:
 *
 * export class SupabaseJobService implements IJobService {
 *   private supabase = createClient();
 *
 *   async getAllJobs(): Promise<Job[]> {
 *     const { data, error } = await this.supabase
 *       .from('jobs')
 *       .select('*')
 *       .order('appliedDate', { ascending: false });
 *
 *     if (error) throw error;
 *     return data || [];
 *   }
 *
 *   async createJob(jobData): Promise<Job> {
 *     const { data, error } = await this.supabase
 *       .from('jobs')
 *       .insert(jobData)
 *       .select()
 *       .single();
 *
 *     if (error) throw error;
 *     return data;
 *   }
 *
 *   // ... implement other methods
 * }
 *
 * export const jobService = new SupabaseJobService();
 */
