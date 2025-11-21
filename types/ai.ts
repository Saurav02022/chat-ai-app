/**
 * TypeScript types for AI-powered functionality
 */

// Keyword extraction types
export interface ExtractedKeywords {
  technical_skills: string[];
  soft_skills: string[];
  experience_keywords: string[];
  industry_terms: string[];
}

// ATS Analysis types
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
}

// Improvement suggestions types
export interface ImprovementSuggestion {
  suggestion: string;
  reason: string;
  example?: string;
}

export interface CategorizedSuggestions {
  high_priority: ImprovementSuggestion[];
  medium_priority: ImprovementSuggestion[];
  low_priority: ImprovementSuggestion[];
}

// Company insights types
export interface CompanyInsights {
  company_values: string[];
  cultural_fit_tips: string[];
  success_factors: string[];
  competitive_advantages: string[];
}

// PDF extraction types
export interface PDFExtractionResult {
  text: string;
  structured_data: {
    contact_info?: Record<string, string>;
    sections?: Record<string, string>;
  };
}

// Job parsing types
export interface ParsedJobDescription {
  title?: string;
  company?: string;
  location?: string;
  salary?: string;
  experience_level?: string;
  employment_type?: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  benefits: string[];
}

// AI service types
export interface AIConnectionStatus {
  gemini: boolean;
}

// Analysis request/response types
export interface AnalysisRequest {
  resume_text: string;
  job_description: string;
  company_name?: string;
}

export interface AnalysisResponse {
  success: boolean;
  data?: {
    ats_analysis: ATSAnalysisResult;
    suggestions: CategorizedSuggestions;
    company_insights?: CompanyInsights;
    processing_time: number;
  };
  error?: string;
}
