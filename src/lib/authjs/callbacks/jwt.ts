/* eslint-disable camelcase */
import { NextAuthConfig } from 'next-auth';

type JwtType = NonNullable<NextAuthConfig['callbacks']>['jwt'];

export const jwtCallback: JwtType = async ({ token, user, trigger, session, account }) => {
  if (account && user) {
    return {
      ...token,
      id: user.id,
      accessToken: account.access_token,
      refreshToken: account.refresh_token,
      expiresAt: account.expires_at,
    };
  }

  if (trigger === 'update' && session.name) token.name = session.name;

  if (token.expiresAt && Date.now() < token.expiresAt * 1000) return token;

  if (!token.refreshToken) return { ...token, error: 'RefreshTokenError' };
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.AUTH_GOOGLE_ID!,
        client_secret: process.env.AUTH_GOOGLE_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
    });
    const newTokens = await response.json();
    if (!response.ok) throw newTokens;
    return {
      ...token,
      accessToken: newTokens.access_token,
      refreshToken: newTokens.refresh_token ?? token.refreshToken,
      expiresAt: Math.floor(Date.now() / 1000 + newTokens.expires_in),
      error: undefined,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      ...token,
      error: 'RefreshTokenError',
    };
  }

  return token;
};
