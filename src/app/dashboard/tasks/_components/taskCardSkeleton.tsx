import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const TaskCardSkeleton = () => {
  return (
    <div className="space-y-4 p-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card
          key={i}
          className="
        relative
        overflow-hidden
        rounded-xl
        border
        bg-card
      "
        >
          {/* Barra lateral */}
          <div className="absolute left-0 top-0 h-full w-[3px] bg-muted" />

          <div className="space-y-5 p-6">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-56" />

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-6 w-28 rounded-full" />

                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-start justify-between border-t pt-4">
              <Skeleton className="h-6 w-24 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="ml-auto h-3 w-28" />
                <Skeleton className="ml-auto h-3 w-32" />
                <Skeleton className="ml-auto h-3 w-36" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
