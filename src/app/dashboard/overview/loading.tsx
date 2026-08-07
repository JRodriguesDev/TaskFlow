import { RiLoader4Line, RiTaskLine } from 'react-icons/ri';

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-primary/15 blur-2xl" />

          {/* Spinner externo */}
          <RiLoader4Line
            className="
              absolute
              -inset-3
              size-[104px]
              animate-spin
              text-primary/40
            "
          />

          {/* Círculo */}
          <div
            className="
              relative
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              border
              bg-card
              shadow-lg
            "
          >
            <RiTaskLine className="size-8 text-primary" />
          </div>
        </div>

        <div className="space-y-1 text-center">
          <h2 className="text-lg font-semibold">Carregando seu workspace</h2>

          <p className="text-sm text-muted-foreground">Organizando suas tarefas...</p>
        </div>

        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
