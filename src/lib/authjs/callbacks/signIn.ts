import { NextAuthConfig } from 'next-auth';
import { auth } from '../authjs';
import { updateUser } from '@/services/DAL/user';

type SignInType = NonNullable<NextAuthConfig['callbacks']>['signIn'];

export const signInCallback: SignInType = async ({ profile }) => {
  const session = await auth();
  if (!session) return true;
  const userId = session.user!.id;

  const currentEmail = session.user?.email;
  const googleEmail = profile?.email;

  if (currentEmail !== googleEmail) return '/errors/auth?error=EmailMismatch';
  if (session) await updateUser(userId!, { image: profile?.picture });

  return true;
};
