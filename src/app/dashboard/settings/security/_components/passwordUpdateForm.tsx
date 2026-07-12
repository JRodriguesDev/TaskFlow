'use client';

import { CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RiLockPasswordLine } from 'react-icons/ri';

export const PasswordUpdateForm = ({ hasPassword }: { hasPassword: boolean }) => {
  return (
    <CardContent className="space-y-5">
      {hasPassword && (
        <Field>
          <FieldLabel>Senha Atual</FieldLabel>

          <Input type="password" placeholder="Digite sua senha atual" />

          <FieldDescription>Necessária para confirmar a alteração.</FieldDescription>
        </Field>
      )}

      <Field>
        <FieldLabel>{hasPassword ? 'Nova Senha' : 'Criar Senha'}</FieldLabel>

        <Input
          type="password"
          placeholder={hasPassword ? 'Digite sua nova senha' : 'Crie uma senha para sua conta'}
        />

        <FieldDescription>Utilize pelo menos 8 caracteres.</FieldDescription>
      </Field>

      <Field>
        <FieldLabel>Confirmar Senha</FieldLabel>

        <Input type="password" placeholder="Digite novamente a senha" />
      </Field>

      <Button className="w-full cursor-pointer">
        <RiLockPasswordLine className="mr-2 size-4" />

        {hasPassword ? 'Alterar Senha' : 'Criar Senha'}
      </Button>
    </CardContent>
  );
};
