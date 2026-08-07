import { RiTaskLine } from 'react-icons/ri';

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/15 blur-xl" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-border bg-card shadow-lg">
            <RiTaskLine className="absolute size-8 text-primary" />
          </div>
        </div>

        <div className="space-y-1 text-center">
          <h2 className="text-lg font-semibold">Carregando suas tarefas</h2>

          <p className="text-sm text-muted-foreground">Preparando seu workspace...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
