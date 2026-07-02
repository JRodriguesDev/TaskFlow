import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import type { UserCreateInput } from '@/generated/prisma/models';

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
