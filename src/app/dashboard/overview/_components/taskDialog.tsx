'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import {
  RiCalendarLine,
  RiFlag2Line,
  RiLoader4Line,
  RiCheckboxCircleLine,
  RiTimeLine,
} from 'react-icons/ri';

import { statusChangeAction } from '../actions';
import type { TaskDialogProps } from '@/types/tasks';
import { Spinner } from '@/components/ui/spinner';

const PRIORITY_STYLES = {
  LOW: { color: 'text-emerald-500', label: 'Baixa' },
  MEDIUM: { color: 'text-yellow-500', label: 'Média' },
  HIGH: { color: 'text-red-500', label: 'Alta' },
} as const;

type TaskCardStatus = TaskDialogProps['status'];

export const TaskDialog = ({
  children,
  task,
}: {
  children: React.ReactNode;
  task: TaskDialogProps;
}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleStatusChange = async (newStatus: TaskCardStatus) => {
    startTransition(async () => {
      const response = await statusChangeAction(task.id, newStatus);
      if (!response.success) {
        toast.error(`Error: ${response.message} ao Atualizar Tarefa`);
        return;
      }
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          role="button"
          tabIndex={0}
        >
          {children}
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
          <DialogDescription>
            Visualize os detalhes da tarefa e altere rapidamente seu status.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="space-y-6">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-foreground">Descrição</h4>
            <div className="rounded-md bg-muted/40 p-3.5">
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {task.description || 'Nenhuma descrição informada para esta tarefa.'}
              </p>
            </div>
          </div>

          <div className="grid gap-5 rounded-md border p-4 sm:grid-cols-2 bg-card">
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Prioridade
              </span>
              <div>
                <Badge
                  variant="outline"
                  className={`w-fit gap-1.5 ${PRIORITY_STYLES[task.priority].color}`}
                >
                  <RiFlag2Line size={14} />
                  {PRIORITY_STYLES[task.priority].label}
                </Badge>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Prazo
              </span>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <RiCalendarLine size={16} className="text-muted-foreground" />
                {task.dueDate
                  ? task.dueDate.toLocaleDateString('pt-BR', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })
                  : 'Sem prazo definido'}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <span className="text-sm font-semibold text-foreground">Status da Tarefa</span>

            <div className="flex items-center gap-3">
              <Select
                value={task.status}
                disabled={pending}
                onValueChange={(value) => handleStatusChange(value as TaskDialogProps['status'])}
              >
                <SelectTrigger className="w-[220px] cursor-pointer">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="TODO">
                    <div className="flex items-center gap-2">
                      <RiTimeLine className="text-muted-foreground" />
                      <span>A Fazer</span>
                    </div>
                  </SelectItem>

                  <SelectItem value="IN_PROGRESS">
                    <div className="flex items-center gap-2">
                      <RiLoader4Line className="text-blue-500" />
                      <span>Em andamento</span>
                    </div>
                  </SelectItem>

                  <SelectItem value="DONE">
                    <div className="flex items-center gap-2">
                      <RiCheckboxCircleLine className="text-emerald-500" />
                      <span>Concluída</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {pending && (
                <div className="flex animate-pulse items-center gap-2 text-sm text-muted-foreground">
                  <Spinner />
                  <span>Atualizando...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
