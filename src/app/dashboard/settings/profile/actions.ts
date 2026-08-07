'use server';

import type { FormUserType } from '@/types/form';
import { profileNameSchema } from '@/lib/validations/settings';
import { auth } from '@/lib/authjs/authjs';
import { redirect } from 'next/navigation';
import { updateUser } from '@/services/DAL/user';
import { prismaErrors } from '@/lib/prisma/error';

export const updateProfileAction = async (
  _prevState: FormUserType,
  form: FormData
): Promise<FormUserType> => {
  const session = await auth();

  if (!session?.user?.id) redirect('/auth/login');

  const userId = session.user.id;

  const validation = profileNameSchema.safeParse({
    name: form.get('name'),
  });

  if (!validation.success)
    return {
      errors: { name: validation.error.issues[0].message },
    };

  try {
    await updateUser(userId, {
      name: validation.data.name,
    });
  } catch (error) {
    return { errors: { name: prismaErrors(error) ?? 'Error interno' } };
  }
  return { message: validation.data.name };
};
