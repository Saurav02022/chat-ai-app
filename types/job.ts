export type JobStatus =
  | 'applied'
  | 'reviewing'
  | 'phone-screen'
  | 'interview'
  | 'waiting'
  | 'offer'
  | 'rejected'
  | 'withdrawn';

export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';

// Analysis result types
export interface ATSAnalysisResult {
  overall_score: number;
  keyword_match: number;
  format_score: number;
  content_quality: number;
  experience_match: number;
  skills_alignment: number;
  strengths: string[];
  improvements: string[];
  missing_keywords: string[];
  analysis_metadata: {
    processing_time: number;
    word_count: number;
    ai_model_used: string;
    confidence_level: 'high' | 'medium' | 'low';
  };
}

export interface CompanyInsights {
  company_values: string[];
  cultural_fit_tips: string[];
  success_factors: string[];
  competitive_advantages: string[];
}

export interface AnalysisHistory {
  id: string;
  analysisDate: string;
  atsResult: ATSAnalysisResult;
  companyInsights?: CompanyInsights;
  resumeFileId: string;
  jobDescriptionHash: string; // To detect if job description changed
}

export interface Job {
  id: string;
  userId: string;
  company: string;
  role: string;
  location: string;
  type: JobType;
  status: JobStatus;
  salary?: string;
  description?: string;
  requirements?: string[];
  appliedDate: Date;
  lastUpdated: Date;
  notes?: string;
  contactPerson?: string;
  contactEmail?: string;
  jobUrl?: string;
  resumeUsed?: string;
  coverLetterUsed?: string;
  resumeFileId?: string; // Reference to uploaded resume file
  resumeUploadedAt?: string; // When resume was uploaded
  // Analysis results
  currentAnalysis?: ATSAnalysisResult;
  companyInsights?: CompanyInsights;
  analysisHistory?: AnalysisHistory[];
}

export interface JobFilters {
  status?: JobStatus;
  type?: JobType;
  company?: string;
}

export interface JobStats {
  total: number;
  applied: number;
  interviewing: number;
  offers: number;
  rejected: number;
}

export interface JobState {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  filters: JobFilters;
}

export interface JobActions {
  // Job CRUD operations
  addJob: (job: Omit<Job, 'id' | 'appliedDate' | 'lastUpdated'>) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  getJob: (id: string) => Job | undefined;

  // Job status management
  updateJobStatus: (id: string, status: JobStatus) => void;

  // Resume management
  attachResumeToJob: (jobId: string, fileId: string) => void;
  removeResumeFromJob: (jobId: string) => void;

  // Analysis management
  saveAnalysisResult: (
    jobId: string,
    analysis: ATSAnalysisResult,
    insights?: CompanyInsights
  ) => void;
  getAnalysisHistory: (jobId: string) => AnalysisHistory[];
  clearAnalysisHistory: (jobId: string) => void;

  // Filtering and search
  setFilters: (filters: Partial<JobFilters>) => void;
  clearFilters: () => void;
  getFilteredJobs: () => Job[];

  // Statistics
  getJobStats: () => JobStats;

  // Loading and error states
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Utility
  reset: () => void; // For testing purposes
}

export type JobStore = JobState & JobActions;
