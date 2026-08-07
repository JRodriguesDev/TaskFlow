import { TaskDialog } from './taskDialog';
import { RiTaskLine } from 'react-icons/ri';

export const EmptyTasks = () => {
  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="space-y-3 text-center">
        <RiTaskLine className="mx-auto size-12 text-muted-foreground" />
        <div>
          <h2 className="font-semibold">Nenhuma tarefa encontrada</h2>
          <p className="text-sm text-muted-foreground">Crie sua primeira tarefa para começar.</p>
        </div>
        <TaskDialog mode="create" />
      </div>
    </div>
  );
};
