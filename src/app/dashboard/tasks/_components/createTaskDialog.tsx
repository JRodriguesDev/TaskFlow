'use client';

import { useState, useActionState } from 'react';
import { createTaskAction } from '../actions';
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
import { Spinner } from '@/components/ui/spinner';

import { AnimatePresence } from 'motion/react';
import { FormError } from '@/app/_components/motions';

import { Label } from '@/components/ui/label';

import { RiAddLine } from 'react-icons/ri';

export const CreateTaskDialog = () => {
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState('LOW');
  const [status, setStatus] = useState('TODO');
  const [state, formAction, pending] = useActionState(createTaskAction, formTaskState);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <RiAddLine className="mr-2 size-4" />
          Nova tarefa
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Nova tarefa</DialogTitle>

          <DialogDescription>Adicione uma nova tarefa à sua lista.</DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label>Título</Label>

            <Input placeholder="Ex.: Finalizar relatório" name="title" disabled={pending} />
            <AnimatePresence>
              {state.errors?.title && <FormError>{state.errors!.title}</FormError>}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>

            <Textarea
              rows={4}
              name="description"
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

              <Select disabled={pending} value={priority} onValueChange={setPriority}>
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

              <Select onValueChange={setStatus} value={status} disabled={pending}>
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
              disabled={pending}
            />
            <AnimatePresence>
              {state.errors?.dueDate && <FormError>{state.errors!.dueDate}</FormError>}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {state.message && <FormError>{state.message}</FormError>}
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
              {pending ? <Spinner /> : 'Criar tarefa'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
