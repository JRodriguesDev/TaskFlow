import Link from 'next/link';
import { Button } from '@/components/ui/button';

const message = 'A conta Google selecionada possui um e-mail diferente da sua conta atual.';

const Page = async ({ searchParams }: { searchParams: Promise<{ error?: string }> }) => {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-bold">Ocorreu um erro</h1>

        <p className="text-muted-foreground">{message}</p>

        <Button asChild>
          <Link href="/dashboard/settings/profile">Voltar</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
