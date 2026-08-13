import type { TaskDialogProps } from '@/types/tasks';

type TaskPriority = TaskDialogProps['priority'];

export const getEventColorId = (priority: TaskPriority) => {
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
