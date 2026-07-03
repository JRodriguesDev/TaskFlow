'use client';

import {
  RiDashboardLine,
  RiTaskLine,
  RiCalendarLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
} from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const activeClass =
  'border-l-4 border-primary bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary';

export const Sidebar = () => {
  const pathName = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col fixed left-0 top-0 border-r bg-background">
      {/* Logo */}
      <div className="border-b px-6 py-5">
        <h1 className="text-2xl font-bold cursor-pointer">TaskFlow</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <Link href="/dashboard/overview">
          <Button
            variant="ghost"
            className={`
              h-11 w-full justify-start gap-3 rounded-xl cursor-pointer transition-all duration-200
              ${pathName.startsWith('/dashboard/overview') ? activeClass : ''}
            `}
          >
            <RiDashboardLine className="size-5" />
            Overview
          </Button>
        </Link>

        <Link href="/dashboard/tasks">
          <Button
            variant="ghost"
            className={`
              h-11 w-full justify-start gap-3 rounded-xl cursor-pointer transition-all duration-200
              ${pathName.startsWith('/dashboard/tasks') ? activeClass : ''}
            `}
          >
            <RiTaskLine className="size-5" />
            Tasks
          </Button>
        </Link>

        <Link href="/dashboard/calendar">
          <Button
            variant="ghost"
            className={`
              h-11 w-full justify-start gap-3 rounded-xl cursor-pointer transition-all duration-200
              ${pathName.startsWith('/dashboard/calendar') ? activeClass : ''}
            `}
          >
            <RiCalendarLine className="size-5" />
            Calendar
          </Button>
        </Link>

        <Link href="/dashboard/settings">
          <Button
            variant="ghost"
            className={`
              h-11 w-full justify-start gap-3 rounded-xl cursor-pointer transition-all duration-200
              ${pathName.startsWith('/dashboard/settings') ? activeClass : ''}
            `}
          >
            <RiSettings3Line className="size-5" />
            Settings
          </Button>
        </Link>
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          onClick={() => signOut({ redirectTo: '/' })}
          className="
            h-11 w-full justify-start gap-3
            rounded-xl
            text-muted-foreground
            hover:bg-red-500/10
            hover:text-red-500
            transition-all 
            duration-200
            cursor-pointer
          "
        >
          <RiLogoutBoxRLine className="size-5" />
          Sair
        </Button>
      </div>
    </aside>
  );
};
