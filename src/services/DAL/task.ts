import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import type { TaskSchema } from '@/lib/validations/task';
import type { TaskSearchParams } from '@/types/tasks';
import { buildDueDateFilter } from '@/lib/helpers/dueDate';
import type { TaskCardProps } from '@/types/tasks';
import { cacheTag } from 'next/cache';

type TaskCardStatus = TaskCardProps['status'];

export const createTask = async (
  userId: string,
  data: Omit<TaskSchema, 'syncCalendar'>,
  eventId: string | undefined
) => {
  const task = await prisma.task.create({
    data: {
      userId: userId,
      ...data,
      calendarEventId: eventId,
    },
    select: { userId: true },
  });
  return task.userId;
};

export const updateTask = async (
  taskId: string,
  data: Omit<TaskSchema, 'syncCalendar'>,
  eventId: string | undefined
) => {
  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      ...data,
      calendarEventId: eventId,
    },
    select: { userId: true },
  });
  return task.userId;
};

export const getTasks = async (userId: string, filters: TaskSearchParams) => {
  'use cache';
  cacheTag(`tasksUser:${userId}`);
  const tasks = await prisma.task.findMany({
    where: {
      userId: userId,
      status: filters.status,
      priority: filters.priority,
      title: filters.search
        ? {
            contains: filters.search,
            mode: 'insensitive',
          }
        : undefined,
      dueDate: buildDueDateFilter(filters.dueDate),
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
      description: true,
      dueDate: true,
      createdAt: true,
      completedAt: true,
      calendarEventId: true,
    },
  });

  return tasks;
};

export const updateTaskStatus = async (id: string, status: TaskCardStatus) => {
  const task = await prisma.task.update({
    where: { id: id },
    data: { status: status },
    select: { userId: true },
  });
  return task.userId;
};

export const deleteTask = async (id: string) => {
  const task = await prisma.task.delete({
    where: { id: id },
    select: { userId: true },
  });
  return task.userId;
};

export const getTodayProgress = async (userId: string) => {
  'use cache';
  cacheTag(`tasksUser:${userId}`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const todayTasks = await prisma.task.findMany({
    where: {
      userId: userId,
      dueDate: {
        gte: today,
        lt: tomorrow,
      },
    },
    select: {
      id: true,
      status: true,
    },
  });

  return todayTasks;
};

export const getTaskSummary = async (userId: string) => {
  'use cache';
  cacheTag(`tasksUser:${userId}`);
  const tasks = await prisma.task.findMany({
    where: { userId: userId },
    select: {
      status: true,
    },
  });
  return {
    total: tasks.length,
    done: tasks.filter((t) => t.status === 'DONE').length,
    inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
    todo: tasks.filter((t) => t.status === 'TODO').length,
  };
};

export const getTaskSchedule = async (userId: string) => {
  'use cache';
  cacheTag(`tasksUser:${userId}`);
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);

  const tomorrowEnd = new Date(todayEnd);
  tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);

  const [todayTasks, tomorrowTasks, overdueTasks] = await prisma.$transaction([
    prisma.task.findMany({
      where: {
        userId: userId,
        dueDate: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      orderBy: { dueDate: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
      },
    }),
    prisma.task.findMany({
      where: {
        userId: userId,
        dueDate: {
          gte: tomorrowStart,
          lte: tomorrowEnd,
        },
      },
      orderBy: { dueDate: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
      },
    }),
    prisma.task.findMany({
      where: {
        userId: userId,
        dueDate: {
          lt: todayStart,
        },
        status: { not: 'DONE' },
      },
      orderBy: { dueDate: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
      },
    }),
  ]);

  return {
    todayTasks,
    tomorrowTasks,
    overdueTasks,
  };
};

export const getCalendarTask = async (userId: string) => {
  'use cache';
  cacheTag(`tasksUser:${userId}`);
  const tasks = await prisma.task.findMany({
    where: { userId: userId },
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
      calendarEventId: true,
      dueDate: true,
    },
  });

  return tasks;
};

export const getExistingTask = async (taskId: string) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    select: {
      calendarEventId: true,
    },
  });

  return task?.calendarEventId;
};
