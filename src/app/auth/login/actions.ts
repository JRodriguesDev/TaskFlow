'use server';

import type { FormState } from '@/types/form';
import { loginSchema } from '@/lib/validations/auth';
import { signIn } from '@/lib/authjs/authjs';
import { redirect } from 'next/navigation';
import { authErrors } from '@/lib/authjs/error';
import { prismaErrors } from '@/lib/prisma/error';

export const LoginAction = async (_prevState: FormState, form: FormData): Promise<FormState> => {
  const validationFields = loginSchema.safeParse({
    email: form.get('email'),
    password: form.get('password'),
  });

  if (!validationFields.success) {
    return { message: validationFields.error.issues[0].message };
  }
  const { email, password } = validationFields.data;
  try {
    await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });
  } catch (error) {
    return { message: authErrors(error) ?? prismaErrors(error) ?? 'Error inteno' };
  }
  redirect('/dashboard/overview');
};
