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

export type CalendarTaskApi = {
  eventId?: string;
  title: string;
  description: string | null;
  dueDate: Date;
  priority: CalendarTask['priority'];
};

export type HelperReturn = {
  action: 'CREATE' | 'EDIT' | 'DELETE' | 'NONE';
  calendarId?: string;
};
