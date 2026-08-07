'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const GoogleCalendarButton = () => {
  return (
    <div className="flex items-center gap-3">
      <Badge variant="secondary">Em breve</Badge>

      <Button disabled className="cursor-pointer">
        Vincular
      </Button>
    </div>
  );
};
