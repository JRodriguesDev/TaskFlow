import { z } from 'zod';

export const taskCreateSchema = z.object({
  title: z.string().trim().min(3, 'Titulo muito curto').max(80, 'Titulo muito longo'),
  description: z
    .string()
    .trim()
    .max(500, 'Descrição muito longa')
    .transform((text) => text || undefined)
    .optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
  dueDate: z
    .string()
    .optional()
    .transform((date) => (date ? new Date(date) : undefined)),
});

export type TaskCreateSchema = z.infer<typeof taskCreateSchema>;
