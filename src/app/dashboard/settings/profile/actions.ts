import type { FormState } from '@/types/auth';
import { profileNameSchema } from '@/lib/validations/settings';

export const updateProfileAction = async (
  _prevState: FormState,
  form: FormData
): Promise<FormState> => {
  const validation = profileNameSchema.safeParse({
    name: form.get('name'),
  });
  if (!validation.success) return { success: false, error: validation.error.issues[0].message };
  const name = validation.data.name;

  return { success: false, error: null };
};
