import { googleCalendar } from '@/lib/calendar/calendar';
import { getEventColorId } from '@/lib/helpers/calendarApi';
import type { CalendarTaskApi } from '@/types/calendar';

export const createEvent = async (task: CalendarTaskApi) => {
  const calendar = await googleCalendar();
  const startTime = task.dueDate;
  const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
  const response = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: {
      summary: task.title,
      description: task.description ?? undefined,
      colorId: getEventColorId(task.priority),
      start: {
        dateTime: startTime.toISOString(),
      },
      end: {
        dateTime: endTime.toISOString(),
      },
      reminders: {
        useDefault: false,
        overrides: [{ method: 'popup', minutes: 30 }],
      },
    },
  });
  if (!response.data?.id) throw new Error('GOOGLE_CALENDAR_NO_ID');

  return response.data.id;
};

export const editEvent = async (task: CalendarTaskApi) => {
  const calendar = await googleCalendar();
  const startTime = task.dueDate;
  const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
  await calendar.events.patch({
    calendarId: 'primary',
    eventId: task.eventId,
    requestBody: {
      summary: task.title,
      description: task.description ?? undefined,
      colorId: getEventColorId(task.priority),
      start: {
        dateTime: startTime.toISOString(),
      },
      end: {
        dateTime: endTime.toISOString(),
      },
      reminders: {
        useDefault: false,
        overrides: [{ method: 'popup', minutes: 30 }],
      },
    },
  });
};

export const deleteEvent = async (eventId: string) => {
  const calendar = await googleCalendar();
  await calendar.events.delete({
    calendarId: 'primary',
    eventId: eventId,
  });
};
