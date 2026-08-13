'use client';

import { useState, useActionState, useEffect } from 'react';
import { createTaskAction, taskUpdateAction } from '../actions';
import { formTaskState } from '@/states/formState';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { AnimatePresence } from 'motion/react';
import { FormError } from '@/app/_components/motions';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import type { TaskCardProps, TaskDialogProps } from '@/types/tasks';
import { defaultDueDate } from '@/lib/helpers/dueDate';

type TaskDialogMode = 'create' | 'edit';

const dialogConfig = {
  create: {
    title: 'Nova tarefa',
    description: 'Adicione uma nova tarefa à sua lista.',
    submit: 'Criar tarefa',
  },
  edit: {
    title: 'Editar tarefa',
    description: 'Edite uma tarefa da sua lista.',
    submit: 'Salvar alterações',
  },
};

export const TaskDialog = ({
  mode,
  task,
  trigger,
}: {
  mode: TaskDialogMode;
  task?: TaskDialogProps;
  trigger: React.ReactNode;
}) => {
  const taskAction = mode === 'create' ? createTaskAction : taskUpdateAction;
  const config = dialogConfig[mode];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState(task?.priority ?? 'LOW');
  const [status, setStatus] = useState(task?.status ?? 'TODO');
  const [syncCalendar, setSyncCalendar] = useState(!!task?.calendarEventId);
  const [state, formAction, pending] = useActionState(taskAction, formTaskState);
  const dueDate = defaultDueDate(task?.dueDate ? task.dueDate : null);

  useEffect(() => {
    if (state.success) {
      toast.success('Sucesso');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>

          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label>Título</Label>
            {mode === 'edit' && <input type="hidden" name="id" value={task?.id} />}
            <Input
              defaultValue={task?.title ?? ''}
              placeholder="Ex.: Finalizar relatório"
              name="title"
              disabled={pending}
            />
            <AnimatePresence>
              {state.errors?.title && <FormError>{state.errors!.title}</FormError>}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>

            <Textarea
              rows={4}
              name="description"
              defaultValue={task?.description ?? ''}
              placeholder="Descreva a tarefa..."
              disabled={pending}
            />
            <AnimatePresence>
              {state.errors?.description && <FormError>{state.errors!.description}</FormError>}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Prioridade</Label>

              <Select
                disabled={pending}
                value={priority}
                onValueChange={(value) => setPriority(value as TaskCardProps['priority'])}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="LOW" className="cursor-pointer">
                    Baixa
                  </SelectItem>

                  <SelectItem value="MEDIUM" className="cursor-pointer">
                    Média
                  </SelectItem>

                  <SelectItem value="HIGH" className="cursor-pointer">
                    Alta
                  </SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" name="priority" value={priority} />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>

              <Select
                onValueChange={(value) => setStatus(value as TaskCardProps['status'])}
                value={status}
                disabled={pending}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="TODO" className="cursor-pointer">
                    A fazer
                  </SelectItem>

                  <SelectItem value="IN_PROGRESS" className="cursor-pointer">
                    Em andamento
                  </SelectItem>

                  <SelectItem value="DONE" className="cursor-pointer">
                    Concluída
                  </SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" name="status" value={status} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Prazo</Label>

            <Input
              type="datetime-local"
              name="dueDate"
              className="cursor-text"
              defaultValue={dueDate}
              disabled={pending}
            />
            <AnimatePresence>
              {state.errors?.dueDate && <FormError>{state.errors!.dueDate}</FormError>}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="syncCalendar">Adicionar ao Google Calendar</Label>

              <p className="text-xs text-muted-foreground">
                Sincronizar esta tarefa com seu calendário.
              </p>
            </div>

            <Switch
              id="syncCalendar"
              disabled={pending}
              checked={syncCalendar}
              onCheckedChange={setSyncCalendar}
              defaultChecked={!!task?.calendarEventId}
            />
            <input type="hidden" name="syncCalendar" value={syncCalendar ? 'true' : 'false'} />
          </div>

          <AnimatePresence>
            {!state.success && <FormError>{state.message}</FormError>}
          </AnimatePresence>

          <DialogFooter>
            <Button
              className="cursor-pointer"
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>

            <Button className="cursor-pointer" type="submit" disabled={pending}>
              {pending ? <Spinner /> : config.submit}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
