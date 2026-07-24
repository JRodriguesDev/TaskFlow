import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import type { TaskCreateSchema } from '@/lib/validations/task';

export const createTask = async (userId: string, data: TaskCreateSchema) => {
  const task = await prisma.task.create({
    data: {
      userId: userId,
      ...data,
    },
    select: { title: true },
  });
  return !!task;
};
