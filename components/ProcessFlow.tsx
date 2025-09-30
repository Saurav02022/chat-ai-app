'use client';

import {
  Upload,
  Target,
  Download,
  Send,
  Zap,
  MessageSquare,
  Trophy,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';

const steps = [
  {
    number: 1,
    title: 'Upload Resume + Job Description',
    icon: Upload,
    description:
      "Upload your current resume and paste the job description you're targeting.",
  },
  {
    number: 2,
    title: 'Get ATS Score + Improvement Suggestions',
    icon: Target,
    description:
      'Get instant ATS compatibility score with detailed improvement recommendations.',
  },
  {
    number: 3,
    title: 'Download Optimized Resume (Overleaf Template)',
    icon: Download,
    description:
      'Download your optimized resume with professional LaTeX templates.',
  },
  {
    number: 4,
    title: 'Apply for Job + Track Status',
    icon: Send,
    description:
      'Apply to jobs and track your application status in our centralized dashboard.',
  },
  {
    number: 5,
    title: 'Use Live Interview Assistant',
    icon: Zap,
    description:
      'Get real-time, invisible assistance during your actual interviews.',
  },
  {
    number: 6,
    title: 'Review Transcript + Get AI Insights',
    icon: MessageSquare,
    description:
      'Analyze your interview performance with AI-powered insights and feedback.',
  },
];

export function ProcessFlow() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Simple Process
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Your Path to Job Success
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Follow our proven 6-step process to land your dream job with
            AI-powered assistance
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="relative p-6 bg-white border-2 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg z-10">
                    <span className="text-white font-bold text-lg">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4 mt-2">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <step.icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-lg leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Final Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card className="inline-block p-6 md:p-8 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-2 border-green-200 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-green-800 mb-1">
                    Job Offer! 🎉
                  </h3>
                  <p className="text-green-700 text-lg">
                    Land your dream job with confidence
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
