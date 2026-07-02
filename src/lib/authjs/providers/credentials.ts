import Credentials from 'next-auth/providers/credentials';
import { loginUser } from '@/services/DAL/user';
import { loginSchema } from '@/lib/validations/auth';
import { verifyPassword } from '@/lib/crypto/password';

const credentials = Credentials({
  credentials: {
    email: { type: 'email' },
    password: {},
  },
  authorize: async (credentials) => {
    const parsed = loginSchema.safeParse({
      email: credentials.email,
      password: credentials.password,
    });

    if (!parsed.success) return null;
    const { email, password } = parsed.data;
    const user = await loginUser(email);
    if (!user || !user.password) return null;
    const passwordMatches = await verifyPassword(password, user.password);
    if (!passwordMatches) return null;
    const { password: _, ...userData } = user;
    return userData;
  },
});

export default credentials;
