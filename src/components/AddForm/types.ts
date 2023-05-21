import z from "zod";
import { mealSchema } from "~/types/meal.types";

export const dayFormValues = z.object({
  date: z.date().optional(),
  meals: z.array(mealSchema),
});

export type DayFormValues = z.infer<typeof dayFormValues>;
