import { NextAuthConfig } from 'next-auth';

type sessionType = NonNullable<NextAuthConfig['callbacks']>['session'];

export const sessionCallback: sessionType = ({ session, token }) => {
  session.user.id = token.id as string;
  session.user.name = token.name;
  return session;
};
