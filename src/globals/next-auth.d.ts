import { DefaultSession } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: 'RefreshTokenError';
    isGoogleConnected: boolean;
    hasCalendarError: boolean;
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: 'RefreshTokenError';
  }
}
