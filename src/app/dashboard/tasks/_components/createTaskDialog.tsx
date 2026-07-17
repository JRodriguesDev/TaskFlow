'use client';

import { useState } from 'react';

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

import { Label } from '@/components/ui/label';

import { RiAddLine } from 'react-icons/ri';

export const CreateTaskDialog = () => {
  const [open, setOpen] = useState(false);

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

        <form className="space-y-5">
          <div className="space-y-2">
            <Label>Título</Label>

            <Input placeholder="Ex.: Finalizar relatório" />
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>

            <Textarea rows={4} placeholder="Descreva a tarefa..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Prioridade</Label>

              <Select>
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
            </div>

            <div className="space-y-2">
              <Label>Status</Label>

              <Select defaultValue="TODO">
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
            </div>
          </div>

          <div className="space-y-2">
            <Label>Prazo</Label>

            <Input type="datetime-local" className="cursor-text" />
          </div>

          <DialogFooter>
            <Button
              className="cursor-pointer"
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>

            <Button className="cursor-pointer" type="submit">
              Criar tarefa
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
