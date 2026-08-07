import Google from 'next-auth/providers/google';

const google = Google({
  allowDangerousEmailAccountLinking: true,
  profile(profile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
    };
  },
});

export default google;
