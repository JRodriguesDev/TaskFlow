import type { Task } from '@/generated/prisma/client';

export type CalendarTask = Pick<
  Task,
  'id' | 'title' | 'status' | 'priority' | 'calendarEventId' | 'dueDate'
>;

export type CalendarTaskApi = {
  eventId?: string;
  title: string;
  description: string | null;
  dueDate: Date;
  priority: CalendarTask['priority'];
};

export type HelperReturna = {
  action: 'CREATE' | 'EDIT' | 'DELETE' | 'NONE';
  calendarId?: string;
};
