import nextAuth from 'next-auth';
import Credentials from './providers/credentials';
import Google from './providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma/prisma';
import { jwtCallback } from './callbacks/jwt';
import { sessionCallback } from './callbacks/session';
import { signInCallback } from './callbacks/signIn';

export const { handlers, signIn, signOut, auth } = nextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google, Credentials],
  session: {
    maxAge: 30 * 60,
    strategy: 'jwt',
  },
  callbacks: {
    signIn: signInCallback,
    jwt: jwtCallback,
    session: sessionCallback,
  },
});
