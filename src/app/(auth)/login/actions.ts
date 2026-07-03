'use server';

import type { FormState } from '@/types/auth';
import { loginSchema } from '@/lib/validations/auth';
import { signIn } from '@/lib/authjs/authjs';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export const LoginAction = async (_prevState: FormState, form: FormData): Promise<FormState> => {
  const validationFields = loginSchema.safeParse({
    email: form.get('email'),
    password: form.get('password'),
  });

  if (!validationFields.success) {
    return { success: false, error: validationFields.error.issues[0].message };
  }
  const { email, password } = validationFields.data;
  try {
    await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: 'Usuário ou senha inválidos',
      };
    }
  }
  redirect('/dashboard/overview');
};
