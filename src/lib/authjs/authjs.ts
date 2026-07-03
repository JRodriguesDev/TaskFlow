import nextAuth from 'next-auth';
import Credentials from './providers/credentials';
import Google from './providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma/prisma';

export const { handlers, signIn, signOut, auth } = nextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google, Credentials],
  session: {
    maxAge: 30 * 60,
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
