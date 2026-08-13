type FormType = {
  success?: boolean;
  message?: string;
};

export type FormUserType = FormType & {
  errors?: {
    name?: string;
    password?: string;
  };
};

export type FormTaskType = FormType & {
  errors?: {
    title?: string;
    description?: string;
    dueDate?: string;
  };
};
