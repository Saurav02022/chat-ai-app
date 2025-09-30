'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PUBLIC_ROUTES } from '@/lib/routes';
import { LoginModal } from '@/components/LoginModal';

export function HeroSection() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20" />

      <div className="container relative">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Main Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-4xl"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Land Your Dream Job with AI Power
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              JobCraft AI is your ultimate interview coaching platform, helping
              you optimize your resume, practice interviews, and land your dream
              job with confidence.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="text-lg px-8 py-6"
                onClick={() => setLoginModalOpen(true)}
              >
                Start Free Trial
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                asChild
              >
                <Link href={PUBLIC_ROUTES.DEMO}>Watch Demo</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Success Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <Badge variant="secondary" className="text-sm font-medium">
                    95% ATS Pass Rate
                  </Badge>
                </div>

                <Separator
                  orientation="vertical"
                  className="hidden sm:block h-6"
                />
                <Separator className="w-16 sm:hidden" />

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <Badge variant="secondary" className="text-sm font-medium">
                    Real-time Interview Help
                  </Badge>
                </div>

                <Separator
                  orientation="vertical"
                  className="hidden sm:block h-6"
                />
                <Separator className="w-16 sm:hidden" />

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <Badge variant="secondary" className="text-sm font-medium">
                    AI-Powered Coaching
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </section>
  );
}
