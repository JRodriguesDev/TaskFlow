'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldGroup, FieldError } from '@/components/ui/field';

import { FcGoogle } from 'react-icons/fc';

const Page = () => {
  return (
    <div className="flex justify-center px-4 w-1/4">
      <Card className="w-full">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl">TaskFlow</CardTitle>
          <p className="text-sm text-muted-foreground">Crie sua conta</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <FieldGroup>
            {/* NAME */}
            <Field>
              <FieldLabel>Nome</FieldLabel>
              <Input type="text" placeholder="Seu nome" />
              <FieldError />
            </Field>

            {/* EMAIL */}
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="seu@email.com" />
              <FieldError />
            </Field>

            {/* PASSWORD */}
            <Field>
              <FieldLabel>Senha</FieldLabel>
              <Input type="password" placeholder="••••••••" />
              <FieldError />
            </Field>

            {/* CONFIRM PASSWORD */}
            <Field>
              <FieldLabel>Confirmar senha</FieldLabel>
              <Input type="password" placeholder="••••••••" />
              <FieldError />
            </Field>
          </FieldGroup>

          {/* REGISTER BUTTON */}
          <Button className="w-full cursor-pointer">Criar conta</Button>

          {/* DIVIDER */}
          <div className="flex items-center gap-2">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs text-muted-foreground">ou</span>
            <div className="h-px bg-border flex-1" />
          </div>

          {/* GOOGLE REGISTER */}
          <Button variant="outline" className="w-full flex items-center gap-2 cursor-pointer">
            <FcGoogle size={18} />
            Continuar com Google
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Já tem conta?{' '}
            <a href="/login" className="text-primary hover:underline">
              Entrar
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
