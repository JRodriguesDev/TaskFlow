import { Suspense } from 'react';
import { ErrorContent } from './_components/errorContent';

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Suspense fallback={<p className="text-sm text-muted-foreground">Carregando...</p>}>
        <ErrorContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
