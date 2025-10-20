'use client';

import { useAuthStore } from '@/lib/stores/authStore';
import { DashboardHeader, DashboardFooter } from '@/components/dashboard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration at the top level
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // During SSR and initial hydration, show a neutral layout
  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    );
  }

  // Authenticated layout - Dashboard Header/Footer for ALL pages
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <DashboardHeader />
        <main className="flex-1">{children}</main>
        <DashboardFooter />
      </div>
    );
  }

  // Public layout - Marketing Header/Footer
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
