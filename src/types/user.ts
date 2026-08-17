export type updateUserInteface = {
  name?: string;
  password?: string;
  image?: string;
};

export type HasTokenGoogle = {
  isGoogleConnected: boolean;
  hasCalendarError: boolean;
};
