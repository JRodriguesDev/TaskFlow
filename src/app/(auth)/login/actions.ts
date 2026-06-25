'use server';

import type { FormState } from '@/types/auth';

export const LoginAction = async (_prevState: FormState, form: FormData): Promise<FormState> => {
  return { success: true, error: null };
};
