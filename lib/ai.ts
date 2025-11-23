import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ATSAnalysisResult } from '@/types/ai';
import {
  createPDFExtractionPrompt,
  createJobParsingPrompt,
  createKeywordExtractionPrompt,
  createATSAnalysisPrompt,
  createImprovementSuggestionsPrompt,
} from './prompts';

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Rate limiting and error handling
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

/**
 * Utility function to handle API calls with retry logic
 */
async function withRetry<T>(
  operation: () => Promise<T>,
  retries: number = MAX_RETRIES
): Promise<T> {
  try {
    return await operation();
  } catch (error: unknown) {
    if (
      retries > 0 &&
      error &&
      typeof error === 'object' &&
      'status' in error &&
      typeof error.status === 'number' &&
      (error.status === 429 || error.status >= 500)
    ) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return withRetry(operation, retries - 1);
    }
    throw error;
  }
}

/**
 * Use Gemini for text processing
 * Model: gemini-2.5-flash (officially supports PDF, audio, video, text)
 * Source: https://ai.google.dev/gemini-api/docs/models#gemini-2.5-flash
 */
export async function processWithGemini(prompt: string): Promise<string> {
  try {
    // Use Gemini 2.5 Flash - fast, intelligent, supports multimodal
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await withRetry(() => model.generateContent(prompt));
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API failed:', error);
    throw new Error(
      `Failed to process with Gemini: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Use Gemini for JSON output with controlled generation
 * This uses Gemini's responseM imeType feature to guarantee JSON output without markdown wrappers
 * Source: https://ai.google.dev/gemini-api/docs/structured-output
 */
export async function processWithGeminiJSON(prompt: string): Promise<string> {
  try {
    // Use Gemini 2.5 Flash with JSON mode
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const result = await withRetry(() => model.generateContent(prompt));
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini JSON API failed:', error);
    throw new Error(
      `Failed to process with Gemini JSON mode: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Extract text from PDF using Gemini 2.5 Flash
 * Gemini 2.5 models officially support PDF inputs
 * Source: https://ai.google.dev/gemini-api/docs/models#gemini-2.5-flash
 */
export async function extractTextFromPDF(base64PDF: string): Promise<{
  text: string;
  structured_data: {
    contact_info?: Record<string, string>;
    sections?: Record<string, string>;
  };
}> {
  try {
    // Remove data URL prefix if present (e.g., "data:application/pdf;base64,")
    const base64Data = base64PDF.includes(',')
      ? base64PDF.split(',')[1]
      : base64PDF;

    console.log(
      `Processing PDF with Gemini 2.5 Flash (${Math.round(base64Data.length / 1024)} KB)`
    );

    // Use Gemini 2.5 Flash - officially supports PDF
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Use well-engineered prompt from prompts directory
    const prompt = createPDFExtractionPrompt();

    // Send full PDF to Gemini using inlineData
    const result = await withRetry(() =>
      model.generateContent([
        {
          inlineData: {
            mimeType: 'application/pdf',
            data: base64Data, // Send COMPLETE PDF, not truncated!
          },
        },
        { text: prompt },
      ])
    );

    const response = await result.response;
    const extractedText = response.text().trim();

    console.log(
      `✅ Successfully extracted ${extractedText.length} characters from PDF`
    );

    if (!extractedText || extractedText.length < 10) {
      throw new Error(
        'No meaningful text was extracted from the PDF. The PDF might be empty or image-based.'
      );
    }

    return {
      text: extractedText,
      structured_data: {}, // Can be enhanced with AI later if needed
    };
  } catch (error) {
    console.error('PDF extraction failed:', error);
    throw new Error(
      `Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Parse job description using AI
 */
export async function parseJobDescription(jobDescription: string): Promise<{
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
}> {
  // Use well-engineered prompt from prompts directory
  const prompt = createJobParsingPrompt({ jobDescription });

  try {
    // Use Gemini JSON mode for guaranteed JSON output (no markdown wrappers)
    const result = await processWithGeminiJSON(prompt);
    return JSON.parse(result);
  } catch (error) {
    console.error('Job parsing failed:', error);
    return {
      requirements: [],
      responsibilities: [],
      skills: [],
      benefits: [],
    };
  }
}

/**
 * Extract keywords using AI
 */
export async function extractKeywords(
  text: string,
  context: 'resume' | 'job_description' = 'resume'
): Promise<{
  technical_skills: string[];
  soft_skills: string[];
  experience_keywords: string[];
  industry_terms: string[];
}> {
  // Use well-engineered prompt from prompts directory
  const prompt = createKeywordExtractionPrompt({ text, context });

  try {
    // Use Gemini JSON mode for guaranteed JSON output (no markdown wrappers)
    const result = await processWithGeminiJSON(prompt);
    return JSON.parse(result);
  } catch (error) {
    console.error('Keyword extraction failed:', error);
    return {
      technical_skills: [],
      soft_skills: [],
      experience_keywords: [],
      industry_terms: [],
    };
  }
}

/**
 * Comprehensive ATS analysis using AI with enhanced scoring
 */
export async function analyzeResumeForATS(
  resumeText: string,
  jobDescription: string,
  companyName?: string
): Promise<{
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
}> {
  const startTime = Date.now();

  // Use well-engineered prompt from prompts directory
  const prompt = createATSAnalysisPrompt({
    resumeText,
    jobDescription,
    companyName,
  });

  try {
    // Use Gemini JSON mode for guaranteed JSON output (no markdown wrappers)
    const result = await processWithGeminiJSON(prompt);
    const modelUsed = 'gemini-2.5-flash-json';

    const analysis = JSON.parse(result);
    const processingTime = Date.now() - startTime;
    const wordCount = resumeText.split(/\s+/).length;

    // Validate and normalize scores
    const validatedAnalysis = validateATSScores(analysis);

    return {
      ...validatedAnalysis,
      analysis_metadata: {
        processing_time: processingTime,
        word_count: wordCount,
        ai_model_used: modelUsed,
        confidence_level:
          (analysis.confidence_level as 'high' | 'medium' | 'low') || 'medium',
      },
    };
  } catch (error) {
    console.error('ATS analysis failed:', error);
    return {
      overall_score: 0,
      keyword_match: 0,
      format_score: 0,
      content_quality: 0,
      experience_match: 0,
      skills_alignment: 0,
      strengths: ['Unable to analyze resume at this time'],
      improvements: ['Please try again or contact support'],
      missing_keywords: [],
      analysis_metadata: {
        processing_time: Date.now() - startTime,
        word_count: resumeText.split(/\s+/).length,
        ai_model_used: 'error',
        confidence_level: 'low',
      },
    };
  }
}

/**
 * Validate and normalize ATS scores to ensure consistency
 */
function validateATSScores(analysis: Record<string, unknown>): {
  overall_score: number;
  keyword_match: number;
  format_score: number;
  content_quality: number;
  experience_match: number;
  skills_alignment: number;
  strengths: string[];
  improvements: string[];
  missing_keywords: string[];
  confidence_level?: string;
} {
  // Ensure all scores are between 0-100
  const normalizeScore = (score: number): number => {
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  // Weighted calculation of overall score
  const weights = {
    keyword_match: 0.3,
    content_quality: 0.25,
    format_score: 0.2,
    experience_match: 0.15,
    skills_alignment: 0.1,
  };

  const normalizedScores = {
    keyword_match: normalizeScore((analysis.keyword_match as number) || 0),
    format_score: normalizeScore((analysis.format_score as number) || 0),
    content_quality: normalizeScore((analysis.content_quality as number) || 0),
    experience_match: normalizeScore(
      (analysis.experience_match as number) || 0
    ),
    skills_alignment: normalizeScore(
      (analysis.skills_alignment as number) || 0
    ),
  };

  // Calculate weighted overall score
  const calculatedOverallScore = Math.round(
    normalizedScores.keyword_match * weights.keyword_match +
      normalizedScores.content_quality * weights.content_quality +
      normalizedScores.format_score * weights.format_score +
      normalizedScores.experience_match * weights.experience_match +
      normalizedScores.skills_alignment * weights.skills_alignment
  );

  return {
    overall_score: calculatedOverallScore,
    ...normalizedScores,
    strengths: Array.isArray(analysis.strengths)
      ? (analysis.strengths as string[]).slice(0, 5)
      : [],
    improvements: Array.isArray(analysis.improvements)
      ? (analysis.improvements as string[]).slice(0, 5)
      : [],
    missing_keywords: Array.isArray(analysis.missing_keywords)
      ? (analysis.missing_keywords as string[]).slice(0, 10)
      : [],
    confidence_level: analysis.confidence_level as string,
  };
}

/**
 * Generate improvement suggestions using AI
 */
export async function generateImprovementSuggestions(
  resumeText: string,
  jobDescription: string,
  analysisResults: ATSAnalysisResult
): Promise<{
  high_priority: Array<{
    suggestion: string;
    reason: string;
    example?: string;
  }>;
  medium_priority: Array<{
    suggestion: string;
    reason: string;
    example?: string;
  }>;
  low_priority: Array<{ suggestion: string; reason: string; example?: string }>;
}> {
  // Use well-engineered prompt from prompts directory
  const prompt = createImprovementSuggestionsPrompt({
    resumeText,
    jobDescription,
    analysisResults: analysisResults as unknown,
  });

  try {
    // Use Gemini JSON mode for guaranteed JSON output (no markdown wrappers)
    const result = await processWithGeminiJSON(prompt);
    return JSON.parse(result);
  } catch (error) {
    console.error('Suggestion generation failed:', error);
    return {
      high_priority: [],
      medium_priority: [],
      low_priority: [],
    };
  }
}

/**
 * Test Gemini AI connection
 */
export async function testAIConnection(): Promise<{
  gemini: boolean;
}> {
  let geminiWorking = false;

  // Test Gemini
  try {
    if (process.env.GEMINI_API_KEY) {
      await processWithGemini('Hello');
      geminiWorking = true;
    }
  } catch (error) {
    console.error('Gemini test failed:', error);
  }

  return {
    gemini: geminiWorking,
  };
}
