'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldGroup, FieldError } from '@/components/ui/field';
import { registerAction } from './actions';
import { FormError } from '@/app/_components/motions';
import { FadeIn } from '@/app/_components/motions';
import { FcGoogle } from 'react-icons/fc';
import { useActionState } from 'react';
import { AnimatePresence } from 'motion/react';
import { signIn } from 'next-auth/react';
import { formState } from '@/states/formState';

const Page = () => {
  const [state, formAction, pending] = useActionState(registerAction, formState);

  return (
    <div className="flex justify-center px-4 w-1/4">
      <FadeIn>
        <Card className="w-full">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl">TaskFlow</CardTitle>
            <p className="text-sm text-muted-foreground">Crie sua conta</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <FieldGroup>
              <form action={formAction} id="registerForm">
                {/* NAME */}
                <Field>
                  <FieldLabel>Nome</FieldLabel>
                  <Input type="text" name="name" placeholder="Seu nome" disabled={pending} />
                  <FieldError />
                </Field>

                {/* EMAIL */}
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" name="email" placeholder="seu@email.com" disabled={pending} />
                  <FieldError />
                </Field>

                {/* PASSWORD */}
                <Field>
                  <FieldLabel>Senha</FieldLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    disabled={pending}
                  />
                  <FieldError />
                </Field>

                {/* CONFIRM PASSWORD */}
                <Field>
                  <FieldLabel>Confirmar senha</FieldLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    disabled={pending}
                  />
                  <FieldError />
                </Field>
              </form>
            </FieldGroup>

            <AnimatePresence>
              {state.message && <FormError>{state.message}</FormError>}
            </AnimatePresence>

            {/* REGISTER BUTTON */}
            <Button className="w-full cursor-pointer" form="registerForm" disabled={pending}>
              Criar conta
            </Button>

            {/* DIVIDER */}
            <div className="flex items-center gap-2">
              <div className="h-px bg-border flex-1" />
              <span className="text-xs text-muted-foreground">ou</span>
              <div className="h-px bg-border flex-1" />
            </div>

            {/* GOOGLE REGISTER */}
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 cursor-pointer"
              disabled={pending}
              onClick={() => signIn('google', { redirectTo: '/dashboard/overview' })}
            >
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
      </FadeIn>
    </div>
  );
};

export default Page;
