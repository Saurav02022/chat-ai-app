'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAuthStore } from '@/lib/stores/authStore';
import { useJobStore } from '@/lib/stores/jobStore';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from '@/lib/routes';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Video,
  Settings,
  LogOut,
  Menu,
  Bell,
} from 'lucide-react';

const navigationItems = [
  {
    name: 'Dashboard',
    href: PROTECTED_ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    name: 'Jobs',
    href: PROTECTED_ROUTES.JOBS,
    icon: Briefcase,
  },
  {
    name: 'Resume',
    href: '/resume',
    icon: FileText,
  },
  {
    name: 'Interviews',
    href: '/interviews',
    icon: Video,
  },
  {
    name: 'Settings',
    href: PROTECTED_ROUTES.SETTINGS,
    icon: Settings,
  },
];

export function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { jobs } = useJobStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    logout();
    router.push(PUBLIC_ROUTES.HOME);
  };

  const activeJobs = jobs.filter((job) =>
    ['applied', 'reviewing', 'phone-screen', 'interview', 'waiting'].includes(
      job.status
    )
  ).length;

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href === PROTECTED_ROUTES.JOBS && pathname.startsWith('/jobs'));

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            } ${mobile ? 'w-full' : ''}`}
            onClick={() => mobile && setIsMobileMenuOpen(false)}
          >
            <Icon className="h-4 w-4" />
            <span>{item.name}</span>
            {item.name === 'Jobs' && activeJobs > 0 && (
              <Badge variant="default" className="ml-auto text-xs">
                {activeJobs}
              </Badge>
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6">
          <Link
            href={PROTECTED_ROUTES.DASHBOARD}
            className="flex items-center gap-2"
          >
            <span className="font-bold">
              JobCraft <Badge variant="secondary">AI</Badge>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavItems />
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications - Coming Soon */}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Bell className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm font-medium">Coming Soon</p>
                <p className="text-xs text-muted-foreground">
                  Notifications feature in development
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.avatar || ''}
                    alt={user?.name || ''}
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={PROTECTED_ROUTES.DASHBOARD}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={PROTECTED_ROUTES.SETTINGS}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4">
                {/* User Info */}
                <div className="flex items-center gap-3 pb-4 border-b">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user?.avatar || ''}
                      alt={user?.name || ''}
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-2">
                  <NavItems mobile />
                </nav>

                {/* Sign Out */}
                <div className="pt-4 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
