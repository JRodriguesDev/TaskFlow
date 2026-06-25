'use server';

import { LoginState } from '@/types/auth';

export const LoginAction = async (_prevState: LoginState, form: FormData): Promise<LoginState> => {
  return { success: true, error: null };
};
