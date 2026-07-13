import { z } from 'zod';

export const profileNameSchema = z.object({
  name: z.string().min(3, 'Nome muito curto').max(50, 'Nome muito longo'),
});

export const passwordSchema = z
  .object({
    password: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres').max(64),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type PasswordSchema = z.infer<typeof passwordSchema>;
export type ProfileNameSchema = z.infer<typeof profileNameSchema>;
