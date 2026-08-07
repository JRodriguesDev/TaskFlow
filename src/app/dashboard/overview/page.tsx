import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Progress } from '@/components/ui/progress';

import { todayProgressAction } from './actions';
import { OverviewError } from './_components/overviewError';
import { TaskSummary } from './_components/taskSummary';
import { StatusSkeleton } from './_components/statusSkeleton';
import { Suspense } from 'react';
import { TaskSchedule } from './_components/taskSchedule';
import { TaskScheduleLoading } from './_components/taskScheduleLoading';
import { auth } from '@/lib/authjs/authjs';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/login');
  const userId = session.user.id;
  const data = await todayProgressAction(userId);

  return (
    <main className="space-y-8 p-8">
      <section>
        <h1 className="text-3xl font-bold">Bom dia</h1>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Progresso de Hoje</CardTitle>
        </CardHeader>

        <CardContent>
          {!data.success ? (
            <OverviewError message={data.message} />
          ) : data.progress!.total === 0 ? (
            <div className="py-4 text-center text-muted-foreground text-base">
              <p>Nenhuma tarefa agendada para hoje. Aproveite o dia ou crie novas tarefas!</p>
            </div>
          ) : (
            <>
              <Progress value={data.progress!.percentage} />

              <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                <span>
                  {data.progress!.completed} de {data.progress!.total} tarefas concluídas
                </span>

                <span>{data.progress!.percentage}%</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Suspense fallback={<TaskScheduleLoading />}>
        <TaskSchedule userId={userId} />
      </Suspense>

      <Suspense fallback={<StatusSkeleton />}>
        <TaskSummary userId={userId} />
      </Suspense>
    </main>
  );
};

export default Page;
