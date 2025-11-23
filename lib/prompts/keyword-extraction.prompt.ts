/**
 * Keyword Extraction Prompt
 *
 * Purpose: Extract and categorize relevant keywords from resumes or job descriptions
 * Best Practices:
 * - Context-aware extraction (resume vs job description)
 * - Clear categorization rules
 * - Examples for each category
 * - Accuracy over quantity
 */

export interface KeywordExtractionInput {
  text: string;
  context: 'resume' | 'job_description';
}

export function createKeywordExtractionPrompt({
  text,
  context,
}: KeywordExtractionInput): string {
  const contextGuidance =
    context === 'resume'
      ? 'Focus on skills the candidate claims to have, their experience level, and industry domains.'
      : 'Focus on skills the employer requires, experience expectations, and industry-specific terms.';

  return `You are a professional recruiter and keyword extraction specialist with expertise in ATS (Applicant Tracking Systems).

# YOUR TASK
Analyze this ${context.replace('_', ' ')} and extract keywords categorized by type.

${contextGuidance}

# INPUT TEXT
${text}

# KEYWORD CATEGORIES

## 1. Technical Skills
Hard technical competencies including:
- Programming languages (Python, JavaScript, Java, C++, etc.)
- Frameworks & libraries (React, Django, TensorFlow, Spring Boot, etc.)
- Tools & platforms (Git, Docker, Jenkins, AWS, Azure, etc.)
- Databases (PostgreSQL, MongoDB, Redis, etc.)
- Methodologies (REST API, Microservices, CI/CD, etc.)

Examples: ["Python", "React", "AWS", "PostgreSQL", "Docker", "Kubernetes"]

## 2. Soft Skills
Interpersonal and professional competencies:
- Communication abilities (written, verbal, presentation)
- Leadership qualities (team leadership, mentoring, strategic thinking)
- Collaboration skills (cross-functional, stakeholder management)
- Problem-solving approaches (analytical, creative, critical thinking)
- Work style (organized, detail-oriented, self-motivated)

Examples: ["Team leadership", "Cross-functional collaboration", "Problem-solving", "Strong communication"]

## 3. Experience Keywords
Career level and experience indicators:
- Years of experience (e.g., "5+ years", "10 years")
- Seniority levels (Senior, Lead, Principal, Junior, Entry-level)
- Job titles (Engineer, Manager, Director, Analyst)
- Career progression indicators
- Industry-specific experience terms

Examples: ["5+ years experience", "Senior level", "Team Lead", "Mid-level professional"]

## 4. Industry Terms
Domain-specific terminology:
- Industry jargon and acronyms (SaaS, B2B, FinTech, HealthTech)
- Certifications (AWS Certified, PMP, CPA, CISSP)
- Methodologies (Agile, Scrum, Kanban, Lean, Six Sigma)
- Compliance & standards (HIPAA, GDPR, ISO 9001, SOC 2)
- Domain knowledge (Machine Learning, Cloud Architecture, Data Analytics)

Examples: ["Agile methodology", "AWS Certified Solutions Architect", "HIPAA compliance", "FinTech"]

# EXTRACTION RULES

1. **Only extract explicitly mentioned terms**
   - Don't infer or assume skills not stated
   - Don't extract synonyms unless both are mentioned

2. **Use original phrasing when possible**
   - "5+ years of experience" not "5 years"
   - "Senior Software Engineer" not "Senior Engineer"

3. **Avoid duplicates**
   - Don't repeat keywords across categories
   - Choose the most appropriate category for each term

4. **Be comprehensive but accurate**
   - Extract all relevant keywords
   - But don't over-extract or include irrelevant terms

5. **Handle variations**
   - Group obvious duplicates (e.g., "React.js" and "React" → just "React")
   - Keep different forms if meaningfully different (e.g., "JavaScript" and "Node.js" are both valid)

# OUTPUT FORMAT

CRITICAL: Return ONLY valid JSON. Do NOT use markdown code blocks (\`\`\`json). Do NOT add commentary.

Return this exact JSON structure:
{
  "technical_skills": ["skill1", "skill2", "skill3"],
  "soft_skills": ["skill1", "skill2"],
  "experience_keywords": ["keyword1", "keyword2"],
  "industry_terms": ["term1", "term2", "term3"]
}

# EXAMPLE OUTPUT (for a resume)
{
  "technical_skills": [
    "Python",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Docker",
    "REST APIs",
    "Git"
  ],
  "soft_skills": [
    "Team leadership",
    "Cross-functional collaboration",
    "Mentoring",
    "Strategic thinking",
    "Problem-solving"
  ],
  "experience_keywords": [
    "5+ years experience",
    "Senior Software Engineer",
    "Tech Lead",
    "Full-stack development"
  ],
  "industry_terms": [
    "Agile methodology",
    "Scrum",
    "CI/CD",
    "Microservices architecture",
    "AWS Certified Developer",
    "SaaS"
  ]
}

Now analyze the provided text and extract categorized keywords.`;
}
