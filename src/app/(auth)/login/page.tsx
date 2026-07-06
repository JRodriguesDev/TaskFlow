'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field';
import { FormState } from '@/types/auth';
import { FcGoogle } from 'react-icons/fc';
import { useActionState } from 'react';
import { LoginAction } from './actions';
import { FormError } from '../_components/motions';
import { FadeIn } from '@/app/_components/motions';
import { AnimatePresence } from 'motion/react';
import { signIn } from 'next-auth/react';

const loginInitialState: FormState = {
  success: false,
  error: null,
};

const Page = () => {
  const [state, formAction, pending] = useActionState(LoginAction, loginInitialState);

  return (
    <div className=" flex justify-center px-4 w-1/4">
      <FadeIn>
        <Card className="w-full">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl">TaskFlow</CardTitle>
            <p className="text-sm text-muted-foreground">Entre na sua conta</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <FieldGroup>
              <form action={formAction} id="formLogin">
                {/* EMAIL */}
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" name="email" placeholder="seu@email.com" disabled={pending} />
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
                </Field>
              </form>
            </FieldGroup>

            <AnimatePresence>{state.error && <FormError>{state.error}</FormError>}</AnimatePresence>

            {/* LOGIN BUTTON */}
            <Button
              className="w-full cursor-pointer transition-all duration-200"
              disabled={pending}
              form="formLogin"
              type="submit"
            >
              {pending ? 'Entrando...' : 'Entrar'}
            </Button>

            {/* DIVIDER */}
            <div className="flex items-center gap-2">
              <div className="h-px bg-border flex-1" />
              <span className="text-xs text-muted-foreground">ou</span>
              <div className="h-px bg-border flex-1" />
            </div>

            {/* GOOGLE LOGIN */}
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
              Não tem conta?{' '}
              <a href="/register" className="text-primary hover:underline">
                Criar conta
              </a>
            </p>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default Page;
