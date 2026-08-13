import type { Task } from '@/generated/prisma/client';
import type { TaskSchedule } from './tasks';
import type { CalendarTask } from './calendar';

type TaskCard = Omit<Task, 'completedAt' | 'userId' | 'updatedAt'>;

type TaskResponse = {
  success: boolean;
  message?: string;
};

export type TaskListResponse = TaskResponse & {
  tasks?: TaskCard[];
};

export type TodayTaskReponse = TaskResponse & {
  progress?: {
    total: number;
    completed: number;
    percentage: number;
  };
};

export type SummaryTaskResponse = TaskResponse & {
  summaryTasks?: {
    total: number;
    done: number;
    inProgress: number;
    todo: number;
  };
};

export type taskScheduleResponse = TaskResponse & {
  tasks?: {
    todayTasks: TaskSchedule[];
    tomorrowTasks: TaskSchedule[];
    overdueTasks: TaskSchedule[];
  };
};

export type CalendarTaskResponse = TaskResponse & {
  tasks?: CalendarTask[];
};
