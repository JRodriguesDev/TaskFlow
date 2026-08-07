'use server';

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

export const todayProgressAction = async (userId: string): Promise<TodayTaskReponse> => {
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

export const taskSummaryAction = async (userId: string): Promise<SummaryTaskResponse> => {
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

export const taskScheduleAction = async (userId: string): Promise<taskScheduleResponse> => {
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
