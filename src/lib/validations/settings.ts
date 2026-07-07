import { z } from 'zod';

export const profileNameSchema = z.object({
  name: z.string().min(3, 'Nome muito curto').max(50, 'Nome muito longo'),
});

export type ProfileNameSchema = z.infer<typeof profileNameSchema>;
