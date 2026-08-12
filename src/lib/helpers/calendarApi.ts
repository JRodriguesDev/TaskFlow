import type { TaskDialogProps } from '@/types/tasks';
import { getExistingTask } from '@/services/DAL/task';
import type { HelperReturn } from '@/types/calendar';

type TaskPriority = TaskDialogProps['priority'];

export const getEventColorId = (priority: TaskPriority) => {
  if (status === 'DONE') return '10';
  switch (priority) {
    case 'HIGH':
      return '11';
    case 'MEDIUM':
      return '5';
    case 'LOW':
      return '10';
    default:
      return '10 ';
  }
};

export const updateTaskHelper = async (
  taskId: string,
  syncCalendar: boolean
): Promise<HelperReturn> => {
  const existing = await getExistingTask(taskId);
  if (syncCalendar) {
    return { action: !!existing ? 'EDIT' : 'CREATE', calendarId: existing ?? undefined };
  }
  return { action: !!existing ? 'DELETE' : 'NONE', calendarId: existing ?? undefined };
};
