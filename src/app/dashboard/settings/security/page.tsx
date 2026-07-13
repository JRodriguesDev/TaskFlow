import { redirect } from 'next/navigation';
import { RiShieldCheckLine } from 'react-icons/ri';

import { auth } from '@/lib/authjs/authjs';
import { FadeIn } from '@/app/_components/motions';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { PasswordUpdateForm } from './_components/passwordUpdateForm';
import { userHasPassword } from '@/services/DAL/user';

const Page = async () => {
  const session = await auth();
  if (!session?.user) redirect('/auth/login');
  const { id } = session.user;
  const hasPassword = await userHasPassword(id!);

  return (
    <div className="min-h-screen">
      <FadeIn>
        <div className="mx-auto flex max-w-2xl flex-col gap-8 p-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border bg-muted shadow-sm">
              <RiShieldCheckLine className="size-10 text-primary" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">Segurança</h1>

              <p className="text-sm text-muted-foreground">
                Gerencie sua senha para manter sua conta protegida.
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Senha da Conta</CardTitle>
            </CardHeader>
            <PasswordUpdateForm hasPassword={hasPassword} />
          </Card>
        </div>
      </FadeIn>
    </div>
  );
};

export default Page;
