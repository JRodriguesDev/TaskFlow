export interface FormState {
  errors?: {
    name?: string;
    email?: string;
    password?: string;
  };
  message?: string;
}
