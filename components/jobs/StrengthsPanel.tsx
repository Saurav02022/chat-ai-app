'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface StrengthsPanelProps {
  strengths: string[];
  className?: string;
}

export function StrengthsPanel({ strengths, className }: StrengthsPanelProps) {
  const getStrengthIcon = (index: number) => {
    const icons = [Star, Award, TrendingUp, CheckCircle, CheckCircle];
    const Icon = icons[index] || CheckCircle;
    return <Icon className="h-5 w-5 text-green-600" />;
  };

  const getStrengthBadge = (index: number) => {
    if (index === 0)
      return { text: 'Top Strength', className: 'bg-green-100 text-green-800' };
    if (index === 1)
      return { text: 'Strong', className: 'bg-blue-100 text-blue-800' };
    return { text: 'Good', className: 'bg-gray-100 text-gray-800' };
  };

  if (!strengths || strengths.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Resume Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No strengths identified yet.</p>
            <p className="text-sm mt-1">
              Upload a resume and run analysis to see your strengths.
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
          <CheckCircle className="h-5 w-5 text-green-600" />
          Resume Strengths
          <Badge variant="secondary" className="ml-auto">
            {strengths.length} identified
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                {getStrengthIcon(index)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className={getStrengthBadge(index).className}
                  >
                    {getStrengthBadge(index).text}
                  </Badge>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {strength}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {strengths.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Keep It Up!</span>
            </div>
            <p className="text-sm text-blue-800">
              These strengths make your resume stand out. Make sure to highlight
              them prominently and provide specific examples when possible.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
