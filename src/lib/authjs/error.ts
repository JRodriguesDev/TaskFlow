import { AuthError } from 'next-auth';

export const authErrors = (error: unknown): string | null => {
  if (error instanceof AuthError) {
    switch (error.type) {
      case 'CredentialsSignin':
        return 'Email ou senha inválidos.';

      case 'AccessDenied':
        return 'Acesso negado.';

      case 'OAuthAccountNotLinked':
        return 'Esta conta já está vinculada a outro método de login.';

      case 'CallbackRouteError':
        return 'Falha durante a autenticação.';

      default:
        return 'Erro ao autenticar.';
    }
  }

  return null;
};
