'use client';

import {
  RiDashboardLine,
  RiTaskLine,
  RiCalendarLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
} from 'react-icons/ri';

import { Button } from '@/components/ui/button';

export const Sidebar = () => {
  return (
    <aside className="flex h-screen w-72 flex-col fixed left-0 top-0 border-r bg-background">
      {/* Logo */}
      <div className="border-b px-6 py-5">
        <h1 className="text-2xl font-bold">TaskFlow</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <Button
          variant="ghost"
          className="
            h-11 w-full justify-start gap-3
            rounded-xl border-l-4 border-primary
            bg-primary/10
            text-primary
            hover:bg-primary/15
            hover:text-primary
          "
        >
          <RiDashboardLine className="size-5" />
          Dashboard
        </Button>

        <Button
          variant="ghost"
          className="
            h-11 w-full justify-start gap-3
            rounded-xl
          "
        >
          <RiTaskLine className="size-5" />
          Tasks
        </Button>

        <Button
          variant="ghost"
          className="
            h-11 w-full justify-start gap-3
            rounded-xl
          "
        >
          <RiCalendarLine className="size-5" />
          Calendar
        </Button>

        <Button
          variant="ghost"
          className="
            h-11 w-full justify-start gap-3
            rounded-xl
          "
        >
          <RiSettings3Line className="size-5" />
          Settings
        </Button>
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="
            h-11 w-full justify-start gap-3
            rounded-xl
            text-muted-foreground
            hover:bg-red-500/10
            hover:text-red-500
          "
        >
          <RiLogoutBoxRLine className="size-5" />
          Sair
        </Button>
      </div>
    </aside>
  );
};
