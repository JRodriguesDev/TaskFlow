import { googleCalendar } from '@/lib/calendar/calendar';
import { getEventColorId } from '@/lib/calendar/eventColor';
import type { CalendarTaskApi } from '@/types/calendar';
import { calendarApiErrors } from '@/lib/calendar/error';

export const createEvent = async (task: CalendarTaskApi) => {
  try {
    const calendar = await googleCalendar();
    const startTime = task.dueDate;
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: task.title,
        description: task.description ?? null,
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
    return response.data.id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(calendarApiErrors(error.status));
  }
};

export const editEvent = async (task: CalendarTaskApi) => {
  try {
    const calendar = await googleCalendar();
    const startTime = task.dueDate;
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
    const response = await calendar.events.patch({
      calendarId: 'primary',
      eventId: task.eventId,
      requestBody: {
        summary: task.title,
        description: task.description ?? null,
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
    return response.data.id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(calendarApiErrors(error.status));
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const calendar = await googleCalendar();
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(calendarApiErrors(error.status));
  }
  return null;
};
