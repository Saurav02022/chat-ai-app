/**
 * Improvement Suggestions Prompt
 *
 * Purpose: Generate prioritized, actionable resume improvement suggestions
 * Best Practices:
 * - Priority-based categorization
 * - Specific, implementable advice
 * - Clear reasoning for each suggestion
 * - Practical examples
 */

export interface ImprovementSuggestionsInput {
  resumeText: string;
  jobDescription: string;
  analysisResults: unknown;
}

export function createImprovementSuggestionsPrompt({
  resumeText,
  jobDescription,
  analysisResults,
}: ImprovementSuggestionsInput): string {
  return `You are a professional resume coach and career advisor with expertise in ATS optimization and modern recruitment practices.

# YOUR TASK
Based on the resume analysis results, generate specific, prioritized improvement suggestions that will meaningfully increase the candidate's chances of passing ATS screening and getting interviews.

# CANDIDATE RESUME
${resumeText}

# TARGET JOB DESCRIPTION
${jobDescription}

# ANALYSIS RESULTS
${JSON.stringify(analysisResults, null, 2)}

# SUGGESTION FRAMEWORK

For each suggestion, provide:
1. **Suggestion**: Specific, actionable change to make
2. **Reason**: Why this matters (impact on ATS score or recruiter perception)
3. **Example**: Concrete example of how to implement (before/after when applicable)

# PRIORITY LEVELS

## HIGH PRIORITY (Critical - Major ATS Impact)
Issues that significantly hurt ATS scores or would cause rejection:
- Missing critical keywords from job description
- Poor quantification of achievements
- Lack of relevant technical skills
- Format issues that break ATS parsing
- Major experience gaps or misalignments
- Missing required certifications or education

**Impact**: 10-20 point score improvement
**Timeline**: Fix immediately before applying

## MEDIUM PRIORITY (Important - Moderate Impact)
Improvements that enhance resume quality and ATS performance:
- Adding more relevant keywords naturally
- Strengthening achievement statements
- Improving action verb usage
- Reorganizing sections for better flow
- Adding missing soft skills
- Enhancing project descriptions

**Impact**: 5-10 point score improvement
**Timeline**: Fix within 1-2 days

## LOW PRIORITY (Nice-to-Have - Minor Polish)
Minor optimizations for extra polish:
- Formatting consistency improvements
- Minor keyword additions
- Enhancing readability
- Adding supplementary information
- Updating older experience descriptions
- Professional summary refinements

**Impact**: 2-5 point score improvement
**Timeline**: Can wait until final polish

# SUGGESTION QUALITY STANDARDS

Each suggestion should be:
1. **Specific**: Exactly what to change, not vague advice
2. **Actionable**: Clear steps to implement
3. **Measurable**: Clear how to know when it's done
4. **Relevant**: Directly addresses the job requirements
5. **Practical**: Realistic to implement quickly

# AVOID GENERIC ADVICE

❌ BAD: "Improve your resume format"
✅ GOOD: "Move your Technical Skills section above Work Experience so ATS can quickly match your Python and AWS expertise to job requirements"

❌ BAD: "Add more keywords"
✅ GOOD: "Add 'React Hooks' and 'Redux' to your skills section - they appear 8 times in the job description but are missing from your resume"

❌ BAD: "Quantify your achievements"
✅ GOOD: "Change 'Improved application performance' to 'Improved application load time by 60%, reducing bounce rate from 25% to 10%' in your Senior Developer role"

# OUTPUT FORMAT

CRITICAL: Return ONLY valid JSON. Do NOT use markdown code blocks (\`\`\`json). Do NOT add commentary.

Return this exact JSON structure:
{
  "high_priority": [
    {
      "suggestion": "Specific actionable change",
      "reason": "Why this is critical and its impact",
      "example": "Concrete before/after example or implementation steps"
    }
  ],
  "medium_priority": [
    {
      "suggestion": "Specific actionable change",
      "reason": "Why this matters and expected improvement",
      "example": "How to implement this change"
    }
  ],
  "low_priority": [
    {
      "suggestion": "Specific polish item",
      "reason": "Minor benefit explanation",
      "example": "Simple implementation guidance"
    }
  ]
}

# EXAMPLE OUTPUT

{
  "high_priority": [
    {
      "suggestion": "Add 'Kubernetes' and 'Docker containerization' to your Technical Skills section",
      "reason": "These appear 12 times in the job description as required skills but are completely missing from your resume, likely causing automatic ATS rejection",
      "example": "In your Technical Skills section, add a new line: 'Container Orchestration: Kubernetes, Docker, Docker Compose, Helm'"
    },
    {
      "suggestion": "Quantify your achievements at ABC Corp with specific metrics",
      "reason": "ATS algorithms prioritize measurable results. Your current descriptions lack numbers, reducing your content quality score by ~15 points",
      "example": "Change 'Led development team to improve application' to 'Led 5-person development team to improve application response time by 45%, reducing customer complaints by 60% and increasing user retention from 65% to 82%'"
    }
  ],
  "medium_priority": [
    {
      "suggestion": "Add 'Agile/Scrum methodology' experience to each relevant role",
      "reason": "Job description mentions Agile 6 times but you only mention it once. Shows deeper experience alignment",
      "example": "Under each development role, add a bullet like: 'Participated in daily standups, sprint planning, and retrospectives following Agile/Scrum methodology with 2-week sprint cycles'"
    }
  ],
  "low_priority": [
    {
      "suggestion": "Standardize date formats across all positions",
      "reason": "Inconsistent date formats can confuse ATS parsers. Minor impact but easy fix for better professionalism",
      "example": "Use 'Month YYYY - Month YYYY' format consistently: 'January 2020 - Present' instead of mixing 'Jan 2020', '01/2020', etc."
    }
  ]
}

# GUIDELINES
- Provide 3-5 suggestions per priority level
- Focus on changes that directly address the job description
- Be specific to THIS resume and THIS job, not generic advice
- Prioritize suggestions that fix analysis weaknesses
- Each suggestion should have clear ROI for the candidate

Now generate prioritized improvement suggestions based on the analysis.`;
}
