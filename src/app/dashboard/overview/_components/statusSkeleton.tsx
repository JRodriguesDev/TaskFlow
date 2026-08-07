import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const StatusSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-12" />
            </div>

            <Skeleton className="h-8 w-8 rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
