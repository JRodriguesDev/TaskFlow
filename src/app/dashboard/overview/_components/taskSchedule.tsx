import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from './task';
import { RiCalendarLine, RiAlarmWarningLine } from 'react-icons/ri';
import { taskScheduleAction } from '../actions';
import { OverviewError } from './overviewError';
import { TaskDialog } from './taskDialog';

export const TaskSchedule = async ({ userId }: { userId: string }) => {
  const data = await taskScheduleAction(userId);

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RiCalendarLine />
              Hoje
            </CardTitle>
          </CardHeader>

          <CardContent className="max-h-45 space-y-4 overflow-y-auto">
            {!data.success ? (
              <OverviewError message={data.message} />
            ) : data.tasks!.todayTasks.length === 0 ? (
              <div className="py-4 text-center text-muted-foreground text-base">
                <p>Nenhuma tarefa agendada para hoje.</p>
              </div>
            ) : (
              data.tasks!.todayTasks.map((task, i) => (
                <TaskDialog key={i} task={task}>
                  <Task key={i} title={task.title} priority={task.priority} status={task.status} />
                </TaskDialog>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RiCalendarLine />
              Amanhã
            </CardTitle>
          </CardHeader>

          <CardContent className="max-h-45 space-y-4 overflow-y-auto">
            {!data.success ? (
              <OverviewError message={data.message} />
            ) : data.tasks!.tomorrowTasks.length === 0 ? (
              <div className="py-4 text-center text-muted-foreground text-base">
                <p>Nenhuma tarefa agendada para Amanhã.</p>
              </div>
            ) : (
              data.tasks!.tomorrowTasks.map((task, i) => (
                <TaskDialog key={i} task={task}>
                  <Task key={i} title={task.title} priority={task.priority} status={task.status} />
                </TaskDialog>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RiAlarmWarningLine className="text-red-500" />
            Atrasadas
          </CardTitle>
        </CardHeader>

        <CardContent className="max-h-45 space-y-4 overflow-y-auto">
          {!data.success ? (
            <OverviewError message={data.message} />
          ) : data.tasks!.overdueTasks.length === 0 ? (
            <div className="py-4 text-center text-muted-foreground text-base">
              <p>Nenhuma tarefa Atrasada.</p>
            </div>
          ) : (
            data.tasks!.overdueTasks.map((task, i) => (
              <TaskDialog key={i} task={task}>
                <Task
                  key={i}
                  title={task.title}
                  priority={task.priority}
                  status={task.status}
                  overDue={true}
                />
              </TaskDialog>
            ))
          )}
        </CardContent>
      </Card>
    </>
  );
};
