import z from "zod";
import { mealSchema } from "./meal.types";

export const daySchema = z.object({
  id: z.string().uuid(),
  date: z.date(),

  meals: z.array(mealSchema),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createDaySchema = daySchema.partial({
  id: true,
});

export type Day = z.infer<typeof daySchema>;
export type CreateDay = z.infer<typeof createDaySchema>;
