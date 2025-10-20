'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  ArrowRight,
  Copy,
  CheckCircle,
  Lightbulb,
  Target,
  Zap,
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
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [copiedItems, setCopiedItems] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(new Set([...copiedItems, index]));
      toast({
        title: 'Copied!',
        description: 'Improvement suggestion copied to clipboard',
      });

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      toast({
        title: 'Copy failed',
        description: 'Unable to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const getPriorityIcon = (index: number) => {
    if (index === 0) return <AlertTriangle className="h-5 w-5 text-red-600" />;
    if (index === 1) return <Target className="h-5 w-5 text-orange-600" />;
    return <Lightbulb className="h-5 w-5 text-yellow-600" />;
  };

  const getPriorityBadge = (index: number) => {
    if (index === 0)
      return { text: 'High Priority', className: 'bg-red-100 text-red-800' };
    if (index === 1)
      return {
        text: 'Medium Priority',
        className: 'bg-orange-100 text-orange-800',
      };
    return { text: 'Low Priority', className: 'bg-yellow-100 text-yellow-800' };
  };

  const getPriorityBorder = (index: number) => {
    if (index === 0) return 'border-red-200 bg-red-50';
    if (index === 1) return 'border-orange-200 bg-orange-50';
    return 'border-yellow-200 bg-yellow-50';
  };

  if (!improvements || improvements.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Improvement Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <p className="font-medium">Great job!</p>
            <p className="text-sm mt-1">
              No major improvements needed at this time.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          Improvement Opportunities
          <Badge variant="secondary" className="ml-auto">
            {improvements.length} suggestions
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {improvements.map((improvement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-4 rounded-lg border hover:shadow-sm transition-all ${getPriorityBorder(index)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getPriorityIcon(index)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge
                      variant="secondary"
                      className={getPriorityBadge(index).className}
                    >
                      {getPriorityBadge(index).text}
                    </Badge>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(improvement, index)}
                        className="h-8 w-8 p-0"
                      >
                        {copiedItems.has(index) ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(index)}
                        className="h-8 w-8 p-0"
                      >
                        <ArrowRight
                          className={`h-4 w-4 transition-transform ${
                            expandedItems.has(index) ? 'rotate-90' : ''
                          }`}
                        />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {improvement.length > 150 && !expandedItems.has(index)
                      ? `${improvement.substring(0, 150)}...`
                      : improvement}
                  </p>

                  <AnimatePresence>
                    {expandedItems.has(index) && improvement.length > 150 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 pt-2 border-t border-gray-200"
                      >
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Zap className="h-3 w-3" />
                          <span>
                            Implementation tip: Focus on specific examples and
                            quantified results
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Missing Keywords Section */}
        {missingKeywords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">
                Missing Keywords
              </span>
              <Badge variant="outline" className="text-xs">
                {missingKeywords.length} keywords
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {missingKeywords.slice(0, 8).map((keyword, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-white border-blue-300 text-blue-800"
                >
                  {keyword}
                </Badge>
              ))}
              {missingKeywords.length > 8 && (
                <Badge
                  variant="outline"
                  className="bg-white border-blue-300 text-blue-800"
                >
                  +{missingKeywords.length - 8} more
                </Badge>
              )}
            </div>

            <p className="text-sm text-blue-800">
              Consider incorporating these keywords naturally into your resume
              to improve ATS matching.
            </p>
          </motion.div>
        )}

        {improvements.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-gray-600" />
              <span className="font-medium text-gray-900">Pro Tip</span>
            </div>
            <p className="text-sm text-gray-700">
              Focus on high-priority improvements first. Each change can
              significantly boost your ATS score and improve your chances of
              getting noticed by recruiters.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
