import type { Task } from '@/generated/prisma/client';

export type CalendarTask = Pick<
  Task,
  'id' | 'title' | 'status' | 'priority' | 'calendarEventId' | 'dueDate'
>;

export type CalendarTaskResponse = {
  success: boolean;
  tasks?: CalendarTask[];
  message?: string;
};
