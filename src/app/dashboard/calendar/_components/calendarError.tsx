import { Card, CardContent } from '@/components/ui/card';
import { RiCalendarCloseLine } from 'react-icons/ri';

export const CalendarError = ({ message }: { message?: string }) => {
  return (
    <Card className="min-h-[500px]">
      <CardContent className="flex min-h-[500px] items-center justify-center">
        <div className="flex max-w-md flex-col items-center gap-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <RiCalendarCloseLine className="size-8 text-destructive" />
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Não foi possível carregar o calendário</h2>

            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
