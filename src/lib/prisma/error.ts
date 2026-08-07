import { Prisma } from '@/generated/prisma/client';

export const prismaErrors = (error: unknown): string | null => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P1001':
        return 'Servidor inativo tente novamente mais tarde';

      case 'P1002':
        return 'Tempo Limite Excedio tente novamente mais tarde';

      case 'P2002':
        return 'Email ja existe';

      case 'P2025':
        return 'Usuário não encontrado.';

      default:
        return 'Erro ao acessar o banco de dados.';
    }
  }

  return null;
};
