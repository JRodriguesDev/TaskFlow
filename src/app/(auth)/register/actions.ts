'use server';

import { FormState } from '@/types/auth';

export const registerAction = async (_prevState: FormState, form: FormData): Promise<FormState> => {
  return { success: true, error: null };
};
