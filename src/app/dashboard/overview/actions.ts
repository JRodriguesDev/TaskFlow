'use server';

import { auth } from '@/lib/authjs/authjs';
import { redirect } from 'next/navigation';
import {
  getTodayProgress,
  getTaskSummary,
  getTaskSchedule,
  updateTaskStatus,
} from '@/services/DAL/task';
import type { TodayTaskReponse, SummaryTaskResponse, taskScheduleResponse } from '@/types/tasks';
import { prismaErrors } from '@/lib/prisma/error';
import type { TaskSearchParams, TaskResponse } from '@/types/tasks';
import { updateTag } from 'next/cache';

export const todayProgressAction = async (): Promise<TodayTaskReponse> => {
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/login');
  const userId = session.user.id;

  try {
    const todayTasks = await getTodayProgress(userId);
    const total = todayTasks.length;
    const completed = todayTasks.filter((task) => task.status === 'DONE').length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return {
      success: true,
      progress: {
        total,
        completed,
        percentage,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: prismaErrors(error) ?? 'Erro interno',
    };
  }
};

export const taskSummaryAction = async (): Promise<SummaryTaskResponse> => {
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/login');
  const userId = session.user.id;

  try {
    const tasks = await getTaskSummary(userId);
    return {
      success: true,
      summaryTasks: {
        ...tasks,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: prismaErrors(error) ?? 'Erro interno',
    };
  }
};

export const taskScheduleAction = async (): Promise<taskScheduleResponse> => {
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/login');
  const userId = session.user.id;

  try {
    const tasks = await getTaskSchedule(userId);
    return {
      success: true,
      tasks: {
        ...tasks,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: prismaErrors(error) ?? 'Erro interno',
    };
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
