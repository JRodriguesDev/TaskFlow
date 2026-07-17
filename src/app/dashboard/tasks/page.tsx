import { RiAddLine, RiCalendarLine, RiFlagLine, RiSearchLine, RiTaskLine } from 'react-icons/ri';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { FadeIn } from '@/app/_components/motions';

const Page = () => {
  return (
    <div className="h-screen overflow-hidden">
      <FadeIn>
        <div className="mx-auto flex h-screen max-w-6xl flex-col gap-8 p-8">
          {/* Header */}
          <div className="space-y-2 shrink-0">
            <h1 className="text-3xl font-bold">Tarefas</h1>

            <p className="text-sm text-muted-foreground">
              Organize suas tarefas e acompanhe seu progresso.
            </p>
          </div>

          {/* Barra Superior */}
          <div className="flex shrink-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <RiSearchLine className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input placeholder="Pesquisar tarefas..." className="pl-9" />
            </div>

            <Button className="cursor-pointer">
              <RiAddLine className="mr-2 size-4" />
              Nova tarefa
            </Button>
          </div>

          {/* Filtros */}
          <div className="flex shrink-0 flex-wrap gap-3">
            {/* Status */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  <RiTaskLine className="mr-2 size-4" />
                  Status
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start">
                <DropdownMenuItem className="cursor-pointer">Todos</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">A Fazer</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Em andamento</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Concluído</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Prioridade */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  <RiFlagLine className="mr-2 size-4" />
                  Prioridade
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start">
                <DropdownMenuItem className="cursor-pointer">Todas</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Alta</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Média</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Baixa</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Prazo */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  <RiCalendarLine className="mr-2 size-4" />
                  Prazo
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start">
                <DropdownMenuItem className="cursor-pointer">Todos</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Hoje</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Amanhã</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Próximos 3 dias</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Próximos 7 dias</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Próximos 30 dias</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Atrasadas</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Sem prazo</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Área das tarefas com rolagem */}
          <Card className="flex min-h-0 flex-1 flex-col border-dashed">
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex min-h-full items-center justify-center">
                <div className="space-y-3 text-center">
                  <RiTaskLine className="mx-auto size-12 text-muted-foreground" />

                  <div>
                    <h2 className="font-semibold">Nenhuma tarefa encontrada</h2>

                    <p className="text-sm text-muted-foreground">
                      Crie sua primeira tarefa para começar.
                    </p>
                  </div>

                  <Button className="cursor-pointer">
                    <RiAddLine className="mr-2 size-4" />
                    Nova tarefa
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
};

export default Page;
