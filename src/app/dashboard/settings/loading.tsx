import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';

const Loading = () => {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8 p-8">
      <div className="flex flex-col items-center gap-6">
        <Spinner className="size-6" />

        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-20 w-20 rounded-full" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>

      <Skeleton className="h-44 rounded-xl" />
      <Skeleton className="h-44 rounded-xl" />
    </div>
  );
};

export default Loading;
