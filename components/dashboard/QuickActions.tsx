'use client';

import { Plus, FileText, Calendar, BarChart3 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PROTECTED_ROUTES } from '@/lib/routes';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  buttonText: string;
  variant?: 'default' | 'outline';
}

function QuickActionCard({
  title,
  description,
  icon: Icon,
  onClick,
  buttonText,
  variant = 'default',
}: QuickActionCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button onClick={onClick} variant={variant} className="w-full">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}

export function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: 'Add New Job',
      description: 'Track a new job application',
      icon: Plus,
      buttonText: 'Add Job',
      onClick: () => router.push(PROTECTED_ROUTES.JOBS + '?action=create'),
      variant: 'default' as const,
    },
    {
      title: 'Upload Resume',
      description: 'Add or update your resume',
      icon: FileText,
      buttonText: 'Upload Resume',
      onClick: () => router.push('/resume'), // TODO: Add to PROTECTED_ROUTES
      variant: 'outline' as const,
    },
    {
      title: 'Schedule Interview',
      description: 'Prepare for upcoming interviews',
      icon: Calendar,
      buttonText: 'Schedule',
      onClick: () => router.push('/interviews'), // TODO: Add to PROTECTED_ROUTES
      variant: 'outline' as const,
    },
    {
      title: 'View Analytics',
      description: 'Track your job search progress',
      icon: BarChart3,
      buttonText: 'View Analytics',
      onClick: () => router.push(PROTECTED_ROUTES.JOBS + '?tab=analytics'),
      variant: 'outline' as const,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <QuickActionCard key={action.title} {...action} />
        ))}
      </div>
    </div>
  );
}
