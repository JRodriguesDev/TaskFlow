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
import { createEvent } from '@/services/calendar/calendar';
import { syncCalendarUpdate, syncCalendarDelete } from '@/services/calendar/sync';

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
    syncCalendar: data.get('syncCalendar'),
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
  const { syncCalendar, ...task } = validationFields.data;
  try {
    const eventId = syncCalendar
      ? await createEvent({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          priority: task.priority,
        })
      : undefined;
    const taskUserId = await createTask(userId, task, eventId);
    updateTag(`tasksUser:${taskUserId}`);
  } catch (error) {
    return {
      success: false,
      message: prismaErrors(error) ?? (error as Error)?.message ?? 'Error inteno',
    };
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
    syncCalendar: data.get('syncCalendar'),
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
  const { id: taskId, syncCalendar, ...task } = validationFields.data;
  try {
    const eventId = await syncCalendarUpdate(taskId!, syncCalendar, task);
    const taskUserId = await updateTask(taskId!, task, eventId);
    updateTag(`tasksUser:${taskUserId}`);
  } catch (error) {
    return {
      success: false,
      message: prismaErrors(error) ?? (error as Error)?.message ?? 'Error inteno',
    };
  }
  return { success: true, message: task.title };
};

export const listTasksAction = async (
  userId: string,
  filters: TaskSearchParams
): Promise<TaskResponse> => {
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
    await syncCalendarDelete(taskId);
    const taskUserId = await deleteTask(taskId);
    updateTag(`tasksUser:${taskUserId}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: prismaErrors(error) ?? (error as Error)?.message ?? 'Error inteno',
    };
  }
};
