'use client';

import {
  RiLoader4Line,
  RiTimeLine,
  RiMore2Fill,
  RiEditLine,
  RiDeleteBin6Line,
  RiCheckLine,
  RiCheckboxCircleLine,
  RiRefreshLine,
} from 'react-icons/ri';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useOptimistic, startTransition } from 'react';
import { statusChangeAction, deleteTaskAction } from '../actions';
import type { TaskDialogProps } from '@/types/tasks';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { TaskDialog } from './taskDialog';

const statusBadge = {
  TODO: (
    <Badge variant="secondary">
      <RiTimeLine className="mr-1 size-3" />A Fazer
    </Badge>
  ),

  IN_PROGRESS: (
    <Badge>
      <RiLoader4Line className="mr-1 size-3 animate-spin" />
      Em andamento
    </Badge>
  ),

  DONE: (
    <Badge className="bg-emerald-600 hover:bg-emerald-600">
      <RiCheckboxCircleLine className="mr-1 size-3" />
      Concluída
    </Badge>
  ),
};

export const TaskMenu = ({
  id,
  status,
  task,
}: {
  id: string;
  status: TaskDialogProps['status'];
  task: TaskDialogProps;
}) => {
  const router = useRouter();
  const [statusOpmistic, setStatusOptmistic] = useOptimistic(
    status,
    (oldState, newState: TaskDialogProps['status']) => newState
  );
  const handleStatusChange = async (newStatus: TaskDialogProps['status']) => {
    startTransition(() => {
      setStatusOptmistic(newStatus);
    });
    const response = await statusChangeAction(id, newStatus);
    if (!response.success) toast.error(`Error: ${response.message} ao Atualizar Tarefa`);
    router.refresh();
  };
  const handleDelete = async () => {
    const task = await deleteTaskAction(id);
    if (!task.success) toast.error(`Error: ${task.message} ao Deleta Tarefa`);
    router.refresh();
  };
  return (
    <div className="flex flex-col items-end gap-2">
      {statusBadge[statusOpmistic]}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="
                    h-8
                    w-8
                    cursor-pointer

                    opacity-100
                    md:opacity-0
                    md:group-hover:opacity-100

                    transition-opacity
                  "
          >
            <RiMore2Fill className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <TaskDialog
            mode="edit"
            task={task}
            trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                <RiEditLine className="mr-2 size-4" />
                Editar
              </DropdownMenuItem>
            }
          />

          {statusOpmistic === 'TODO' && (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleStatusChange('IN_PROGRESS')}
              >
                <RiLoader4Line className="mr-2 size-4" />
                Iniciar
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleStatusChange('DONE')}
              >
                <RiCheckLine className="mr-2 size-4" />
                Concluir
              </DropdownMenuItem>
            </>
          )}

          {statusOpmistic === 'IN_PROGRESS' && (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleStatusChange('TODO')}
              >
                <RiTimeLine className="mr-2 size-4" />
                Voltar para A Fazer
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleStatusChange('DONE')}
              >
                <RiCheckLine className="mr-2 size-4" />
                Concluir
              </DropdownMenuItem>
            </>
          )}

          {statusOpmistic === 'DONE' && (
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleStatusChange('TODO')}>
              <RiRefreshLine className="mr-2 size-4" />
              Reabrir tarefa
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:text-destructive"
            onClick={() => handleDelete()}
          >
            <RiDeleteBin6Line className="mr-2 size-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
