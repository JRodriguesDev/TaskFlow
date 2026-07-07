import Image from 'next/image';
import { RiGoogleFill, RiCalendarLine, RiUser3Line } from 'react-icons/ri';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/lib/authjs/authjs';
import { FadeIn } from '@/app/_components/motions';
import { redirect } from 'next/navigation';
import { ProfileForm } from './_components/profileForm';

const Page = async () => {
  const session = await auth();
  if (!session?.user) redirect('/login');
  const { name, email, image } = session.user;

  return (
    <div className="min-h-screen">
      <FadeIn>
        <div className="mx-auto flex max-w-2xl flex-col gap-8 p-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="h-24 w-24 overflow-hidden rounded-full border bg-muted shadow-sm">
              {image ? (
                <Image
                  src={image}
                  alt="Avatar"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <RiUser3Line className="size-10 text-muted-foreground" />
                </div>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold">Gerenciar Perfil</h1>
              <p className="text-sm text-muted-foreground">
                Atualize suas informações e gerencie integrações.
              </p>
            </div>
          </div>

          {/* Informações */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>

            <CardContent>
              <ProfileForm name={name!} email={email!} />
            </CardContent>
          </Card>

          {/* Integrações */}
          <Card>
            <CardHeader>
              <CardTitle>Contas Vinculadas</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Google */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RiGoogleFill className="size-6 text-red-500" />

                  <div>
                    <h3 className="font-medium">Google</h3>

                    <p className="text-sm text-muted-foreground">Login com Google</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge>Vinculado</Badge>

                  <Button variant="outline" className="cursor-pointer">
                    Desvincular
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Calendar */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RiCalendarLine className="size-6 text-primary" />

                  <div>
                    <h3 className="font-medium">Google Calendar</h3>

                    <p className="text-sm text-muted-foreground">
                      Sincronize suas tarefas automaticamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="secondary">Não vinculado</Badge>

                  <Button className="cursor-pointer">Vincular</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
};

export default Page;
