import { getExistingTask } from '@/services/DAL/task';
import { TaskSchema } from '@/lib/validations/task';
import { createEvent, deleteEvent, editEvent } from './calendar';

type Task = Omit<TaskSchema, 'syncCalendar' | 'id'>;

export const syncCalendarUpdate = async (taskId: string, syncCalendar: boolean, task: Task) => {
  const existingCalendarId = await getExistingTask(taskId);
  if (syncCalendar) {
    return !!existingCalendarId
      ? await editEvent({ ...task, eventId: existingCalendarId })
      : await createEvent(task);
  } else {
    return !!existingCalendarId ? await deleteEvent(existingCalendarId) : undefined;
  }
};

export const syncCalendarDelete = async (taskId: string) => {
  const existingCalendarId = await getExistingTask(taskId);
  if (existingCalendarId) deleteEvent(existingCalendarId);
};
