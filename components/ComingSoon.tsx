'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Star, Calendar, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ComingSoonProps {
  title: string;
  description: string;
  backUrl?: string;
  backLabel?: string;
  features?: string[];
  developmentDay?: number;
  priority?: 'high' | 'medium' | 'low';
  category?: 'dashboard' | 'ai-features' | 'job-management' | 'analytics';
}

export function ComingSoon({
  title,
  description,
  backUrl = '/dashboard',
  backLabel = 'Back to Dashboard',
  features = [],
  developmentDay = 10,
  priority = 'medium',
  category = 'dashboard',
}: ComingSoonProps) {
  // Calculate progress based on current day (Day 1 completed)
  const currentDay = 1;
  const progressPercentage = Math.min((currentDay / developmentDay) * 100, 100);

  // Get category info
  const getCategoryInfo = () => {
    switch (category) {
      case 'job-management':
        return {
          icon: Users,
          color: 'from-blue-500 to-blue-600',
          label: 'Job Management',
        };
      case 'ai-features':
        return {
          icon: Zap,
          color: 'from-purple-500 to-purple-600',
          label: 'AI Features',
        };
      case 'analytics':
        return {
          icon: Calendar,
          color: 'from-green-500 to-green-600',
          label: 'Analytics',
        };
      default:
        return {
          icon: Clock,
          color: 'from-gray-500 to-gray-600',
          label: 'Dashboard',
        };
    }
  };

  const categoryInfo = getCategoryInfo();
  const CategoryIcon = categoryInfo.icon;

  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <Button variant="ghost" asChild>
            <Link href={backUrl} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
          </Button>
        </motion.div>

        {/* Main Card */}
        <Card className="border-2 shadow-xl bg-white/80 backdrop-blur-sm">
          <div className="p-8 md:p-12 text-center space-y-6">
            {/* Category & Priority Badges */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-3"
            >
              <Badge
                variant="outline"
                className={`${getPriorityColor()} border-0`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
              </Badge>
              <Badge variant="secondary">{categoryInfo.label}</Badge>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`mx-auto w-20 h-20 bg-gradient-to-br ${categoryInfo.color} rounded-2xl flex items-center justify-center shadow-lg`}
            >
              <CategoryIcon className="h-10 w-10 text-white" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-2"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {title}
              </h1>
              <p className="text-lg text-gray-600 max-w-lg mx-auto">
                {description}
              </p>
            </motion.div>

            {/* Development Progress */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Development Progress</span>
                <span>
                  Day {currentDay} of {developmentDay}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <Badge variant="secondary" className="text-sm px-4 py-2">
                🚀 Coming in Day {developmentDay}
              </Badge>
            </motion.div>

            {/* Features Preview */}
            {features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  What to expect:
                </h3>
                <div className="grid gap-3 text-left max-w-md mx-auto">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <Star className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button asChild size="lg" className="px-8">
                <Link href={backUrl}>{backLabel}</Link>
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
