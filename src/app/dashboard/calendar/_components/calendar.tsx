'use client';

import { ChevronLeft, ChevronRight, Clock3 } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getCalendarDays } from '@/lib/helpers/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDateKey, weekDays } from '@/lib/helpers/calendar';
import { RiFlag2Line } from 'react-icons/ri';
import { priorityStyles, statusStyles } from '@/states/calendar';
import { CalendarTask } from '@/types/calendar';

const tasks = [];

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 7, 1));

  const calendarDays = useMemo(() => getCalendarDays(currentMonth), [currentMonth]);

  const tasksByDate = useMemo(() => {
    const grouped = new Map<string, CalendarTask[]>();

    for (const task of tasks) {
      const existing = grouped.get(task.dueDate) ?? [];

      grouped.set(task.dueDate, [...existing, task]);
    }

    return grouped;
  }, []);

  const goToPreviousMonth = () => {
    setCurrentMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const goToNextMonth = () => {
    setCurrentMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1));
  };

  const monthLabel = currentMonth.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="capitalize">{monthLabel}</CardTitle>

          <div className="flex items-center gap-1">
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={goToPreviousMonth}
              aria-label="Mês anterior"
            >
              <ChevronLeft />
            </Button>
            <Button variant="outline" onClick={goToToday}>
              Atual
            </Button>
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={goToNextMonth}
              aria-label="Próximo mês"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Week days */}
        <div className="grid grid-cols-7 border-b">
          {weekDays.map((day) => (
            <div
              key={day}
              className="flex h-10 items-center justify-center text-xs font-semibold text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day) => {
            const dateKey = getDateKey(day);
            const dayTasks = tasksByDate.get(dateKey) ?? [];

            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();

            const today = new Date();

            const isToday =
              day.getDate() === today.getDate() &&
              day.getMonth() === today.getMonth() &&
              day.getFullYear() === today.getFullYear();

            return (
              <Popover key={dateKey}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={`
                        group relative min-h-16 border-b border-r p-2 text-left
                        transition-colors hover:bg-muted/50
                        ${!isCurrentMonth ? 'bg-muted/20 text-muted-foreground' : ''}
                      `}
                  >
                    {/* Day number */}
                    <span
                      className={`
                          flex size-7 items-center justify-center rounded-full
                          text-sm
                          ${isToday ? 'bg-primary font-bold text-primary-foreground' : ''}
                        `}
                    >
                      {day.getDate()}
                    </span>

                    {/* Task dots */}
                    {dayTasks.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {dayTasks.map((task) => (
                          <span
                            key={task.id}
                            className={`
                                size-2 rounded-full
                                ${priorityStyles[task.priority].dot}
                              `}
                            title={task.title}
                          />
                        ))}
                      </div>
                    )}

                    {/* Number of tasks */}
                    {dayTasks.length > 0 && (
                      <span className="absolute bottom-2 right-2 text-[10px] text-muted-foreground">
                        {dayTasks.length}
                      </span>
                    )}
                  </button>
                </PopoverTrigger>

                {dayTasks.length > 0 && (
                  <PopoverContent className="w-80" align="center">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold">
                          {day.toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                          })}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {dayTasks.length} {dayTasks.length === 1 ? 'tarefa' : 'tarefas'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {dayTasks.map((task) => {
                          const StatusIcon = statusStyles[task.status].icon;

                          return (
                            <div key={task.id} className="rounded-lg border p-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium">{task.title}</p>

                                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                    <StatusIcon className="size-3.5" />

                                    {statusStyles[task.status].label}
                                  </div>
                                </div>

                                <RiFlag2Line
                                  className={`
                                      shrink-0
                                      ${priorityStyles[task.priority].text}
                                    `}
                                />
                              </div>

                              <div className="mt-3 flex items-center justify-between">
                                <Badge
                                  variant="outline"
                                  className={priorityStyles[task.priority].text}
                                >
                                  {priorityStyles[task.priority].label}
                                </Badge>

                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock3 className="size-3.5" />
                                  {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </PopoverContent>
                )}
              </Popover>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
