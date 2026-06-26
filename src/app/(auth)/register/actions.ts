'use server';

import { FormState } from '@/types/auth';
import {registerSchema} from '@/lib/validations/auth'

export const registerAction = async (_prevState: FormState, form: FormData): Promise<FormState> => {
  const validationFields = registerSchema.safeParse({
    name: form.get('name'),
    email: form.get('email'),
    password: form.get('password'),
    confirmPassword: form.get('confirmPassword')
  })
  if (!validationFields.success) {
    return {success: false, error: validationFields.error.issues[0].message}
  }
  const {confirmPassword, ...userData} = validationFields.data

  return { success: true, error: null };
};
