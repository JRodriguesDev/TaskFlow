'use server';

import type { FormState } from '@/types/auth';
import { profileNameSchema } from '@/lib/validations/settings';
import { auth } from '@/lib/authjs/authjs';
import { redirect } from 'next/navigation';
import { updateUser } from '@/services/DAL/user';

export const updateProfileAction = async (
  _prevState: FormState,
  form: FormData
): Promise<FormState> => {
  const session = await auth();

  if (!session?.user?.id) redirect('/login');

  const userId = session.user.id;

  const validation = profileNameSchema.safeParse({
    name: form.get('name'),
  });

  if (!validation.success)
    return {
      errors: { name: validation.error.issues[0].message },
    };

  await updateUser(userId, {
    name: validation.data.name,
  });

  return { message: '' };
};
