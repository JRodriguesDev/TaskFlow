'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import type { HasTokenGoogle } from '@/types/user';
import { RiCheckLine, RiErrorWarningLine } from 'react-icons/ri';

export const GoogleCalendarButton = ({ hasTokenGoogle }: { hasTokenGoogle: HasTokenGoogle }) => {
  const { isGoogleConnected, hasCalendarError } = hasTokenGoogle ?? {};

  if (isGoogleConnected && !hasCalendarError) {
    return (
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className="border-emerald-600 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 py-1.5 px-3 gap-1.5"
        >
          <RiCheckLine className="size-4" />
          Conectado ao Google Calendar
        </Badge>
      </div>
    );
  }

  if (isGoogleConnected && hasCalendarError) {
    return (
      <div className="flex items-center gap-3">
        <Badge
          variant="outline"
          className="border-destructive bg-destructive/10 text-destructive py-1.5 px-3 gap-1.5"
        >
          <RiErrorWarningLine className="size-4" />
          Acesso Expirado
        </Badge>

        <Button
          type="button"
          variant="destructive"
          className="cursor-pointer gap-2"
          onClick={() => signIn('google', { redirectTo: '/dashboard/settings/profile' })}
        >
          Reconectar Google Calendar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        className="cursor-pointer gap-2"
        onClick={() => signIn('google', { redirectTo: '/dashboard/settings/profile' })}
      >
        Conectar Google Calendar
      </Button>
    </div>
  );
};
