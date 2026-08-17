import { NextAuthConfig } from 'next-auth';

type SessionType = NonNullable<NextAuthConfig['callbacks']>['session'];

export const sessionCallback: SessionType = ({ session, token }) => {
  session.user.id = token.id as string;
  session.user.name = token.name;
  session.accessToken = token.accessToken;
  session.error = token.error;
  session.isGoogleConnected = Boolean(token.refreshToken || token.accessToken);
  session.hasCalendarError = token.error === 'RefreshTokenError';

  return session;
};
