'use server';

import { auth } from '@/lib/authjs/authjs';
import { redirect } from 'next/navigation';
import type { FormUserType } from '@/types/form';
import { passwordSchema } from '@/lib/validations/settings';
import { hashPassword } from '@/lib/crypto/password';
import { updateUser } from '@/services/DAL/user';
import { prismaErrors } from '@/lib/prisma/error';
import { updateTag } from 'next/cache';

export const updatePassword = async (
  _prevState: FormUserType,
  data: FormData
): Promise<FormUserType> => {
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/login');
  const userId = session.user.id;

  const validation = passwordSchema.safeParse({
    password: data.get('password'),
    confirmPassword: data.get('confirmPassword'),
  });
  if (!validation.success) return { message: validation.error.issues[0].message };
  const newPassowrd = validation.data.password;
  const hashedPassword = await hashPassword(newPassowrd);
  try {
    await updateUser(userId, { password: hashedPassword });
  } catch (error) {
    return { message: prismaErrors(error) ?? 'Error interno' };
  }
  updateTag(`userHasPassword-${userId}`);

  return { success: true };
};
