import { EmptyTasks } from './emptyTasks';
import { TaskCard } from './taskCard';
import type { TaskSearchParams } from '@/types/tasks';
import { listTasksAction } from '../actions';
import { ErrorTasks } from './errorTask';

export const TaskList = async ({ params }: { params: TaskSearchParams }) => {
  const data = await listTasksAction(params);
  if (!data.success) return <ErrorTasks message={data.message} />;
  const tasks = data.tasks!;
  if (tasks.length === 0) return <EmptyTasks />;

  return (
    <div className="space-y-4 p-6">
      {tasks.map((el, i) => (
        <TaskCard
          key={i}
          id={el.id}
          title={el.title}
          description={el.description}
          priority={el.priority}
          status={el.status}
          dueDate={el.dueDate}
          createdAt={el.createdAt}
          completedAt={el.completedAt}
        />
      ))}
    </div>
  );
};
