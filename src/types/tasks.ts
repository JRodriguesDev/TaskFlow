import type { Task } from '@/generated/prisma/client';

export type TaskCardProps = Pick<
  Task,
  | 'id'
  | 'title'
  | 'description'
  | 'dueDate'
  | 'calendarEventId'
  | 'priority'
  | 'status'
  | 'completedAt'
  | 'createdAt'
> & {
  description?: Task['description'];
  calendarEventId?: Task['calendarEventId'];
  completedAt?: Task['completedAt'];
};

export type TaskDialogProps = Pick<
  Task,
  'id' | 'title' | 'description' | 'status' | 'priority' | 'dueDate' | 'calendarEventId'
>;

export type TaskSchedule = Pick<
  TaskCardProps,
  'id' | 'title' | 'description' | 'status' | 'priority' | 'dueDate'
>;

export type dueDateType = 'today' | 'tomorrow' | '3' | '7' | '30' | 'overdue' | 'none';

export type TaskSearchParams = Partial<Pick<Task, 'status' | 'priority'>> & {
  dueDate?: dueDateType;
  search?: string;
};
