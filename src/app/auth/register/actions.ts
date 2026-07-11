'use server';

import { FormState } from '@/types/form';
import { registerSchema } from '@/lib/validations/auth';
import { registerUser } from '@/services/DAL/user';
import { hashPassword } from '@/lib/crypto/password';
import { signIn } from '@/lib/authjs/authjs';
import { redirect } from 'next/navigation';
import { authErrors } from '@/lib/authjs/error';
import { prismaErrors } from '@/lib/prisma/error';

export const registerAction = async (_prevState: FormState, form: FormData): Promise<FormState> => {
  const validationFields = registerSchema.safeParse({
    name: form.get('name'),
    email: form.get('email'),
    password: form.get('password'),
    confirmPassword: form.get('confirmPassword'),
  });
  if (!validationFields.success) {
    return { message: validationFields.error.issues[0].message };
  }

  const { confirmPassword, password, ...rest } = validationFields.data;
  const hashedPassword = await hashPassword(password);
  const createUserData = {
    ...rest,
    password: hashedPassword,
  };

  try {
    await registerUser(createUserData);
  } catch (error) {
    return { message: authErrors(error) ?? prismaErrors(error) ?? 'Error inteno' };
  }

  await signIn('credentials', {
    email: createUserData.email,
    password: password,
    redirect: false,
  });
  redirect('/dashboard/overview');
};
