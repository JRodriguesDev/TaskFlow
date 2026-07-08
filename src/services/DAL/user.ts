import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import type { UserCreateInput } from '@/generated/prisma/models';
import type { updateUserInteface } from '@/types/user';

export const registerUser = async (data: UserCreateInput) => {
  return await prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
};

export const loginUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      image: true,
    },
  });
};

export const updateUser = async (id: string, data: updateUserInteface) => {
  return await prisma.user.update({
    where: { id: id },
    data,
    select: { id: true, name: true },
  });
};

export const userAccount = async (userId: string) => {
  return !!(await prisma.account.findFirst({
    where: { userId: userId },
    select: { provider: true },
  }));
};
