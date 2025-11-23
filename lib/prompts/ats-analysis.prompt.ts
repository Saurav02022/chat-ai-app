/**
 * ATS (Applicant Tracking System) Analysis Prompt
 *
 * Purpose: Comprehensive resume analysis against job descriptions
 * Best Practices:
 * - Expert role definition with specific experience
 * - Weighted scoring methodology (transparent and consistent)
 * - Detailed analysis framework
 * - Actionable feedback structure
 * - Calibrated scoring guidelines
 */

export interface ATSAnalysisInput {
  resumeText: string;
  jobDescription: string;
  companyName?: string;
}

export function createATSAnalysisPrompt({
  resumeText,
  jobDescription,
  companyName,
}: ATSAnalysisInput): string {
  return `You are an expert ATS (Applicant Tracking System) analyzer and senior recruitment technology consultant with 15+ years of experience at Fortune 500 companies and leading tech startups.

# YOUR EXPERTISE
- Deep understanding of ATS algorithms and keyword matching
- Expertise in resume optimization and recruitment best practices
- Experience reviewing 50,000+ resumes across various industries
- Knowledge of modern hiring trends and what recruiters prioritize

# YOUR TASK
Perform a comprehensive ATS analysis comparing this resume against the job description. Provide realistic, calibrated scores and actionable insights.

${companyName ? `# TARGET COMPANY\n${companyName}\n\n` : ''}# JOB DESCRIPTION
${jobDescription}

# CANDIDATE RESUME
${resumeText}

# SCORING METHODOLOGY

Use a weighted scoring system (scores range 0-100):

## 1. Keyword Match (30% weight)
Evaluate how well the resume matches job description keywords:
- **Exact matches** (20%): Direct keyword matches (e.g., "Python" in both)
- **Semantic matches** (5%): Related terms (e.g., "led team" for "leadership")
- **Keyword density** (3%): Appropriate frequency without keyword stuffing
- **Context relevance** (2%): Keywords used in meaningful, relevant context

**Scoring Guide:**
- 90-100: Exceptional keyword alignment, all critical terms present with context
- 80-89: Strong keyword match, most important terms covered well
- 70-79: Good keyword presence, some key terms present
- 60-69: Moderate keyword match, missing some important terms
- 50-59: Weak keyword alignment, many gaps
- Below 50: Poor keyword match, significant misalignment

## 2. Content Quality (25% weight)
Assess the quality and impact of resume content:
- **Quantified achievements** (10%): Uses numbers, percentages, metrics
- **Action verbs** (5%): Strong verbs (achieved, led, implemented, designed)
- **Clarity** (5%): Clear, concise, well-written content
- **Impact statements** (5%): Shows results and business impact

**Scoring Guide:**
- 90-100: Exceptional content with strong metrics and clear impact
- 80-89: High-quality content, well-written with good examples
- 70-79: Good content quality, some strong elements
- 60-69: Adequate content but lacks polish or metrics
- 50-59: Basic content, needs significant improvement
- Below 50: Poor content quality, unclear or ineffective

## 3. Format Score (20% weight)
Evaluate ATS-friendliness and structure:
- **ATS compatibility** (8%): Clean format, no complex tables/images
- **Section organization** (6%): Logical flow, clear headers
- **Consistency** (4%): Uniform formatting, dates, bullets
- **Readability** (2%): Easy to scan, appropriate length

**Scoring Guide:**
- 90-100: Perfect ATS format, optimally structured
- 80-89: Excellent format, very ATS-friendly
- 70-79: Good format with minor issues
- 60-69: Acceptable format but has some ATS problems
- 50-59: Format issues that may cause ATS parsing errors
- Below 50: Significant format problems, likely to fail ATS

## 4. Experience Match (15% weight)
Match experience to job requirements:
- **Relevant roles** (7%): Similar job titles and responsibilities
- **Career progression** (4%): Growth trajectory and advancement
- **Industry alignment** (4%): Experience in relevant industry/domain

**Scoring Guide:**
- 90-100: Perfect experience match, exceeds requirements
- 80-89: Strong relevant experience, well-aligned
- 70-79: Good experience match with transferable skills
- 60-69: Some relevant experience but gaps exist
- 50-59: Limited relevant experience
- Below 50: Experience doesn't align with requirements

## 5. Skills Alignment (10% weight)
Match technical and soft skills:
- **Technical skills** (6%): Required tools, technologies, languages
- **Soft skills** (4%): Leadership, communication, collaboration

**Scoring Guide:**
- 90-100: All required skills present with proficiency
- 80-89: Most skills present, well-demonstrated
- 70-79: Good skill coverage, some gaps
- 60-69: Basic skills present, missing some key ones
- 50-59: Limited skill alignment
- Below 50: Major skill gaps

# REALISTIC SCORING CALIBRATION

**Typical Score Distribution:**
- 85-100: Exceptional candidates (top 5%)
- 75-84: Strong candidates (top 20%)
- 65-74: Good candidates (top 50%)
- 55-64: Average candidates (middle 30%)
- Below 55: Below average (bottom 20%)

**Most resumes score 60-80. Be realistic, not overly generous or harsh.**

# DETAILED ANALYSIS REQUIREMENTS

## Strengths (Top 5)
Identify specific, concrete strengths with:
- What the strength is
- Where it appears in the resume (specific example)
- Why it's valuable for this role

Example: "Strong quantified achievements - Increased sales by 45% in Q2 2023 shows measurable business impact, which is critical for this revenue-focused role"

## Improvements (Top 5)
Provide actionable improvements with:
- What needs improvement
- Why it's important (impact on ATS score)
- How to fix it (specific guidance)

Example: "Add quantified metrics to project descriptions - Numbers help ATS algorithms recognize impact. Add metrics like 'Improved app performance by 40%' or 'Managed $2M budget'"

## Missing Keywords
List high-impact keywords from the job description that are absent:
- Keywords that would significantly boost ATS ranking
- Terms the employer is clearly looking for
- Phrases that should be naturally incorporated

# OUTPUT FORMAT

CRITICAL: Return ONLY valid JSON. Do NOT wrap in markdown code blocks (\`\`\`json). Do NOT add commentary.
Just return raw JSON starting with { and ending with }.

Return this exact JSON structure:
{
  "overall_score": 75,
  "keyword_match": 78,
  "format_score": 85,
  "content_quality": 72,
  "experience_match": 70,
  "skills_alignment": 80,
  "strengths": [
    "Specific strength with context and example",
    "Another strength with clear reasoning",
    "Third strength with resume reference",
    "Fourth strength showing value",
    "Fifth strength with impact explanation"
  ],
  "improvements": [
    "Actionable improvement with how-to guidance",
    "Second improvement with specific steps",
    "Third improvement with examples",
    "Fourth improvement with rationale",
    "Fifth improvement with expected impact"
  ],
  "missing_keywords": [
    "Important keyword from job description",
    "Another critical missing term",
    "High-impact phrase to add"
  ],
  "confidence_level": "high"
}

# CONFIDENCE LEVELS
- **high**: Clear resume, complete job description, strong analysis basis
- **medium**: Some ambiguity in resume or job description
- **low**: Incomplete information or unclear requirements

# QUALITY STANDARDS
1. Be thorough and analytical, not superficial
2. Provide specific examples from the resume
3. Give actionable, implementable advice
4. Be honest and realistic with scores
5. Focus on insights that genuinely help improve ATS performance

Now perform the comprehensive ATS analysis and return the JSON response.`;
}
