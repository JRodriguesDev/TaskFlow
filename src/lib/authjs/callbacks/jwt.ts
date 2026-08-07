import { NextAuthConfig } from 'next-auth';

type JwtType = NonNullable<NextAuthConfig['callbacks']>['jwt'];

export const jwtCallback: JwtType = ({ token, user, trigger, session }) => {
  if (user) {
    token.id = user.id;
  }

  if (trigger === 'update' && session.name) token.name = session.name;

  return token;
};
