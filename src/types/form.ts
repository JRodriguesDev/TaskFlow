export interface FormUserType {
  success?: boolean;
  errors?: {
    name?: string;
    password?: string;
  };
  message?: string;
}

export interface FormTaskType {
  success?: boolean;
  errors?: {
    title?: string | null;
    description?: string | null;
    dueDate?: string | null;
  };
  message?: string | null;
}
