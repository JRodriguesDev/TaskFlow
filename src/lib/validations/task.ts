import { z } from 'zod';

export const taskSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3, 'Titulo muito curto').max(80, 'Titulo muito longo'),
  description: z
    .string()
    .trim()
    .max(500, 'Descrição muito longa')
    .transform((value) => value || null),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
  dueDate: z
    .string()
    .min(1, 'Requer Data')
    .transform((date) => new Date(date)),
});

export type TaskSchema = z.infer<typeof taskSchema>;
