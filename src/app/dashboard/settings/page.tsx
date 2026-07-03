import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiUser3Line, RiShieldCheckLine } from 'react-icons/ri';

const userMock = {
  name: 'José Rodrigues',
  email: 'jose@email.com',
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-2xl flex-col gap-8 p-8">
        {/* HEADER USER */}
        <div className="flex flex-col items-center text-center gap-2">
          {/* Avatar fallback */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <RiUser3Line className="size-8 text-muted-foreground" />
          </div>

          <h1 className="text-xl font-semibold">{userMock.name}</h1>
          <p className="text-sm text-muted-foreground">{userMock.email}</p>
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
            <Button className="w-full cursor-pointer">Editar Perfil</Button>
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
    </div>
  );
}
