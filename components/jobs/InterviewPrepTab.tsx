'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Headphones,
  FileText,
  Sparkles,
  Upload,
  CheckCircle,
  Brain,
  Eye,
  Zap,
  Shield,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import type { Job } from '@/types/job';

interface InterviewPrepTabProps {
  job: Job;
}

interface PrepDocument {
  id: string;
  name: string;
  size: number;
  type: string;
}

export function InterviewPrepTab({ job }: InterviewPrepTabProps) {
  const [documents, setDocuments] = useState<PrepDocument[]>([]);
  const { toast } = useToast();

  const handleStartInterview = () => {
    // TODO: Open overlay for real-time interview assistant
    toast({
      title: 'Interview Assistant Starting',
      description: 'The real-time overlay will launch in your next build phase',
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newDocs: PrepDocument[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setDocuments([...documents, ...newDocs]);
    toast({
      title: 'Documents uploaded',
      description: `${newDocs.length} document(s) added to your prep materials`,
    });
  };

  const handleRemoveDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      {/* Hero Section - Following design system gradient pattern */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Icon - Design system shadow-lg */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
                  <Headphones className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="flex-1">
                {/* Heading - Design system heading-md (32px) */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                  Real-Time Interview Assistant
                </h2>

                {/* Body text - Design system body-md (16px) with proper line-height */}
                <p className="text-base text-gray-700 leading-relaxed mb-4">
                  Get instant, AI-powered answers during your live interview
                  with <strong>{job.company}</strong>. Our intelligent overlay
                  analyzes questions in real-time and provides contextual
                  responses based on your resume, job description, and prep
                  materials.
                </p>

                {/* Feature badges - Design system spacing-2 (8px) */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 border-green-200"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Screen Overlay
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 border-blue-200"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Real-Time Answers
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 border-purple-200"
                  >
                    <Brain className="h-3 w-3 mr-1" />
                    Context-Aware
                  </Badge>
                </div>

                {/* CTA Button - Design system size lg (48px) */}
                <Button
                  size="lg"
                  onClick={handleStartInterview}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Launch Interview Assistant
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* How It Works - Design system spacing-6 (24px) between sections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">How It Works</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Your personal AI co-pilot for interview success
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Design system space-y-4 (16px) between elements */}
          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Upload Your Prep Materials',
                description:
                  'Add documents with talking points, company research, or technical notes',
                color: 'blue',
              },
              {
                step: '2',
                title: 'Launch the Overlay',
                description:
                  'Click "Launch Interview Assistant" to activate the screen overlay',
                color: 'purple',
              },
              {
                step: '3',
                title: 'Join Your Interview',
                description:
                  'Start your real interview (Zoom, Teams, Google Meet, etc.)',
                color: 'green',
              },
              {
                step: '4',
                title: 'Get Real-Time Answers',
                description:
                  'AI listens to questions and displays answers instantly—no clicking needed',
                color: 'orange',
              },
            ].map((item, index) => {
              const colorClasses = {
                blue: 'bg-blue-100 text-blue-700',
                purple: 'bg-purple-100 text-purple-700',
                green: 'bg-green-100 text-green-700',
                orange: 'bg-orange-100 text-orange-700',
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  {/* Step number - Design system rounded-full */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full ${colorClasses[item.color as keyof typeof colorClasses]} flex items-center justify-center font-semibold text-sm`}
                  >
                    {item.step}
                  </div>
                  <div className="flex-1">
                    {/* Design system body-md font-medium */}
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">
                      {item.title}
                    </h4>
                    {/* Design system body-sm (14px) */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Document Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <FileText className="h-5 w-5 text-blue-600" />
            Prep Documents
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Upload documents to give the AI additional context (optional but
            recommended)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Design system space-y-4 (16px) */}
          <div className="space-y-4">
            {/* Upload Button */}
            <div>
              <Label htmlFor="doc-upload" className="sr-only">
                Upload documents
              </Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="default"
                  className="relative"
                  onClick={() => document.getElementById('doc-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
                <Input
                  id="doc-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="text-sm text-gray-500">
                  PDF, DOC, DOCX, TXT (max 10MB each)
                </span>
              </div>
            </div>

            {/* Uploaded Documents List */}
            <AnimatePresence>
              {documents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  {documents.map((doc) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <FileText className="h-4 w-4 text-gray-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(doc.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDocument(doc.id)}
                        className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {documents.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  No documents uploaded yet
                </p>
                <p className="text-xs text-gray-500">
                  Add talking points, research notes, or technical documentation
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* What Gets Used - Context Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-blue-900">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Context for This Interview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Design system space-y-3 (12px) */}
          <div className="space-y-3 text-sm text-blue-900">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
              <div>
                <p className="font-medium">Your Resume</p>
                <p className="text-xs text-blue-700">
                  {job.resumeFileId
                    ? 'Resume uploaded and analyzed'
                    : 'No resume uploaded yet - go to Resume tab'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
              <div>
                <p className="font-medium">Job Description</p>
                <p className="text-xs text-blue-700">
                  {job.role} at {job.company}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
              <div>
                <p className="font-medium">Prep Documents</p>
                <p className="text-xs text-blue-700">
                  {documents.length > 0
                    ? `${documents.length} document(s) uploaded`
                    : 'No documents uploaded yet'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security Notice */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">
                Privacy & Security
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                The overlay is only visible to you. Audio processing happens
                locally on your device. Your interview data is never recorded or
                stored. We only analyze questions in real-time to generate
                helpful responses.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
