'use server';

import { getCalendarTask } from '@/services/DAL/task';
import { CalendarTaskResponse } from '@/types/actionResponse';
import { prismaErrors } from '@/lib/prisma/error';

export const getTasksAction = async (userId: string): Promise<CalendarTaskResponse> => {
  try {
    const tasks = await getCalendarTask(userId);
    return {
      success: true,
      tasks: tasks,
    };
  } catch (error) {
    return {
      success: false,
      message: prismaErrors(error) ?? 'Erro interno',
    };
  }
};
