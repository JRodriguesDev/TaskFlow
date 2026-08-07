'use client';

import { RiErrorWarningLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const ErrorTasks = ({ message }: { message?: string }) => {
  const router = useRouter();

  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="space-y-4 text-center">
        <RiErrorWarningLine className="mx-auto size-12 text-destructive" />

        <div className="space-y-1">
          <h2 className="font-semibold">Não foi possível carregar suas tarefas</h2>

          <p className="text-sm text-muted-foreground">
            {message ?? 'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'}
          </p>
        </div>

        <Button variant="outline" onClick={() => router.refresh()}>
          Tentar novamente
        </Button>
      </div>
    </div>
  );
};
