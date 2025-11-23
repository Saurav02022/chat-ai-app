import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Job,
  JobState,
  JobStore,
  JobFilters,
  ATSAnalysisResult,
  AnalysisHistory,
} from '@/types/job';

const initialState: JobState = {
  jobs: [],
  isLoading: false,
  error: null,
  filters: {},
};

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Job CRUD operations
      addJob: (jobData) => {
        const newJob: Job = {
          ...jobData,
          id: crypto.randomUUID(),
          appliedDate: new Date(),
          lastUpdated: new Date(),
        };

        set((state) => ({
          jobs: [...state.jobs, newJob],
          error: null,
        }));
      },

      updateJob: (id, updates) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === id
              ? { ...job, ...updates, lastUpdated: new Date() }
              : job
          ),
          error: null,
        })),

      deleteJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((job) => job.id !== id),
          error: null,
        })),

      getJob: (id) => get().jobs.find((job) => job.id === id),

      // Job status management
      updateJobStatus: (id, status) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === id ? { ...job, status, lastUpdated: new Date() } : job
          ),
          error: null,
        })),

      // Filtering and search
      setFilters: (filters: Partial<JobFilters>) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      clearFilters: () => set({ filters: {} }),

      getFilteredJobs: () => {
        const { jobs, filters } = get();

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
      },

      // Statistics
      getJobStats: () => {
        const jobs = get().jobs;

        return {
          total: jobs.length,
          applied: jobs.filter((job) => job.status === 'applied').length,
          interviewing: jobs.filter((job) =>
            ['phone-screen', 'interview'].includes(job.status)
          ).length,
          offers: jobs.filter((job) => job.status === 'offer').length,
          rejected: jobs.filter((job) => job.status === 'rejected').length,
        };
      },

      // Loading and error states
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Resume management
      attachResumeToJob: (jobId: string, fileId: string) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === jobId
              ? {
                  ...job,
                  resumeFileId: fileId,
                  resumeUploadedAt: new Date().toISOString(),
                  lastUpdated: new Date(),
                }
              : job
          ),
          error: null,
        })),

      removeResumeFromJob: (jobId: string) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === jobId
              ? {
                  ...job,
                  resumeFileId: undefined,
                  resumeUploadedAt: undefined,
                  lastUpdated: new Date(),
                }
              : job
          ),
          error: null,
        })),

      // Analysis management
      saveAnalysisResult: (jobId: string, analysis: ATSAnalysisResult) =>
        set((state) => ({
          jobs: state.jobs.map((job) => {
            if (job.id === jobId) {
              const historyEntry: AnalysisHistory = {
                id: `analysis_${Date.now()}`,
                analysisDate: new Date().toISOString(),
                atsResult: analysis,
                resumeFileId: job.resumeFileId || '',
                jobDescriptionHash: btoa(job.description || '').substring(
                  0,
                  16
                ),
              };

              return {
                ...job,
                currentAnalysis: analysis,
                analysisHistory: [
                  historyEntry,
                  ...(job.analysisHistory || []),
                ].slice(0, 10), // Keep last 10 analyses
                lastUpdated: new Date(),
              };
            }
            return job;
          }),
          error: null,
        })),

      getAnalysisHistory: (jobId: string) => {
        const job = get().jobs.find((j) => j.id === jobId);
        return job?.analysisHistory || [];
      },

      clearAnalysisHistory: (jobId: string) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === jobId
              ? {
                  ...job,
                  currentAnalysis: undefined,
                  analysisHistory: [],
                  lastUpdated: new Date(),
                }
              : job
          ),
          error: null,
        })),

      // Utility
      reset: () => set(initialState),
    }),
    {
      name: 'job-storage',
      partialize: (state) => ({
        jobs: state.jobs,
        filters: state.filters,
      }),
    }
  )
);
