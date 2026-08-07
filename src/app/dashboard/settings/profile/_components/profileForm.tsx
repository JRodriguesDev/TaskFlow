'use client';

import { useActionState } from 'react';
import { updateProfileAction } from '../actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formUserState } from '@/states/formState';
import { Spinner } from '@/components/ui/spinner';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { AnimatePresence } from 'motion/react';
import { FormError } from '@/app/_components/motions';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const ProfileForm = ({ name, email }: { name: string; email: string }) => {
  const [state, formAction, pending] = useActionState(updateProfileAction, formUserState);
  const { update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!state.message) return;
    (async () => {
      await update({ name: state.message });
      router.refresh();
    })();
  }, [state.message]);

  return (
    <form className="space-y-5" action={formAction}>
      <Field className="space-y-2" data-invalid={!!state.errors?.name}>
        <FieldLabel className="text-sm font-medium">Nome</FieldLabel>
        <Input
          name="name"
          defaultValue={name}
          disabled={pending}
          aria-invalid={!!state.errors?.name}
        />
        <AnimatePresence>
          {state.errors?.name && <FormError>{state.errors?.name}</FormError>}
        </AnimatePresence>
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
