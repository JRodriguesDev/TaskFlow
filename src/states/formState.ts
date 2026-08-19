import type { FormUserType, FormTaskType } from '@/types/form';

export const formUserState: FormUserType = {
  success: false,
};

export const formTaskState: FormTaskType = {
  success: false,
  errors: {
    title: undefined,
    description: undefined,
    dueDate: undefined,
  },
};
