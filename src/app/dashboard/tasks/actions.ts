'use server';

import type { FormTaskType } from '@/types/form';
import { taskSchema } from '@/lib/validations/task';
import { prismaErrors } from '@/lib/prisma/error';
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
  updateTask,
} from '@/services/DAL/task';
import { auth } from '@/lib/authjs/authjs';
import { redirect } from 'next/navigation';
import type { TaskSearchParams, TaskResponse } from '@/types/tasks';
import { updateTag } from 'next/cache';

export const createTaskAction = async (
  _prevState: FormTaskType,
  data: FormData
): Promise<FormTaskType> => {
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/login');
  const userId = session.user.id;

  const validationFields = taskSchema.safeParse({
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
    const taskUserId = await createTask(userId, task);
    updateTag(`tasksUser:${taskUserId}`);
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Error inteno' };
  }

  return { success: true, message: task.title };
};

export const taskUpdateAction = async (
  _prevState: FormTaskType,
  data: FormData
): Promise<FormTaskType> => {
  const validationFields = taskSchema.safeParse({
    id: data.get('id'),
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
  const { id: taskId, ...task } = validationFields.data;
  try {
    const taskUserId = await updateTask(taskId!, task);
    updateTag(`tasksUser:${taskUserId}`);
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Error inteno' };
  }
  return { success: true, message: task.title };
};

export const listTasksAction = async (filters: TaskSearchParams): Promise<TaskResponse> => {
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/login');
  const userId = session.user.id;

  const taskFilers: TaskSearchParams = {
    search: filters.search?.trim() || undefined,
    status: filters.status || undefined,
    priority: filters.priority || undefined,
    dueDate: filters.dueDate || undefined,
  };
  try {
    const tasks = await getTasks(userId, taskFilers);
    return { success: true, tasks: tasks };
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Error inteno' };
  }
};

export const statusChangeAction = async (
  taskId: string,
  newStatus: TaskSearchParams['status']
): Promise<TaskResponse> => {
  try {
    const taskUserId = await updateTaskStatus(taskId, newStatus!);
    updateTag(`tasksUser:${taskUserId}`);
    return { success: true };
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Error inteno' };
  }
};

export const deleteTaskAction = async (taskId: string): Promise<TaskResponse> => {
  try {
    const taskUserId = await deleteTask(taskId);
    updateTag(`tasksUser:${taskUserId}`);
    return { success: true };
  } catch (error) {
    return { success: false, message: prismaErrors(error) ?? 'Error inteno' };
  }
};
