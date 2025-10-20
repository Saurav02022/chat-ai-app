'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Users,
  Target,
  Star,
  TrendingUp,
  Lightbulb,
  Award,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CompanyInsightsProps {
  insights: {
    company_values: string[];
    cultural_fit_tips: string[];
    success_factors: string[];
    competitive_advantages: string[];
  };
  companyName?: string;
  className?: string;
}

export function CompanyInsights({
  insights,
  companyName,
  className,
}: CompanyInsightsProps) {
  const sections = [
    {
      title: 'Company Values',
      items: insights.company_values,
      icon: Building2,
      color: 'blue',
      description: 'What this company prioritizes',
    },
    {
      title: 'Cultural Fit Tips',
      items: insights.cultural_fit_tips,
      icon: Users,
      color: 'green',
      description: 'How to align with their culture',
    },
    {
      title: 'Success Factors',
      items: insights.success_factors,
      icon: Target,
      color: 'purple',
      description: 'What makes someone successful here',
    },
    {
      title: 'Competitive Advantages',
      items: insights.competitive_advantages,
      icon: Award,
      color: 'orange',
      description: 'How to stand out from other candidates',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-800',
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        badge: 'bg-green-100 text-green-800',
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'text-purple-600',
        badge: 'bg-purple-100 text-purple-800',
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: 'text-orange-600',
        badge: 'bg-orange-100 text-orange-800',
      },
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const hasAnyInsights = sections.some((section) => section.items.length > 0);

  if (!hasAnyInsights) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Company Insights
            {companyName && (
              <Badge variant="outline" className="ml-auto">
                {companyName}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No company insights available yet.</p>
            <p className="text-sm mt-1">
              Add a job description to get personalized company insights.
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
          <Building2 className="h-5 w-5 text-blue-600" />
          Company Insights
          {companyName && (
            <Badge variant="outline" className="ml-auto">
              {companyName}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section, sectionIndex) => {
            if (section.items.length === 0) return null;

            const colorClasses = getColorClasses(section.color);
            const Icon = section.icon;

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
                className={`p-4 rounded-lg border ${colorClasses.bg} ${colorClasses.border}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`h-5 w-5 ${colorClasses.icon}`} />
                  <h3 className="font-semibold text-gray-900">
                    {section.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {section.description}
                </p>

                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: sectionIndex * 0.1 + itemIndex * 0.05,
                      }}
                      className="flex items-start gap-2"
                    >
                      <Star
                        className={`h-3 w-3 mt-1 flex-shrink-0 ${colorClasses.icon}`}
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-900">
              Tailoring Strategy
            </span>
          </div>
          <p className="text-sm text-blue-800">
            Use these insights to customize your resume and cover letter.
            Highlight experiences that align with their values and demonstrate
            the success factors they&apos;re looking for.
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
