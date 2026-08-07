import { RiErrorWarningLine } from 'react-icons/ri';

export const OverviewError = ({ message }: { message?: string }) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
      <RiErrorWarningLine className="size-5 text-destructive" />

      <div>
        <p className="font-medium text-destructive">Não foi possível carregar os dados.</p>

        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
};
