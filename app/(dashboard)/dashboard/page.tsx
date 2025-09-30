'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AuthGuard } from '@/components/AuthGuard';
import { PUBLIC_ROUTES, DASHBOARD_ROUTES } from '@/lib/routes';

function DashboardContent() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: PUBLIC_ROUTES.HOME });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={session?.user?.image || ''}
                alt={session?.user?.name || ''}
              />
              <AvatarFallback>
                {session?.user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {session?.user?.name || 'User'}! 👋
              </h1>
              <p className="text-muted-foreground">
                Ready to land your dream job?
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        {/* Demo Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DASHBOARD_ROUTES.map((route) => (
            <Card key={route.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {route.icon} {route.name}
                  <Badge variant="secondary">Coming Soon</Badge>
                </CardTitle>
                <CardDescription>{route.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button disabled className="w-full">
                  Open {route.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Status Info */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className="bg-blue-100 text-blue-800 border-blue-300"
              >
                UI Development Mode
              </Badge>
            </div>
            <p className="text-sm text-blue-700">
              This is a UI-only version of JobCraft AI. All features are
              currently in development and will be connected to Supabase backend
              in the next phase.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
