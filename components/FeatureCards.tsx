'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FileText, Zap, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from '@/lib/routes';
import { LoginModal } from '@/components/LoginModal';

const features = [
  {
    icon: FileText,
    title: 'Resume Optimizer',
    description: 'Get your resume ATS-ready with AI-powered optimization',
    features: [
      'ATS scoring',
      'Keyword matching',
      'Job description analysis',
      'Improvement tips',
    ],
    ctaText: 'Try Free',
    ctaVariant: 'default' as const,
    href: PROTECTED_ROUTES.JOBS,
  },
  {
    icon: Zap,
    title: 'Live Interview Assistant',
    description: 'Real-time, invisible help during your actual interviews',
    features: [
      'Real-time help',
      'Invisible overlay',
      'Smart responses',
      'Full transcript',
    ],
    ctaText: 'See Demo',
    ctaVariant: 'secondary' as const,
    href: PUBLIC_ROUTES.DEMO,
  },
  {
    icon: FileCheck,
    title: 'Smart Templates',
    description: 'Professional resume templates optimized for ATS systems',
    features: [
      'Overleaf PDF',
      'LaTeX source',
      'ATS-optimized',
      'Industry-specific',
    ],
    ctaText: 'View Templates',
    ctaVariant: 'outline' as const,
    href: PROTECTED_ROUTES.JOBS,
  },
];

export function FeatureCards() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Comprehensive AI-powered tools designed to give you the competitive
            edge in today&apos;s job market
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="relative overflow-hidden border-2 hover:border-blue-200 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm h-full">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <ul className="space-y-2">
                      {feature.features.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={feature.ctaVariant}
                        className="w-full"
                        onClick={() => setLoginModalOpen(true)}
                      >
                        {feature.ctaText}
                      </Button>
                    </motion.div>
                  </CardFooter>

                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full" />
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="inline-block p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Ready to get started?
                </h3>
                <p className="text-muted-foreground">
                  Join thousands of successful job seekers using JobCraft AI
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" onClick={() => setLoginModalOpen(true)}>
                  Start Your Free Trial
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>

      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </section>
  );
}
