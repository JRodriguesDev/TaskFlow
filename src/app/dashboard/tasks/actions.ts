'use server';

import type { FormTaskType } from '@/types/form';
import { taskCreateSchema } from '@/lib/validations/task';
import { prismaErrors } from '@/lib/prisma/error';
import { createTask } from '@/services/DAL/task';
import { auth } from '@/lib/authjs/authjs';
import { redirect } from 'next/navigation';

export const createTaskAction = async (
  _prevState: FormTaskType,
  data: FormData
): Promise<FormTaskType> => {
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/login');
  const userId = session.user.id;

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
  try {
    await createTask(userId, task);
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Error inteno' };
  }
  return { success: true, message: task.title };
};
