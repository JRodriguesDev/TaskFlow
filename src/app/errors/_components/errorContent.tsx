import Link from 'next/link';
import { Button } from '@/components/ui/button';

const errorMessages: Record<string, string> = {
  EmailMismatch: 'A conta Google selecionada possui um e-mail diferente da sua conta atual.',
  Configuration: 'Há um problema na configuração do servidor de autenticação.',
  AccessDenied: 'Você não tem permissão para acessar este recurso.',
  Verification: 'O token de verificação expirou ou já foi utilizado.',
  OAuthSignin: 'Erro ao tentar iniciar a autenticação com o provedor.',
  OAuthCallback: 'Erro ao processar a resposta do provedor de autenticação.',
  OAuthCreateAccount: 'Não foi possível criar a conta com o provedor selecionado.',
  EmailCreateAccount: 'Não foi possível criar a conta associada a este e-mail.',
  Callback: 'Erro no callback de autenticação.',
  OAuthAccountNotLinked: 'Este e-mail já está associado a outro método de login.',
  EmailSignin: 'Falha ao enviar o e-mail de login.',
  CredentialsSignin: 'Credenciais inválidas. Verifique seus dados de acesso.',
  SessionRequired: 'Sua sessão expirou. Faça login novamente para continuar.',
};

export const ErrorContent = async ({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) => {
  const { error } = await searchParams;

  const message =
    error && errorMessages[error]
      ? errorMessages[error]
      : 'Ocorreu um erro interno na autenticação.';

  return (
    <div className="w-full max-w-md space-y-6 text-center">
      <h1 className="text-2xl font-bold">Ocorreu um erro</h1>

      <p className="text-muted-foreground">{message}</p>

      <Button asChild>
        <Link href="/dashboard/settings/profile">Voltar</Link>
      </Button>
    </div>
  );
};
