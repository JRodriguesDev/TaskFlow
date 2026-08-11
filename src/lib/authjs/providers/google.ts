import Google from 'next-auth/providers/google';

const google = Google({
  allowDangerousEmailAccountLinking: true,
  authorization: {
    params: {
      scope:
        'openid profile email https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly',
      // eslint-disable-next-line camelcase
      access_type: 'offline',
      prompt: 'consent',
    },
  },
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
