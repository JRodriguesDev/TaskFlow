import { TaskDialog } from './_components/taskDialog';
import { TaskList } from './_components/taskList';
import { TaskFilters } from './_components/taskFilters';
import type { TaskSearchParams } from '@/types/tasks';
import { TaskSearchBar } from './_components/taskSearchBar';
import { Suspense } from 'react';
import { TaskCardSkeleton } from './_components/taskCardSkeleton';
import { Button } from '@/components/ui/button';
import { RiAddLine } from 'react-icons/ri';

const Page = async ({ searchParams }: { searchParams: Promise<TaskSearchParams> }) => {
  const params = await searchParams;

  return (
    <div className="h-screen overflow-hidden">
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
          <TaskSearchBar />
          <TaskDialog
            mode="create"
            trigger={
              <Button className={'cursor-pointer'}>
                <RiAddLine className="mr-2 size-4" />
                Nova tarefa
              </Button>
            }
          />
        </div>

        {/* Filtros */}
        <TaskFilters />

        {/* Área das tarefas com rolagem */}
        <div className="flex-1 overflow-y-auto rounded-xl border bg-card/30 p-4">
          <Suspense fallback={<TaskCardSkeleton />}>
            <TaskList params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
