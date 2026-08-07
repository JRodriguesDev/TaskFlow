import { NextAuthConfig } from 'next-auth';

type SessionType = NonNullable<NextAuthConfig['callbacks']>['session'];

export const sessionCallback: SessionType = ({ session, token }) => {
  session.user.id = token.id as string;
  session.user.name = token.name;
  return session;
};
