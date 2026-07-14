import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import type { updateUserInteface } from '@/types/user';
import { cacheTag } from 'next/cache';

export const updateUser = async (id: string, data: updateUserInteface) => {
  const user = await prisma.user.update({
    where: { id: id },
    data,
    select: { id: true, name: true },
  });

  return user;
};

export const userHasAccount = async (userId: string) => {
  const user = await prisma.account.findFirst({
    where: { userId: userId },
    select: { provider: true },
  });

  return !!user;
};

export const userHasPassword = async (userId: string) => {
  'use cache';
  cacheTag(`userHasPassword-${userId}`);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });

  return !!user?.password;
};
