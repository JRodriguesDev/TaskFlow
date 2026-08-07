import 'server-only';

import { prisma } from '@/lib/prisma/prisma';
import type { UserCreateInput } from '@/generated/prisma/models';

export const registerUser = async (data: UserCreateInput) => {
  const result = await prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return result;
};

export const loginUser = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      image: true,
    },
  });

  return result;
};
