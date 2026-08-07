'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export const GoogleAccountButton = ({ hasAccount }: { hasAccount: boolean }) => {
  return (
    <div className="flex items-center gap-3">
      <Badge variant={hasAccount ? 'default' : 'secondary'}>
        {hasAccount ? 'Vinculado' : 'Não vinculado'}
      </Badge>

      <Button
        variant={hasAccount ? 'default' : 'outline'}
        disabled={hasAccount}
        onClick={() => signIn('google')}
        className={
          hasAccount
            ? 'cursor-default bg-green-600 text-white hover:bg-green-600'
            : 'cursor-pointer'
        }
      >
        {hasAccount ? 'Conectado' : 'Conectar'}
      </Button>
    </div>
  );
};
