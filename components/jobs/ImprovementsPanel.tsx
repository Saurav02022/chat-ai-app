'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  CheckCircle,
  Target,
  Flame,
  Copy,
  Check,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface ImprovementsPanelProps {
  improvements: string[];
  missingKeywords?: string[];
  className?: string;
}

export function ImprovementsPanel({
  improvements,
  missingKeywords = [],
  className,
}: ImprovementsPanelProps) {
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set());
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const toggleComplete = (index: number) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedItems(newCompleted);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast({
        title: '✓ Copied',
        description: 'Improvement copied to clipboard',
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Unable to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const getPriority = (index: number) => {
    if (index < 2) {
      return {
        icon: Flame,
        label: 'Critical',
        color: 'red',
        bgColor: 'bg-red-50',
        borderColor: 'border-l-red-500',
        badgeClass: 'bg-red-100 text-red-700 border-red-300',
        iconColor: 'text-red-600',
      };
    }
    if (index < 4) {
      return {
        icon: AlertCircle,
        label: 'Important',
        color: 'orange',
        bgColor: 'bg-orange-50',
        borderColor: 'border-l-orange-500',
        badgeClass: 'bg-orange-100 text-orange-700 border-orange-300',
        iconColor: 'text-orange-600',
      };
    }
    return {
      icon: Target,
      label: 'Recommended',
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-l-yellow-500',
      badgeClass: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      iconColor: 'text-yellow-600',
    };
  };

  if (!improvements || improvements.length === 0) {
    return (
      <Card className={`${className} shadow-md`}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-lg font-semibold text-green-900">Excellent!</p>
            <p className="text-base text-gray-600 mt-2 leading-relaxed">
              No critical improvements needed right now.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const completedCount = completedItems.size;
  const totalCount = improvements.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <Card className={`${className} shadow-md`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            Action Items
          </CardTitle>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">
              {completedCount} / {totalCount} done
            </span>
            <div className="w-20 h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {improvements.map((improvement, index) => {
            const priority = getPriority(index);
            const PriorityIcon = priority.icon;
            const isCompleted = completedItems.has(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`group relative border-l-4 ${priority.borderColor} ${
                  isCompleted ? 'opacity-50' : ''
                } transition-opacity`}
              >
                <div
                  className={`p-4 rounded-r-lg border border-l-0 ${priority.bgColor} hover:shadow-md transition-shadow shadow-sm`}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-2">
                    <button
                      onClick={() => toggleComplete(index)}
                      className="mt-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          isCompleted
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {isCompleted && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </div>
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <PriorityIcon
                          className={`h-5 w-5 ${priority.iconColor}`}
                        />
                        <Badge
                          variant="outline"
                          className={`text-xs font-semibold ${priority.badgeClass}`}
                        >
                          {priority.label}
                        </Badge>
                        {index < 3 && (
                          <span className="text-xs text-gray-600 font-medium">
                            #{index + 1} priority
                          </span>
                        )}
                      </div>

                      <p
                        className={`text-base leading-relaxed ${
                          isCompleted
                            ? 'line-through text-gray-500'
                            : 'text-gray-900 font-medium'
                        }`}
                      >
                        {improvement}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(improvement, index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    >
                      {copiedIndex === index ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Copy className="h-5 w-5 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Missing Keywords */}
        {missingKeywords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="text-lg font-semibold text-blue-900">
                Missing Keywords ({missingKeywords.length})
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {missingKeywords.slice(0, 10).map((keyword, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Badge
                    variant="outline"
                    className="bg-white hover:bg-blue-50 border-blue-300 text-blue-800 cursor-default font-medium shadow-sm"
                  >
                    {keyword}
                  </Badge>
                </motion.div>
              ))}
              {missingKeywords.length > 10 && (
                <Badge
                  variant="outline"
                  className="bg-white border-blue-300 text-blue-700 font-semibold shadow-sm"
                >
                  +{missingKeywords.length - 10} more
                </Badge>
              )}
            </div>

            <p className="text-sm text-blue-700 mt-4 flex items-center gap-2 leading-relaxed">
              <ChevronRight className="h-4 w-4" />
              Add these naturally to your resume to improve ATS matching
            </p>
          </motion.div>
        )}

        {/* Pro Tip */}
        {improvements.length > 0 && completedCount < totalCount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-sm"
          >
            <div className="flex items-start gap-3">
              <Flame className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-purple-900 text-base mb-2">
                  Quick Win
                </p>
                <p className="text-sm text-purple-700 leading-relaxed">
                  Start with the <strong>Critical</strong> items first. Fixing
                  just the top 2-3 can boost your score by 10-15 points.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Completion Celebration */}
        <AnimatePresence>
          {completedCount === totalCount && totalCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-lg font-semibold text-green-900 mb-2">
                All done!
              </p>
              <p className="text-sm text-green-700 leading-relaxed">
                Great work! Update your resume and run analysis again to see
                improvements.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
