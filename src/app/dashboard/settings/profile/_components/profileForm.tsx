'use client';

import { useActionState } from 'react';
import { updateProfileAction } from '../actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formState } from '@/states/formState';
import { Spinner } from '@/components/ui/spinner';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';

export const ProfileForm = ({ name, email }: { name: string; email: string }) => {
  const [state, formAction, pending] = useActionState(updateProfileAction, formState);

  return (
    <form className="space-y-5" action={formAction}>
      <Field className="space-y-2" data-invalid={!!state.error}>
        <FieldLabel className="text-sm font-medium">Nome</FieldLabel>
        <Input name="name" defaultValue={name} disabled={pending} aria-invalid={!!state.error} />
        {state.error && <FieldDescription>{state.error}</FieldDescription>}
      </Field>
      <Field className="space-y-2">
        <FieldLabel className="text-sm font-medium">Email</FieldLabel>
        <Input value={email} disabled />
        <FieldDescription>O email não pode ser alterado.</FieldDescription>
      </Field>
      <Button className="cursor-pointer" disabled={pending}>
        {pending ? <Spinner /> : 'Salvar Alterações'}
      </Button>
    </form>
  );
};
