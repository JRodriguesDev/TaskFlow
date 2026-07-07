'use server';

import { FormState } from '@/types/auth';
import { registerSchema } from '@/lib/validations/auth';
import { registerUser } from '@/services/DAL/user';
import { Prisma } from '@/generated/prisma/client';
import { hashPassword } from '@/lib/crypto/password';
import { signIn } from '@/lib/authjs/authjs';
import { redirect } from 'next/navigation';

export const registerAction = async (_prevState: FormState, form: FormData): Promise<FormState> => {
  const validationFields = registerSchema.safeParse({
    name: form.get('name'),
    email: form.get('email'),
    password: form.get('password'),
    confirmPassword: form.get('confirmPassword'),
  });
  if (!validationFields.success) {
    return { message: validationFields.error.issues[0].message };
  }

  const { confirmPassword, password, ...rest } = validationFields.data;
  const hashedPassword = await hashPassword(password);
  const createUserData = {
    ...rest,
    password: hashedPassword,
  };

  try {
    await registerUser(createUserData);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P1001':
          return { message: 'Servidor inativo tente novamente mais tarde' };

        case 'P1002':
          return { message: 'Tempo Limite Excedio tente novamente mais tarde' };

        case 'P2002':
          return { message: 'Email ja existe' };

        default:
          return { message: error.message };
      }
    }
  }

  await signIn('credentials', {
    email: createUserData.email,
    password: password,
    redirect: false,
  });
  redirect('/dashboard/overview');
};
