import { NextAuthConfig } from 'next-auth';
import { auth } from '../authjs';

type SignInType = NonNullable<NextAuthConfig['callbacks']>['signIn'];

export const signInCallback: SignInType = async ({ profile }) => {
  const session = await auth();
  if (!session) return true;

  const currentEmail = session.user?.email;
  const googleEmail = profile?.email;

  if (currentEmail !== googleEmail) return '/auth/error?error=EmailMismatch';
  return true;
};
