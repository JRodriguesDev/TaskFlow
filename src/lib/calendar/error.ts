export const calendarApiErrors = (status: number) => {
  switch (status) {
    case 401:
      return 'Sua sessão do Google expirou. Conecte sua conta novamente.';
    case 403:
      return 'Sem permissão para alterar eventos no Google Agenda.';
    case 404:
      return 'O evento não foi encontrado no seu Google Agenda.';
    default:
      return undefined;
  }
};
