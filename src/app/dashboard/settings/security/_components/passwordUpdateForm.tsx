'use client';

import { CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useActionState } from 'react';
import { updatePassword } from '../actions';
import { formState } from '@/states/formState';
import { AnimatePresence } from 'motion/react';
import { FormError } from '@/app/_components/motions';
import { toast } from 'sonner';
import { useEffect } from 'react';

export const PasswordUpdateForm = ({ hasPassword }: { hasPassword: boolean }) => {
  const [state, formAction, pending] = useActionState(updatePassword, formState);
  useEffect(() => {
    if (state.success) toast.success('Senha Alterada');
  }, [state.success]);

  return (
    <form action={formAction}>
      <CardContent className="space-y-5">
        <Field>
          <FieldLabel>{hasPassword ? 'Nova Senha' : 'Criar Senha'}</FieldLabel>

          <Input
            type="password"
            disabled={pending}
            name="password"
            placeholder={hasPassword ? 'Digite sua nova senha' : 'Crie uma senha para sua conta'}
          />

          <FieldDescription>Utilize pelo menos 8 caracteres.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Confirmar Senha</FieldLabel>

          <Input
            type="password"
            name="confirmPassword"
            disabled={pending}
            placeholder="Digite novamente a senha"
          />
        </Field>
        <AnimatePresence>{state.message && <FormError>{state.message}</FormError>}</AnimatePresence>
        <Button className="w-full cursor-pointer" disabled={pending}>
          <RiLockPasswordLine className="mr-2 size-4" />
          {hasPassword ? 'Alterar Senha' : 'Criar Senha'}
        </Button>
      </CardContent>
    </form>
  );
};
