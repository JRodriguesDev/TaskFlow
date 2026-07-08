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
    async signIn({ profile }) {
      const session = await auth();
      if (!session) return true;

      const currentEmail = session.user?.email;
      const googleEmail = profile?.email;

      if (currentEmail !== googleEmail) return '/auth/error?error=EmailMismatch';
      return true;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
      }

      if (trigger === 'update' && session.name) token.name = session.name;

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name;
      return session;
    },
  },
});
