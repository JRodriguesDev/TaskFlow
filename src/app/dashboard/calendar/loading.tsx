import { RiCalendarLine, RiLoader4Line } from 'react-icons/ri';

const Loading = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Ícone + spinner */}
        <div className="relative flex items-center justify-center">
          {/* Glow */}
          <div className="absolute -inset-3 rounded-full bg-primary/10 blur-xl" />

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
            <RiCalendarLine className="size-8 text-primary" />
          </div>
        </div>

        {/* Texto */}
        <div className="space-y-1 text-center">
          <h2 className="text-lg font-semibold">Carregando seu calendário</h2>

          <p className="text-sm text-muted-foreground">
            Organizando suas tarefas e compromissos...
          </p>
        </div>

        {/* Pontinhos */}
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
