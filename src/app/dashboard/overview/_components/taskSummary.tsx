import { Status } from './status';
import { taskSummaryAction } from '../actions';
import { OverviewError } from './overviewError';

export const TaskSummary = async ({ userId }: { userId: string }) => {
  const data = await taskSummaryAction(userId);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {!data.success ? (
        <OverviewError message={data.message} />
      ) : (
        <>
          <Status title="Total" value={String(data.summaryTasks!.total)} href="/dashboard/tasks" />

          <Status
            title="Concluídas"
            value={String(data.summaryTasks!.done)}
            href="/dashboard/tasks?status=DONE"
          />

          <Status
            title="Em andamento"
            value={String(data.summaryTasks!.inProgress)}
            href="/dashboard/tasks?status=IN_PROGRESS"
          />

          <Status
            title="A Fazer"
            value={String(data.summaryTasks!.todo)}
            href="/dashboard/tasks?status=TODO"
          />
        </>
      )}
    </div>
  );
};
