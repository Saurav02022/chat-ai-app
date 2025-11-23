'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Award, Trophy, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface StrengthsPanelProps {
  strengths: string[];
  className?: string;
}

export function StrengthsPanel({ strengths, className }: StrengthsPanelProps) {
  const getStrengthStyle = (index: number) => {
    if (index === 0) {
      return {
        icon: Trophy,
        iconColor: 'text-yellow-600',
        bgGradient: 'bg-yellow-50',
        borderColor: 'border-yellow-300',
        badge: {
          text: 'Top Strength',
          class: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        },
      };
    }
    if (index === 1) {
      return {
        icon: Award,
        iconColor: 'text-green-600',
        bgGradient: 'bg-green-50',
        borderColor: 'border-green-300',
        badge: {
          text: 'Strong',
          class: 'bg-green-100 text-green-800 border-green-300',
        },
      };
    }
    return {
      icon: Star,
      iconColor: 'text-blue-600',
      bgGradient: 'bg-blue-50',
      borderColor: 'border-blue-300',
      badge: {
        text: 'Good',
        class: 'bg-blue-100 text-blue-800 border-blue-300',
      },
    };
  };

  if (!strengths || strengths.length === 0) {
    return (
      <Card className={`${className} shadow-md`}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Your Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-base text-gray-600 font-medium">
              No strengths identified yet.
            </p>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Run analysis to discover what makes your resume stand out.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className} shadow-md`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Your Strengths
          </CardTitle>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-300 font-semibold"
          >
            {strengths.length} found
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {strengths.map((strength, index) => {
            const style = getStrengthStyle(index);
            const StrengthIcon = style.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.08,
                  type: 'spring',
                }}
                className={`group p-4 rounded-lg border ${style.bgGradient} ${style.borderColor} hover:shadow-md transition-all shadow-sm`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon with animation */}
                  <motion.div
                    initial={{ rotate: -15 }}
                    animate={{ rotate: 0 }}
                    transition={{ delay: index * 0.08 + 0.2, type: 'spring' }}
                    className="flex-shrink-0"
                  >
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <StrengthIcon className={`h-6 w-6 ${style.iconColor}`} />
                    </div>
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    {/* Badge */}
                    <Badge
                      variant="outline"
                      className={`text-xs font-semibold mb-3 ${style.badge.class}`}
                    >
                      {style.badge.text}
                    </Badge>

                    {/* Strength text */}
                    <p className="text-base text-gray-900 leading-relaxed font-medium">
                      {strength}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Encouragement tip */}
        {strengths.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: strengths.length * 0.08 + 0.2 }}
            className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-sm"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-purple-900 text-base mb-2">
                  Highlight These!
                </p>
                <p className="text-sm text-purple-700 leading-relaxed">
                  {
                    "These are your competitive advantages. Make sure they're prominently featured in your resume summary and cover letter."
                  }
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
