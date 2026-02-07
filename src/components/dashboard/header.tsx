'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users,
  LogOut,
  User,
  PanelLeft
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '../logo';
import { navLinks } from './sidebar';

const pageTitles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/dashboard/tasks': 'Tasks',
    '/dashboard/ai-insights': 'AI Insights',
    '/dashboard/pitch-generator': 'Pitch Generator',
    '/dashboard/feedback': 'Feedback & Validation',
    '/dashboard/payments': 'Payments',
    '/dashboard/profile': 'Team Management',
};

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const getPageTitle = () => {
    return pageTitles[pathname] || 'StartUpOps';
  };
  
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Logo />
            {navLinks.map(link => (
                 <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-4 px-2.5 ${pathname === link.href ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      
      <div className="relative ml-auto flex-1 md:grow-0">
          <h1 className="font-headline text-2xl font-semibold hidden sm:block">{getPageTitle()}</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage src="https://picsum.photos/seed/avatar1/100/100" alt="User avatar" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/')}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
