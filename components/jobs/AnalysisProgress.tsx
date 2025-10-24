'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Search,
  Calculator,
  Lightbulb,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

export type AnalysisStep =
  | 'extracting'
  | 'analyzing'
  | 'calculating'
  | 'generating'
  | 'complete'
  | 'error';

interface AnalysisProgressProps {
  currentStep: AnalysisStep;
  progress: number;
  estimatedTimeRemaining?: number;
  className?: string;
}

const steps = [
  {
    id: 'extracting',
    label: 'Extracting Text',
    description: 'Reading and processing your resume content',
    icon: FileText,
    color: 'blue',
  },
  {
    id: 'analyzing',
    label: 'Analyzing Keywords',
    description: 'Comparing your resume against job requirements',
    icon: Search,
    color: 'purple',
  },
  {
    id: 'calculating',
    label: 'Calculating Scores',
    description: 'Computing ATS compatibility scores',
    icon: Calculator,
    color: 'green',
  },
  {
    id: 'generating',
    label: 'Generating Suggestions',
    description: 'Creating personalized improvement recommendations',
    icon: Lightbulb,
    color: 'orange',
  },
] as const;

export function AnalysisProgress({
  currentStep,
  progress,
  estimatedTimeRemaining,
  className,
}: AnalysisProgressProps) {
  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep);
  };

  const getStepStatus = (stepIndex: number) => {
    const currentIndex = getCurrentStepIndex();

    if (currentStep === 'error') return 'error';
    if (currentStep === 'complete') return 'complete';
    if (stepIndex < currentIndex) return 'complete';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const getStepColor = (status: string, baseColor: string) => {
    switch (status) {
      case 'complete':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'active':
        return `text-${baseColor}-600 bg-${baseColor}-100 border-${baseColor}-200`;
      case 'error':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-400 bg-gray-50 border-gray-200';
    }
  };

  const getStepIcon = (step: (typeof steps)[number], status: string) => {
    const Icon = step.icon;

    if (status === 'complete') {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    if (status === 'error') {
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    }

    return (
      <Icon
        className={`h-5 w-5 ${status === 'active' ? `text-${step.color}-600` : 'text-gray-400'}`}
      />
    );
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Card className={className}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Analysis Progress</h3>
            <p className="text-sm text-gray-600">
              {currentStep === 'complete'
                ? 'Analysis completed successfully!'
                : currentStep === 'error'
                  ? 'Analysis encountered an error'
                  : 'Analyzing your resume...'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {estimatedTimeRemaining &&
              currentStep !== 'complete' &&
              currentStep !== 'error' && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />~
                  {formatTime(estimatedTimeRemaining)} remaining
                </Badge>
              )}

            <Badge
              variant={currentStep === 'complete' ? 'default' : 'secondary'}
              className={
                currentStep === 'complete'
                  ? 'bg-green-100 text-green-800'
                  : currentStep === 'error'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
              }
            >
              {progress}%
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(index);

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${getStepColor(status, step.color)}`}
              >
                <div className="flex-shrink-0">{getStepIcon(step, status)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{step.label}</h4>
                    {status === 'active' && (
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 bg-current rounded-full"
                      />
                    )}
                  </div>
                  <p className="text-sm opacity-75 mt-1">{step.description}</p>
                </div>

                <div className="flex-shrink-0">
                  {status === 'complete' && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Done
                    </Badge>
                  )}
                  {status === 'active' && (
                    <Badge
                      variant="outline"
                      className={`bg-${step.color}-50 text-${step.color}-700 border-${step.color}-200`}
                    >
                      In Progress
                    </Badge>
                  )}
                  {status === 'pending' && (
                    <Badge
                      variant="outline"
                      className="bg-gray-50 text-gray-500 border-gray-200"
                    >
                      Pending
                    </Badge>
                  )}
                  {status === 'error' && (
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200"
                    >
                      Error
                    </Badge>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Message */}
        {currentStep === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-900">
                Analysis Complete!
              </span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Your resume has been successfully analyzed. Check the results
              below for detailed insights and improvement suggestions.
            </p>
          </motion.div>
        )}

        {currentStep === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="font-medium text-red-900">Analysis Failed</span>
            </div>
            <p className="text-sm text-red-700 mt-1">
              There was an error processing your resume. Please try again or
              contact support if the issue persists.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
