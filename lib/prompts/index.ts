/**
 * Centralized Prompt Management
 *
 * This file exports all AI prompts used in the application.
 * Each prompt is designed following prompt engineering best practices:
 *
 * 1. Clear role definition (who the AI is)
 * 2. Specific task description (what to do)
 * 3. Detailed guidelines (how to do it)
 * 4. Output format specification (exact structure)
 * 5. Examples and constraints (quality standards)
 *
 * Benefits of this architecture:
 * - Separation of concerns (prompts separate from business logic)
 * - Easy to maintain and version control prompts
 * - Simple to A/B test prompt variations
 * - Clear documentation of AI instructions
 * - Reusable prompt templates
 */

export { createPDFExtractionPrompt } from './pdf-extraction.prompt';

export {
  createJobParsingPrompt,
  type JobParsingInput,
} from './job-parsing.prompt';

export {
  createKeywordExtractionPrompt,
  type KeywordExtractionInput,
} from './keyword-extraction.prompt';

export {
  createATSAnalysisPrompt,
  type ATSAnalysisInput,
} from './ats-analysis.prompt';

export {
  createImprovementSuggestionsPrompt,
  type ImprovementSuggestionsInput,
} from './improvement-suggestions.prompt';
