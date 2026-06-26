import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido').max(255),
  password: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres').max(64),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, 'Nome muito curto').max(50, 'Nome muito longo'),
    email: z.string().email('E-mail inválido').max(255),
    password: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres').max(64),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
