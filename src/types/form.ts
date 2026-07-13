export interface FormState {
  success?: boolean;
  errors?: {
    name?: string;
    password?: string;
  };
  message?: string;
}
