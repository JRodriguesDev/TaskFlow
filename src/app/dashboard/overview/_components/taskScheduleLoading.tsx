import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { RiAlarmWarningLine, RiCalendarLine, RiLoader4Line } from 'react-icons/ri';

const LoadingCard = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>

    <CardContent className="flex h-20 flex-col items-center justify-center gap-4 text-muted-foreground">
      <RiLoader4Line className="size-8 animate-spin text-primary" />

      <div className="space-y-1 text-center">
        <p className="font-medium">Carregando tarefas...</p>

        <p className="text-xs text-muted-foreground">Buscando informações.</p>
      </div>
    </CardContent>
  </Card>
);

export const TaskScheduleLoading = () => {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        <LoadingCard title="Hoje" icon={<RiCalendarLine />} />

        <LoadingCard title="Amanhã" icon={<RiCalendarLine />} />
      </div>

      <LoadingCard title="Atrasadas" icon={<RiAlarmWarningLine className="text-red-500" />} />
    </>
  );
};
