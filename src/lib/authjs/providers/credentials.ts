import Credentials from 'next-auth/providers/credentials';

const credentials = Credentials({
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    //working
  },
});

export default credentials;
