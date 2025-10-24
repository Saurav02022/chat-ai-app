'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  FileText,
  Brain,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ATSScoreDisplayProps {
  analysis: {
    overall_score: number;
    keyword_match: number;
    format_score: number;
    content_quality: number;
    experience_match: number;
    skills_alignment: number;
    analysis_metadata?: {
      processing_time: number;
      word_count: number;
      ai_model_used: string;
      confidence_level: 'high' | 'medium' | 'low';
    };
  };
  className?: string;
}

export function ATSScoreDisplay({ analysis, className }: ATSScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 40) return 'Needs Work';
    return 'Poor';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <TrendingUp className="h-4 w-4" />;
    if (score >= 50) return <Minus className="h-4 w-4" />;
    return <TrendingDown className="h-4 w-4" />;
  };

  const getConfidenceColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [
    {
      name: 'Keyword Match',
      score: analysis.keyword_match,
      weight: '30%',
      description: 'How well your keywords match job requirements',
    },
    {
      name: 'Content Quality',
      score: analysis.content_quality,
      weight: '25%',
      description: 'Clarity, achievements, and impact statements',
    },
    {
      name: 'Format Score',
      score: analysis.format_score,
      weight: '20%',
      description: 'ATS-friendly structure and formatting',
    },
    {
      name: 'Experience Match',
      score: analysis.experience_match,
      weight: '15%',
      description: 'Relevant experience for the role',
    },
    {
      name: 'Skills Alignment',
      score: analysis.skills_alignment,
      weight: '10%',
      description: 'Technical and soft skills match',
    },
  ];

  return (
    <div className={className}>
      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={`mb-6 ${getScoreBgColor(analysis.overall_score)}`}>
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2">
              {getScoreIcon(analysis.overall_score)}
              ATS Compatibility Score
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative inline-block"
            >
              {/* Circular Progress */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-gray-200"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <motion.path
                    className={getScoreColor(analysis.overall_score)}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${analysis.overall_score}, 100`}
                    initial={{ strokeDasharray: '0, 100' }}
                    animate={{
                      strokeDasharray: `${analysis.overall_score}, 100`,
                    }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className={`text-3xl font-bold ${getScoreColor(analysis.overall_score)}`}
                    >
                      {analysis.overall_score}
                    </div>
                    <div className="text-sm text-gray-600">out of 100</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-2">
              <Badge
                variant="secondary"
                className={`${getScoreColor(analysis.overall_score)} text-lg px-4 py-1`}
              >
                {getScoreLabel(analysis.overall_score)}
              </Badge>

              {analysis.analysis_metadata && (
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mt-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {(
                      analysis.analysis_metadata.processing_time / 1000
                    ).toFixed(1)}
                    s
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {analysis.analysis_metadata.word_count} words
                  </div>
                  <div className="flex items-center gap-1">
                    <Brain className="h-3 w-3" />
                    <Badge
                      variant="outline"
                      className={getConfidenceColor(
                        analysis.analysis_metadata.confidence_level
                      )}
                    >
                      {analysis.analysis_metadata.confidence_level} confidence
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.weight}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold ${getScoreColor(category.score)}`}
                    >
                      {category.score}
                    </span>
                    {getScoreIcon(category.score)}
                  </div>
                </div>

                <Progress value={category.score} className="h-2" />

                <p className="text-sm text-gray-600">{category.description}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
