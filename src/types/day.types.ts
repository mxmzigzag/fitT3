import z from "zod";
import { mealSchema } from "./meal.types";

export const daySchema = z.object({
  id: z.string().uuid(),
  date: z.date(),

  meals: z.array(mealSchema),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Day = z.infer<typeof daySchema>;
