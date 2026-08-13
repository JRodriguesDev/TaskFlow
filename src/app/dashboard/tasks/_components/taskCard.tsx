import { RiCalendarLine, RiFlagLine } from 'react-icons/ri';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TaskMenu } from './taskMenu';
import { TaskCardProps } from '@/types/tasks';

const priorityStyles = {
  LOW: {
    border: 'bg-emerald-500',
    glow: 'shadow-[0_0_18px_rgba(16,185,129,0.65)]',
    badge: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
    label: 'Baixa',
  },

  MEDIUM: {
    border: 'bg-yellow-500',
    glow: 'shadow-[0_0_18px_rgba(234,179,8,0.65)]',
    badge: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    label: 'Média',
  },

  HIGH: {
    border: 'bg-red-500',
    glow: 'shadow-[0_0_18px_rgba(239,68,68,0.7)]',
    badge: 'bg-red-500/10 text-red-500 border-red-500/30',
    label: 'Alta',
  },
};

export const TaskCard = ({ task }: { task: TaskCardProps }) => {
  const priorityStyle = priorityStyles[task.priority];

  return (
    <Card
      className="
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-xl
        border
        bg-card
        transition-all
        duration-300

        hover:border-primary/40
        hover:shadow-xl
        hover:shadow-primary/5
        hover:-translate-y-1
      "
    >
      <div
        className={`
          absolute
          left-0
          top-0
          h-full
          w-[3px]

          ${priorityStyle.border}
          ${priorityStyle.glow}

          opacity-70
          group-hover:opacity-100
        `}
      />

      <div className="space-y-5 p-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-semibold tracking-tight">{task.title}</h3>

            {task.description && (
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {task.description}
              </p>
            )}
          </div>

          {/* Status + Menu */}
          <TaskMenu id={task.id} status={task.status} task={task} />
        </div>

        {/* Footer */}
        <div className="flex items-start justify-between border-t pt-4">
          <Badge variant="outline" className={`gap-1 ${priorityStyle.badge}`}>
            <RiFlagLine className="size-3" />
            {priorityStyle.label}
          </Badge>

          <div className="space-y-1 text-right text-xs text-muted-foreground">
            {task.dueDate && (
              <div className="flex items-center justify-end gap-1">
                <RiCalendarLine className="size-3.5" />
                <span>{task.dueDate.toLocaleDateString('pt-BR')}</span>
              </div>
            )}

            <div>
              Criada:
              <span className="ml-1 font-medium text-foreground">
                {task.createdAt.toLocaleDateString('pt-BR')}
              </span>
            </div>

            {task.completedAt && (
              <div>
                Concluída:
                <span className="ml-1 font-medium text-emerald-500">
                  {task.completedAt.toLocaleDateString('pt-BR')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
