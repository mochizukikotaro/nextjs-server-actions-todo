import { z } from "zod";
export const userSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(140),
  score: z.coerce.number().gte(1).lte(100),
});
