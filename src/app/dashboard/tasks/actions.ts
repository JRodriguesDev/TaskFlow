'use server';

import type { FormTaskType } from '@/types/form';

export const createTaskAction = async (
  _prevState: FormTaskType,
  data: FormData
): Promise<FormTaskType> => {
  await new Promise((r) => setTimeout(r, 3000));

  return { success: false };
};
