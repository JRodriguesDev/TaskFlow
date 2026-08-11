/* eslint-disable camelcase */
import { auth } from '../authjs/authjs';
import { google } from 'googleapis';

const googleCalendar = async () => {
  const session = await auth();

  if (!session?.accessToken) throw new Error('Usuário não autenticado ou token de acesso ausente.');

  const oauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET
  );

  oauth2Client.setCredentials({
    access_token: session.accessToken,
  });
  return google.calendar({ version: 'v3', auth: oauth2Client });
};
