import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiUser3Line, RiShieldCheckLine } from 'react-icons/ri';
import { auth } from '@/lib/authjs/authjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { FadeIn } from '@/app/_components/motions';
import Link from 'next/link';

export const Page = async () => {
  const session = await auth();
  if (!session?.user) redirect('/login');
  const { name, email, image } = session.user;

  return (
    <div className="min-h-screen">
      <FadeIn>
        <div className="mx-auto flex max-w-lg flex-col gap-8 p-8">
          {/* HEADER USER */}
          <div className="flex flex-col items-center text-center gap-2">
            {/* Avatar fallback */}
            <div className="h-20 w-20 overflow-hidden rounded-full border bg-muted shadow-sm">
              {image ? (
                <Image
                  src={image}
                  alt={'Avatar'}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <RiUser3Line className="size-10 text-muted-foreground" />
                </div>
              )}
            </div>
            <h1 className="text-xl font-semibold">{name}</h1>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>

          {/* CARDS STACKED */}
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center gap-2">
              <RiUser3Line className="size-5 text-primary" />
              <CardTitle>Perfil</CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground">
              Gerencie seu nome e informações da conta
            </CardContent>

            <div className="p-4 pt-0">
              <Link href="/dashboard/settings/profile">
                <Button className="w-full cursor-pointer">Editar Perfil</Button>
              </Link>
            </div>
          </Card>

          <Card className="w-full">
            <CardHeader className="flex flex-row items-center gap-2">
              <RiShieldCheckLine className="size-5 text-primary" />
              <CardTitle>Segurança</CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground">
              Gerencie a senha da conta
            </CardContent>

            <div className="p-4 pt-0">
              <Button variant="outline" className="w-full cursor-pointer">
                Gerenciar Segurança
              </Button>
            </div>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
};

export default Page;
