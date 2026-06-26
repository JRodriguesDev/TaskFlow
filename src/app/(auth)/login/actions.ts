'use server';

import type { FormState } from '@/types/auth';
import { loginSchema } from '@/lib/validations/auth';

export const LoginAction = async (_prevState: FormState, form: FormData): Promise<FormState> => {
  const validationFields = loginSchema.safeParse({
    email: form.get('email'),
    password: form.get('password'),
  });

  if (!validationFields.success) {
    return { success: false, error: validationFields.error.issues[0].message };
  }
  const {email, password} = validationFields.data
  
  return { success: true, error: null };
};
