'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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
  const [showDetails, setShowDetails] = useState(false);

  const getRecommendation = (score: number) => {
    if (score >= 75) {
      return {
        icon: CheckCircle2,
        title: 'Strong Match',
        action: 'Apply Now',
        description:
          "Your resume aligns well with this job. You're a competitive candidate.",
        color: 'green',
        bgGradient: 'bg-green-50',
        borderColor: 'border-l-green-500',
        textColor: 'text-green-900',
        badgeBg: 'bg-green-100',
        badgeText: 'text-green-700',
        iconColor: 'text-green-600',
      };
    }
    if (score >= 60) {
      return {
        icon: AlertCircle,
        title: 'Good Match',
        action: 'Consider Small Improvements',
        description:
          'Solid foundation, but a few tweaks could boost your chances significantly.',
        color: 'yellow',
        bgGradient: 'bg-yellow-50',
        borderColor: 'border-l-yellow-500',
        textColor: 'text-yellow-900',
        badgeBg: 'bg-yellow-100',
        badgeText: 'text-yellow-700',
        iconColor: 'text-yellow-600',
      };
    }
    return {
      icon: XCircle,
      title: 'Needs Work',
      action: 'Fix Key Issues First',
      description:
        'Significant improvements needed before applying to maximize your chances.',
      color: 'red',
      bgGradient: 'bg-red-50',
      borderColor: 'border-l-red-500',
      textColor: 'text-red-900',
      badgeBg: 'bg-red-100',
      badgeText: 'text-red-700',
      iconColor: 'text-red-600',
    };
  };

  const recommendation = getRecommendation(analysis.overall_score);
  const RecommendationIcon = recommendation.icon;

  const scores = [
    {
      label: 'Keywords',
      value: analysis.keyword_match,
      icon: '🎯',
      weight: 30,
      tip: 'Match job requirements',
    },
    {
      label: 'Content',
      value: analysis.content_quality,
      icon: '✍️',
      weight: 25,
      tip: 'Quality & impact',
    },
    {
      label: 'Format',
      value: analysis.format_score,
      icon: '📄',
      weight: 20,
      tip: 'ATS-friendly',
    },
    {
      label: 'Experience',
      value: analysis.experience_match,
      icon: '💼',
      weight: 15,
      tip: 'Relevant roles',
    },
    {
      label: 'Skills',
      value: analysis.skills_alignment,
      icon: '⚡',
      weight: 10,
      tip: 'Tech & soft skills',
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Decision Hero Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <Card
          className={`border-l-4 ${recommendation.borderColor} ${recommendation.bgGradient} shadow-md`}
        >
          <CardContent className="pt-6 pb-8">
            <div className="flex items-start gap-6">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className={`p-3 rounded-xl ${recommendation.badgeBg} shadow-sm`}
              >
                <RecommendationIcon
                  className={`h-8 w-8 ${recommendation.iconColor}`}
                />
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className={`text-2xl font-bold ${recommendation.textColor}`}
                      >
                        {recommendation.title}
                      </h3>
                      <Badge
                        className={`${recommendation.badgeBg} ${recommendation.badgeText} border-0 text-sm font-semibold`}
                      >
                        {recommendation.action}
                      </Badge>
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {recommendation.description}
                    </p>
                  </div>

                  {/* Score Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
                    className="flex flex-col items-center gap-2 ml-6"
                  >
                    <div className="relative">
                      <div
                        className={`text-6xl font-bold ${getScoreTextColor(analysis.overall_score)}`}
                      >
                        {analysis.overall_score}
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-500">
                      / 100
                    </span>
                  </motion.div>
                </div>

                {/* Meta Info */}
                {analysis.analysis_metadata && (
                  <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Confidence:</span>
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold capitalize ${
                          analysis.analysis_metadata.confidence_level === 'high'
                            ? 'border-green-500 text-green-700 bg-green-50'
                            : analysis.analysis_metadata.confidence_level ===
                                'medium'
                              ? 'border-yellow-500 text-yellow-700 bg-yellow-50'
                              : 'border-red-500 text-red-700 bg-red-50'
                        }`}
                      >
                        {analysis.analysis_metadata.confidence_level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Analyzed in:</span>
                      <span className="text-gray-900 font-medium">
                        {(
                          analysis.analysis_metadata.processing_time / 1000
                        ).toFixed(1)}
                        s
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Words:</span>
                      <span className="text-gray-900 font-medium">
                        {analysis.analysis_metadata.word_count}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Score Breakdown - Compact & Expandable */}
      <Card className="shadow-md">
        <CardContent className="pt-6 pb-6">
          {/* Collapsible Header */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between mb-6 hover:bg-gray-50 -mx-3 px-3 py-3 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Score Breakdown
              </h3>
              <span className="text-sm text-gray-500">(Click for details)</span>
            </div>
            {showDetails ? (
              <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            )}
          </button>

          {/* Compact Score Bars */}
          <div className="space-y-4">
            {scores.map((score, index) => (
              <motion.div
                key={score.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{score.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-base font-semibold text-gray-900 truncate">
                          {score.label}
                        </span>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          ({score.weight}% weight)
                        </span>
                      </div>
                      <span
                        className={`text-base font-bold ml-3 ${getScoreTextColor(score.value)}`}
                      >
                        {score.value}
                      </span>
                    </div>
                    <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score.value}%` }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.1,
                          ease: 'easeOut',
                        }}
                        className={`h-full ${getScoreColor(score.value)} rounded-full shadow-sm`}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {score.tip}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed Explanations - Expandable */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    What These Scores Mean
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
                      <p className="font-semibold text-blue-900 mb-2">
                        🎯 Keyword Match ({analysis.keyword_match}/100)
                      </p>
                      <p className="text-blue-700 text-sm leading-relaxed">
                        {
                          "How well your resume matches the job's required keywords, skills, and technical terms. Higher score means better ATS parsing."
                        }
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 shadow-sm">
                      <p className="font-semibold text-purple-900 mb-2">
                        ✍️ Content Quality ({analysis.content_quality}/100)
                      </p>
                      <p className="text-purple-700 text-sm leading-relaxed">
                        Quality of your achievements, use of action verbs,
                        quantified metrics, and impact statements that
                        demonstrate value.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200 shadow-sm">
                      <p className="font-semibold text-green-900 mb-2">
                        📄 Format ({analysis.format_score}/100)
                      </p>
                      <p className="text-green-700 text-sm leading-relaxed">
                        How ATS-friendly your resume structure is. Clean
                        formatting, proper sections, and consistent styling
                        improve parsing.
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 shadow-sm">
                      <p className="font-semibold text-orange-900 mb-2">
                        💼 Experience ({analysis.experience_match}/100)
                      </p>
                      <p className="text-orange-700 text-sm leading-relaxed">
                        How relevant your work history is to this role.
                        Considers job titles, responsibilities, and industry
                        alignment.
                      </p>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg border border-pink-200 shadow-sm">
                      <p className="font-semibold text-pink-900 mb-2">
                        ⚡ Skills ({analysis.skills_alignment}/100)
                      </p>
                      <p className="text-pink-700 text-sm leading-relaxed">
                        Match between your listed skills (technical and soft)
                        and the job requirements. Both hard and soft skills
                        matter.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
