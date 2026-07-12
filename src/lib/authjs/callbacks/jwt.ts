import { NextAuthConfig } from 'next-auth';

type jwtType = NonNullable<NextAuthConfig['callbacks']>['jwt'];

export const jwtCallback: jwtType = ({ token, user, trigger, session }) => {
  if (user) {
    token.id = user.id;
  }

  if (trigger === 'update' && session.name) token.name = session.name;

  return token;
};
