'use server';

import { auth } from '@/lib/authjs/authjs';
import { redirect } from 'next/navigation';

export const updatePassword = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect('/auth/login');
};
