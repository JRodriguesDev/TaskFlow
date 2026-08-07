import { Badge } from '@/components/ui/badge';

import { RiCheckboxCircleLine, RiLoader4Line, RiTimeLine } from 'react-icons/ri';

import type { TaskSchedule } from '@/types/tasks';

type TaskScheduleStatus = Pick<TaskSchedule, 'priority' | 'status'>;

export const Task = ({
  title,
  status,
  overDue,
  priority,
}: {
  title: string;
  status: TaskScheduleStatus['status'];
  priority: TaskScheduleStatus['priority'];
  overDue?: boolean;
}) => {
  const priorityBorder = {
    LOW: 'border-l-emerald-500',
    MEDIUM: 'border-l-yellow-500',
    HIGH: 'border-l-red-500',
  };

  return (
    <div
      className={`flex items-center justify-between rounded-lg border border-l-4 p-3 ${priorityBorder[priority]}`}
    >
      <div className="flex items-center gap-3">
        {status === 'DONE' && <RiCheckboxCircleLine className="text-lg text-emerald-500" />}

        {status === 'IN_PROGRESS' && (
          <RiLoader4Line className="animate-spin text-lg text-blue-500" />
        )}

        {status === 'TODO' && <RiTimeLine className="text-muted-foreground text-lg" />}

        <span className="font-medium">{title}</span>
      </div>

      <div className="flex items-center gap-2">
        {overDue && <Badge variant="destructive">Atrasada</Badge>}

        {status === 'IN_PROGRESS' && <Badge variant="secondary">Em andamento</Badge>}

        {status === 'DONE' && <Badge className="bg-emerald-600">Concluída</Badge>}
      </div>
    </div>
  );
};
