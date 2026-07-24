'use server';

import type { FormTaskType } from '@/types/form';
import { taskCreateSchema } from '@/lib/validations/task';

export const createTaskAction = async (
  _prevState: FormTaskType,
  data: FormData
): Promise<FormTaskType> => {
  const validationFields = taskCreateSchema.safeParse({
    title: data.get('title'),
    description: data.get('description'),
    priority: data.get('priority'),
    status: data.get('status'),
    dueDate: data.get('dueDate'),
  });
  if (!validationFields.success) {
    const errors = validationFields.error.flatten().fieldErrors;
    return {
      success: false,
      errors: {
        title: errors.title?.[0],
        description: errors.description?.[0],
        dueDate: errors.dueDate?.[0],
      },
    };
  }
  const task = validationFields.data;
  console.log(task);
  return { success: false };
};
