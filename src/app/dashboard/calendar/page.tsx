import { CalendarDays } from 'lucide-react';
import { priorityStyles } from '@/states/calendar';
import { Calendar } from './_components/calendar';

const Page = () => {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <CalendarDays className="size-6" />
            Calendário
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Visualize suas tarefas organizadas por data.
          </p>
        </div>
      </div>

      {/* Calendar */}
      <Calendar />

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
        <span className="font-medium">Prioridade:</span>

        {Object.entries(priorityStyles).map(([priority, style]) => (
          <div key={priority} className="flex items-center gap-2">
            <span className={`size-2 rounded-full ${style.dot}`} />

            <span>{style.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
