import { EmptyTasks } from './emptyTasks';
import { TaskCard } from './taskCard';
import type { TaskSearchParams } from '@/types/tasks';
import { listTasksAction } from '../actions';
import { ErrorTasks } from './errorTask';
import { auth } from '@/lib/authjs/authjs';
import { redirect } from 'next/navigation';

export const TaskList = async ({ params }: { params: TaskSearchParams }) => {
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/login');
  const userId = session.user.id;
  const data = await listTasksAction(userId, params);
  if (!data.success) return <ErrorTasks message={data.message} />;
  const tasks = data.tasks!;
  if (tasks.length === 0) return <EmptyTasks />;

  return (
    <div className="space-y-4 p-6">
      {tasks.map((el, i) => (
        <TaskCard key={i} task={el} />
      ))}
    </div>
  );
};
