import nextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from './providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma/prisma';

export const { handlers, signIn, signOut, auth } = nextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google, Credentials],
});
