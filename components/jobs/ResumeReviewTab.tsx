'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  Upload,
  Play,
  Download,
  Clock,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Edit,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

// Import our Day 9 components
import { ATSScoreDisplay } from './ATSScoreDisplay';
import { StrengthsPanel } from './StrengthsPanel';
import { ImprovementsPanel } from './ImprovementsPanel';
import { CompanyInsights } from './CompanyInsights';
import { FileUpload } from '@/components/shared/FileUpload';
import { ResumePreview } from '@/components/shared/ResumePreview';

// Import stores and utilities
import { useJobStore } from '@/lib/stores/jobStore';
import { getFile } from '@/lib/fileStorage';
import type {
  Job,
  ATSAnalysisResult,
  CompanyInsights as CompanyInsightsType,
} from '@/types/job';
import type { FileMetadata } from '@/types/file';

interface ResumeReviewTabProps {
  job: Job;
}

type AnalysisStep =
  | 'idle'
  | 'extracting'
  | 'analyzing'
  | 'generating'
  | 'complete'
  | 'error';

export function ResumeReviewTab({ job }: ResumeReviewTabProps) {
  const [analysisStep, setAnalysisStep] = useState<AnalysisStep>('idle');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStepText, setCurrentStepText] = useState('');

  const { toast } = useToast();
  const {
    saveAnalysisResult,
    attachResumeToJob,
    removeResumeFromJob,
    clearAnalysisHistory,
  } = useJobStore();

  // Get current resume file
  const resumeFile = job.resumeFileId ? getFile(job.resumeFileId) : null;
  const hasResume = !!resumeFile;
  const hasAnalysis = !!job.currentAnalysis;
  const isAnalyzing =
    analysisStep !== 'idle' &&
    analysisStep !== 'complete' &&
    analysisStep !== 'error';

  const handleFileUploaded = (file: FileMetadata) => {
    // Link the uploaded file to this job
    attachResumeToJob(job.id, file.id);

    toast({
      title: 'Resume uploaded',
      description:
        'Your resume has been uploaded successfully. You can now run analysis.',
    });
  };

  const handleChangeResume = () => {
    // Remove current resume to show upload interface again
    removeResumeFromJob(job.id);

    toast({
      title: 'Resume removed',
      description: 'You can now upload a new resume.',
    });
  };

  const handleDeleteResume = (fileId?: string) => {
    // Remove current resume and clear any analysis results
    removeResumeFromJob(job.id);
    clearAnalysisHistory(job.id);

    toast({
      title: 'Resume deleted',
      description: 'Resume and analysis results have been removed.',
      variant: 'destructive',
    });
  };

  const runAnalysis = async () => {
    if (!resumeFile || !job.description) {
      toast({
        title: 'Missing requirements',
        description:
          'Please upload a resume and ensure job description is available.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setAnalysisStep('extracting');
      setAnalysisProgress(10);
      setCurrentStepText('Extracting text from resume...');

      // Simulate progress updates
      const progressSteps = [
        {
          step: 'extracting',
          progress: 25,
          text: 'Processing resume content...',
        },
        {
          step: 'analyzing',
          progress: 50,
          text: 'Analyzing keywords and content...',
        },
        { step: 'analyzing', progress: 75, text: 'Calculating ATS scores...' },
        {
          step: 'generating',
          progress: 90,
          text: 'Generating improvement suggestions...',
        },
      ];

      for (const { step, progress, text } of progressSteps) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAnalysisStep(step as AnalysisStep);
        setAnalysisProgress(progress);
        setCurrentStepText(text);
      }

      // Extract text from resume file
      let resumeText = '';
      if (resumeFile.data) {
        try {
          if (resumeFile.type === 'application/pdf') {
            // For PDF files, use AI to extract text
            const extractResponse = await fetch('/api/ai/extract-text', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fileData: resumeFile.data,
                fileType: resumeFile.type,
              }),
            });

            if (extractResponse.ok) {
              const { text } = await extractResponse.json();
              resumeText = text || '';
            }
          } else {
            // For text-based files, decode base64
            try {
              const base64Data =
                resumeFile.data.split(',')[1] || resumeFile.data;
              resumeText = atob(base64Data);
            } catch (decodeError) {
              console.warn('Failed to decode file data:', decodeError);
              resumeText = resumeFile.data;
            }
          }
        } catch (extractError) {
          console.error('Text extraction failed:', extractError);
          // Fallback to raw data
          resumeText = resumeFile.data;
        }
      }

      // Validate extracted text
      if (!resumeText || resumeText.trim().length < 10) {
        throw new Error(
          'Unable to extract meaningful text from the resume. Please ensure the file contains readable content.'
        );
      }

      // Run actual AI analysis via API route
      const response = await fetch('/api/ai/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: resumeText.trim(),
          jobDescription: job.description,
          companyName: job.company,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Analysis failed');
      }

      const { data } = await response.json();
      const { atsResult, companyInsights } = data;

      // Save results
      saveAnalysisResult(job.id, atsResult, companyInsights);

      setAnalysisStep('complete');
      setAnalysisProgress(100);
      setCurrentStepText('Analysis complete!');

      toast({
        title: 'Analysis complete',
        description: `Your resume scored ${atsResult.overall_score}/100 for this position.`,
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisStep('error');
      setCurrentStepText('Analysis failed. Please try again.');

      toast({
        title: 'Analysis failed',
        description:
          'There was an error analyzing your resume. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const exportAnalysis = () => {
    if (!job.currentAnalysis) return;

    // For now, just show a toast. PDF generation would be implemented here
    toast({
      title: 'Export feature',
      description: 'PDF export functionality will be implemented soon.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Resume Review</h2>
          <p className="text-gray-600 mt-1">
            Upload your resume and get AI-powered ATS analysis for this position
          </p>
        </div>

        {hasAnalysis && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last analyzed:{' '}
              {new Date(
                job.analysisHistory?.[0]?.analysisDate || ''
              ).toLocaleDateString()}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={exportAnalysis}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        )}
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Resume Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!hasResume ? (
            // Show centered upload interface when no resume is uploaded
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <FileUpload
                  onFileUploaded={handleFileUploaded}
                  jobId={job.id}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6"
                />
              </div>
            </div>
          ) : (
            // Show centered resume preview with consistent UI pattern
            <div className="flex justify-center">
              <div className="w-full max-w-2xl space-y-6">
                <h3 className="text-lg font-medium">Resume Preview</h3>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-900">
                      Resume uploaded successfully
                    </span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    {resumeFile?.name} •{' '}
                    {resumeFile?.size
                      ? `${Math.round(resumeFile.size / 1024)}KB`
                      : 'Unknown size'}
                  </p>
                </div>

                <ResumePreview
                  file={resumeFile}
                  className="w-full"
                  onReplace={handleChangeResume}
                  onDelete={handleDeleteResume}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Trigger Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            ATS Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">
                Analyze your resume against this job description to get detailed
                ATS scoring and improvement suggestions.
              </p>
              {!hasResume && (
                <div className="flex items-center gap-2 mt-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Please upload a resume first</span>
                </div>
              )}
            </div>

            <Button
              onClick={runAnalysis}
              disabled={!hasResume || isAnalyzing}
              className="flex items-center gap-2 min-w-[140px]"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>

          {/* Analysis Progress */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">
                    {currentStepText}
                  </span>
                  <span className="text-sm text-blue-700">
                    {analysisProgress}%
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${analysisProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <AnimatePresence>
        {hasAnalysis && job.currentAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Separator />

            {/* ATS Score Display */}
            <ATSScoreDisplay analysis={job.currentAnalysis} />

            {/* Strengths and Improvements */}
            <div className="grid lg:grid-cols-2 gap-6">
              <StrengthsPanel strengths={job.currentAnalysis.strengths} />
              <ImprovementsPanel
                improvements={job.currentAnalysis.improvements}
                missingKeywords={job.currentAnalysis.missing_keywords}
              />
            </div>

            {/* Company Insights */}
            {job.companyInsights && (
              <CompanyInsights
                insights={job.companyInsights}
                companyName={job.company}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!hasResume && !isAnalyzing && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ready to analyze your resume?
            </h3>
            <p className="text-gray-600 mb-4 max-w-md">
              Upload your resume above and click &quot;Run Analysis&quot; to get
              detailed ATS scoring, strengths analysis, and personalized
              improvement suggestions.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
