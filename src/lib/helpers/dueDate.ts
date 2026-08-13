import type { Prisma } from '@/generated/prisma/client';
import type { TaskDialogProps } from '@/types/tasks';
import type { dueDateType } from '@/types/tasks';

export const buildDueDateFilter = (dueDate?: dueDateType): Prisma.TaskWhereInput['dueDate'] => {
  const today = new Date();

  switch (dueDate) {
    case 'today': {
      const start = new Date(today);
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setHours(23, 59, 59, 999);

      return {
        gte: start,
        lte: end,
      };
    }

    case 'tomorrow': {
      const start = new Date(today);
      start.setDate(start.getDate() + 1);
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setHours(23, 59, 59, 999);

      return {
        gte: start,
        lte: end,
      };
    }

    case '3':
    case '7':
    case '30': {
      const start = new Date(today);
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setDate(end.getDate() + Number(dueDate));
      end.setHours(23, 59, 59, 999);

      return {
        gte: start,
        lte: end,
      };
    }

    case 'overdue': {
      return {
        lt: today,
      };
    }

    case 'none':
    default:
      return undefined;
  }
};

export const defaultDueDate = (date: TaskDialogProps['dueDate'] | null) => {
  let defaultDueDate = '';
  if (date) {
    const dateObj = new Date(date);
    const localDate = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000);
    defaultDueDate = localDate.toISOString().slice(0, 16);
  }
  return defaultDueDate;
};
