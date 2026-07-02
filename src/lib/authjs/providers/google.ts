import Google from 'next-auth/providers/google';

const google = Google({
  allowDangerousEmailAccountLinking: true,
  profile(profile) {
    return {
      name: profile.name,
      email: profile.email,
      image: profile.picture,
    };
  },
});

export default google;
