'use client';

import { RiCalendarLine, RiFlagLine, RiTaskLine } from 'react-icons/ri';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { startTransition } from 'react';

export const TaskFilters = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.replace(`${pathName}?${params.toString()}`);
    });
  };

  return (
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
          <DropdownMenuItem className="cursor-pointer" onClick={() => updateFilter('status')}>
            Todos
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => updateFilter('status', 'TODO')}
          >
            A Fazer
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => updateFilter('status', 'IN_PROGRESS')}
          >
            Em andamento
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => updateFilter('status', 'DONE')}
          >
            Concluído
          </DropdownMenuItem>
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
          <DropdownMenuItem className="cursor-pointer" onClick={() => updateFilter('priority')}>
            Todas
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => updateFilter('priority', 'HIGH')}
          >
            Alta
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => updateFilter('priority', 'MEDIUM')}
          >
            Média
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => updateFilter('priority', 'LOW')}
          >
            Baixa
          </DropdownMenuItem>
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
          <DropdownMenuItem className="cursor-pointer" onClick={() => updateFilter('dueDate')}>
            Todos
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => updateFilter('dueDate', 'today')}
          >
            Hoje
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => updateFilter('dueDate', 'tomorrow')}
          >
            Amanhã
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => updateFilter('dueDate', '3')}>
            Próximos 3 dias
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => updateFilter('dueDate', '7')}>
            Próximos 7 dias
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => updateFilter('dueDate', '30')}
          >
            Próximos 30 dias
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => updateFilter('dueDate', 'overdue')}
          >
            Atrasadas
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => updateFilter('dueDate', 'none')}
          >
            Sem prazo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
