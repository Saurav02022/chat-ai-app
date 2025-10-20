'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Copy,
  Download,
  CheckCircle,
  ArrowRight,
  Target,
  FileText,
  Palette,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import type { ATSAnalysisResult, CompanyInsights } from '@/types/job';

interface DetailedSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: ATSAnalysisResult;
  companyInsights?: CompanyInsights;
  jobTitle: string;
  companyName: string;
}

export function DetailedSuggestionsModal({
  isOpen,
  onClose,
  analysis,
  companyInsights,
  jobTitle,
  companyName,
}: DetailedSuggestionsModalProps) {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(new Set([...copiedItems, id]));
      toast({
        title: 'Copied!',
        description: 'Suggestion copied to clipboard',
      });

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
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

  const downloadReport = () => {
    // For now, just show a toast. PDF generation would be implemented here
    toast({
      title: 'Download feature',
      description: 'PDF download functionality will be implemented soon.',
    });
  };

  const keywordAnalysis = {
    matched:
      analysis.missing_keywords.length > 0
        ? ['React', 'TypeScript', 'Node.js', 'AWS', 'Agile'] // Mock matched keywords
        : analysis.missing_keywords.slice(0, 5),
    missing: analysis.missing_keywords,
    suggestions: [
      'Incorporate missing keywords naturally into your experience descriptions',
      'Add a "Technical Skills" section if not present',
      'Use industry-standard terminology and acronyms',
      'Include relevant certifications and tools',
    ],
  };

  const contentImprovements = [
    {
      category: 'Quantify Achievements',
      priority: 'High',
      examples: [
        'Instead of: "Improved system performance"',
        'Write: "Improved system performance by 40%, reducing load times from 3s to 1.8s"',
      ],
      tips: 'Use specific numbers, percentages, and metrics wherever possible',
    },
    {
      category: 'Action Verbs',
      priority: 'Medium',
      examples: [
        'Replace: "Was responsible for" → "Led", "Managed", "Directed"',
        'Replace: "Helped with" → "Collaborated", "Contributed", "Supported"',
      ],
      tips: 'Start each bullet point with a strong action verb',
    },
    {
      category: 'Relevance',
      priority: 'High',
      examples: [
        'Prioritize experiences most relevant to the target role',
        'Remove or minimize outdated or irrelevant experiences',
      ],
      tips: 'Tailor your resume for each specific job application',
    },
  ];

  const formatOptimizations = [
    {
      issue: 'ATS Compatibility',
      solution:
        'Use standard section headings like "Experience", "Education", "Skills"',
      impact: 'High',
    },
    {
      issue: 'File Format',
      solution: 'Save as .docx or .pdf for best ATS compatibility',
      impact: 'Medium',
    },
    {
      issue: 'Font & Formatting',
      solution:
        'Use standard fonts (Arial, Calibri) and avoid complex formatting',
      impact: 'Medium',
    },
    {
      issue: 'Contact Information',
      solution: 'Include phone, email, LinkedIn, and location at the top',
      impact: 'High',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Detailed Resume Analysis
          </DialogTitle>
          <DialogDescription>
            Comprehensive suggestions for {jobTitle} at {companyName}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Overall Score: {analysis.overall_score}/100
            </Badge>
            <Badge
              variant="outline"
              className={`${
                analysis.analysis_metadata.confidence_level === 'high'
                  ? 'bg-green-100 text-green-800'
                  : analysis.analysis_metadata.confidence_level === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}
            >
              {analysis.analysis_metadata.confidence_level} confidence
            </Badge>
          </div>

          <Button
            variant="outline"
            onClick={downloadReport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        <Tabs defaultValue="keywords" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="keywords" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Keywords
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="format" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Format
            </TabsTrigger>
          </TabsList>

          <TabsContent value="keywords" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Keyword Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Missing Keywords */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Missing Keywords ({keywordAnalysis.missing.length})
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {keywordAnalysis.missing.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Suggestions */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                    Implementation Suggestions
                  </h4>
                  <div className="space-y-3">
                    {keywordAnalysis.suggestions.map((suggestion, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                      >
                        <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-blue-900">{suggestion}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(suggestion, `keyword-${index}`)
                          }
                          className="h-8 w-8 p-0"
                        >
                          {copiedItems.has(`keyword-${index}`) ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="space-y-4">
              {contentImprovements.map((improvement, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-purple-600" />
                        {improvement.category}
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          improvement.priority === 'High'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {improvement.priority} Priority
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">Examples:</h5>
                        <div className="space-y-2">
                          {improvement.examples.map((example, exIndex) => (
                            <div
                              key={exIndex}
                              className="p-3 bg-gray-50 border border-gray-200 rounded text-sm font-mono"
                            >
                              {example}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">
                          Implementation Tip:
                        </h5>
                        <p className="text-sm text-gray-700 bg-blue-50 border border-blue-200 rounded p-3">
                          {improvement.tips}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="format" className="space-y-6">
            <div className="space-y-4">
              {formatOptimizations.map((optimization, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Palette className="h-4 w-4 text-green-600" />
                          <h4 className="font-medium">{optimization.issue}</h4>
                          <Badge
                            variant="outline"
                            className={
                              optimization.impact === 'High'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {optimization.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700">
                          {optimization.solution}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            optimization.solution,
                            `format-${index}`
                          )
                        }
                        className="h-8 w-8 p-0 ml-2"
                      >
                        {copiedItems.has(`format-${index}`) ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Company Insights */}
        {companyInsights && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                {companyName}-Specific Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {companyInsights.cultural_fit_tips
                  .slice(0, 4)
                  .map((tip, index) => (
                    <div
                      key={index}
                      className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <p className="text-sm text-blue-900">{tip}</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
