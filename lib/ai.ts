import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ATSAnalysisResult } from '@/types/ai';

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
 * Use Gemini for text processing (cheaper and faster for most tasks)
 */
export async function processWithGemini(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await withRetry(() => model.generateContent(prompt));
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API failed:', error);
    throw new Error('Failed to process with Gemini');
  }
}

/**
 * Extract text from PDF using AI (OCR-like capability)
 */
export async function extractTextFromPDF(base64PDF: string): Promise<{
  text: string;
  structured_data: {
    contact_info?: Record<string, string>;
    sections?: Record<string, string>;
  };
}> {
  const prompt = `
You are a PDF text extraction expert. Extract and structure the text from this resume/document.

Return a JSON response with:
1. "text" - the complete extracted text
2. "structured_data" - organized sections like:
   - contact_info: {email, phone, linkedin, github, etc.}
   - sections: {summary, experience, education, skills, etc.}

Be thorough and accurate. Preserve formatting where important.

PDF Data: ${base64PDF.substring(0, 1000)}... (truncated for demo)
`;

  try {
    const result = await processWithGemini(prompt);
    return JSON.parse(result);
  } catch (error) {
    console.error('PDF extraction failed:', error);
    return {
      text: '',
      structured_data: {},
    };
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
  const prompt = `
Analyze this job description and extract structured information:

Job Description:
${jobDescription}

Return JSON with these fields:
- title: job title
- company: company name
- location: job location
- salary: salary range if mentioned
- experience_level: required experience (e.g., "3+ years", "Senior", etc.)
- employment_type: full-time, part-time, contract, etc.
- requirements: array of job requirements
- responsibilities: array of job responsibilities
- skills: array of required technical/soft skills
- benefits: array of benefits offered

Be precise and extract only what's explicitly mentioned.
`;

  try {
    const result = await processWithGemini(prompt);
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
  const prompt = `
Analyze this ${context} text and extract relevant keywords categorized as:

1. Technical Skills: programming languages, frameworks, tools, technologies
2. Soft Skills: leadership, communication, problem-solving, etc.
3. Experience Keywords: years of experience, job titles, seniority levels
4. Industry Terms: domain-specific terminology, methodologies, certifications

Text:
${text}

Return JSON format:
{
  "technical_skills": [],
  "soft_skills": [],
  "experience_keywords": [],
  "industry_terms": []
}

Be comprehensive but accurate. Only include skills/terms that are clearly mentioned.
`;

  try {
    const result = await processWithGemini(prompt);
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

  const prompt = `
You are an expert ATS (Applicant Tracking System) analyzer with 10+ years of experience in recruitment technology. 

IMPORTANT SCORING GUIDELINES:
- Use weighted scoring: Keyword Match (30%), Content Quality (25%), Format Score (20%), Experience Match (15%), Skills Alignment (10%)
- Scores must be realistic and well-calibrated (most resumes score 60-85)
- Be specific and actionable in feedback
- Consider industry standards and best practices

${companyName ? `Company: ${companyName}` : ''}

Job Description:
${jobDescription}

Resume:
${resumeText}

Analyze this resume against the job description with these specific criteria:

1. **Keyword Match (30% weight)**: Exact and semantic matches, keyword density, context relevance
2. **Content Quality (25% weight)**: Quantified achievements, action verbs, clarity, impact statements
3. **Format Score (20% weight)**: ATS-friendly structure, consistent formatting, proper sections
4. **Experience Match (15% weight)**: Relevant roles, progression, industry alignment
5. **Skills Alignment (10% weight)**: Technical and soft skills match, proficiency levels

Provide detailed analysis with:
- Realistic scores (0-100) for each category
- Top 5 specific strengths with examples
- Top 5 actionable improvements with implementation guidance
- Missing keywords that would significantly improve ATS ranking
- Overall confidence level in the analysis

Return JSON format:
{
  "overall_score": 0,
  "keyword_match": 0,
  "format_score": 0,
  "content_quality": 0,
  "experience_match": 0,
  "skills_alignment": 0,
  "strengths": ["Specific strength with example context"],
  "improvements": ["Actionable improvement with how-to guidance"],
  "missing_keywords": ["high-impact keywords from job description"],
  "confidence_level": "high"
}

Be thorough, realistic, and provide insights that will genuinely help improve the resume's ATS performance.
`;

  try {
    // Use Gemini for AI analysis
    const result = await processWithGemini(prompt);
    const modelUsed = 'gemini-pro';

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
  const prompt = `
Based on the resume analysis, provide specific improvement suggestions.

Resume:
${resumeText}

Job Description:
${jobDescription}

Analysis Results:
${JSON.stringify(analysisResults, null, 2)}

Provide improvement suggestions categorized by priority with:
- Specific, actionable suggestion
- Clear reason why it's important
- Example of how to implement (when applicable)

Return JSON format:
{
  "high_priority": [{"suggestion": "", "reason": "", "example": ""}],
  "medium_priority": [{"suggestion": "", "reason": "", "example": ""}],
  "low_priority": [{"suggestion": "", "reason": "", "example": ""}]
}

Focus on actionable improvements that will increase ATS scores.
`;

  try {
    const result = await processWithGemini(prompt);
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
 * Generate company-specific insights using AI
 */
export async function generateCompanyInsights(
  companyName: string,
  jobDescription: string
): Promise<{
  company_values: string[];
  cultural_fit_tips: string[];
  success_factors: string[];
  competitive_advantages: string[];
}> {
  const prompt = `
Analyze this job description from ${companyName} and provide insights to help candidates.

Job Description:
${jobDescription}

Provide insights on:
1. Company values (based on job description language)
2. Cultural fit tips (what the company values in candidates)
3. Success factors (what makes someone successful in this role)
4. Competitive advantages (what would make a candidate stand out)

Return JSON format:
{
  "company_values": [],
  "cultural_fit_tips": [],
  "success_factors": [],
  "competitive_advantages": []
}

Be specific and actionable based on the job description content.
`;

  try {
    const result = await processWithGemini(prompt);
    return JSON.parse(result);
  } catch (error) {
    console.error('Company insights generation failed:', error);
    return {
      company_values: [],
      cultural_fit_tips: [],
      success_factors: [],
      competitive_advantages: [],
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
