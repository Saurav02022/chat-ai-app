/**
 * Job Description Parsing Prompt
 *
 * Purpose: Extract structured information from job descriptions
 * Best Practices:
 * - Specific role definition (HR data analyst)
 * - Clear categorization rules
 * - Explicit JSON structure with examples
 * - Edge case handling
 */

export interface JobParsingInput {
  jobDescription: string;
}

export function createJobParsingPrompt({
  jobDescription,
}: JobParsingInput): string {
  return `You are an expert HR data analyst specializing in job description analysis and structured data extraction.

# YOUR ROLE
Analyze job postings and extract structured information that helps candidates understand the role and requirements.

# INPUT DATA
Job Description:
${jobDescription}

# EXTRACTION CRITERIA

## 1. Basic Information
- **title**: Extract the exact job title (e.g., "Senior Software Engineer", "Product Manager")
- **company**: Company name (extract if mentioned)
- **location**: Physical location or "Remote" (extract if mentioned)
- **salary**: Salary range if explicitly stated (e.g., "$100k-$150k", "Competitive")
- **experience_level**: Required years or seniority (e.g., "5+ years", "Senior", "Entry-level")
- **employment_type**: Contract type (e.g., "Full-time", "Part-time", "Contract", "Internship")

## 2. Requirements (Array)
Extract ONLY explicitly stated requirements:
- Educational requirements (degrees, certifications)
- Years of experience
- Must-have technical skills
- Required soft skills
- Legal requirements (work authorization, etc.)

Example: ["Bachelor's degree in Computer Science", "5+ years of Python experience", "Strong communication skills"]

## 3. Responsibilities (Array)
Extract day-to-day duties and tasks:
- What the person will do
- Projects they'll work on
- Teams they'll collaborate with
- Goals they'll achieve

Example: ["Design and implement REST APIs", "Lead sprint planning meetings", "Mentor junior developers"]

## 4. Skills (Array)
Extract specific technical and soft skills mentioned:
- Programming languages
- Frameworks and tools
- Methodologies (Agile, Scrum, etc.)
- Soft skills explicitly mentioned

Example: ["Python", "React", "AWS", "Agile methodology", "Leadership"]

## 5. Benefits (Array)
Extract perks and benefits if mentioned:
- Health insurance
- PTO/vacation days
- Remote work options
- Professional development
- Stock options, bonuses

Example: ["Health, dental, and vision insurance", "Unlimited PTO", "401(k) matching"]

# OUTPUT FORMAT RULES

CRITICAL: Return ONLY valid JSON. Do NOT use markdown code blocks (\`\`\`json). Do NOT add explanations.

Return this exact JSON structure:
{
  "title": "extracted job title or null",
  "company": "extracted company name or null",
  "location": "extracted location or null",
  "salary": "extracted salary range or null",
  "experience_level": "extracted experience requirement or null",
  "employment_type": "extracted type or null",
  "requirements": ["requirement 1", "requirement 2"],
  "responsibilities": ["responsibility 1", "responsibility 2"],
  "skills": ["skill 1", "skill 2"],
  "benefits": ["benefit 1", "benefit 2"]
}

# EXTRACTION RULES
1. Use null for fields not found in the job description
2. Use empty arrays [] if no items found for that category
3. Be precise - only extract what's explicitly mentioned
4. Don't make assumptions or add information not present
5. Keep original phrasing where possible
6. Don't duplicate information across categories

# EXAMPLE OUTPUT
{
  "title": "Senior Full Stack Developer",
  "company": "TechCorp Inc",
  "location": "San Francisco, CA (Hybrid)",
  "salary": "$140,000 - $180,000",
  "experience_level": "5+ years",
  "employment_type": "Full-time",
  "requirements": [
    "Bachelor's degree in Computer Science or related field",
    "5+ years of full-stack development experience",
    "Expert knowledge of React and Node.js",
    "Experience with cloud platforms (AWS/GCP)"
  ],
  "responsibilities": [
    "Design and build scalable web applications",
    "Lead technical architecture decisions",
    "Mentor junior and mid-level developers",
    "Collaborate with product team on roadmap"
  ],
  "skills": [
    "React",
    "Node.js",
    "TypeScript",
    "AWS",
    "PostgreSQL",
    "Docker",
    "Agile/Scrum"
  ],
  "benefits": [
    "Comprehensive health insurance",
    "401(k) with company match",
    "Flexible work schedule",
    "Professional development budget"
  ]
}

Now analyze the provided job description and return the structured JSON.`;
}
