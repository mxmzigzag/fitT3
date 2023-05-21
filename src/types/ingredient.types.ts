import z from "zod";
import { mealSchema } from "./meal.types";

export const ingredientSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  carbohydrate: z.number(),
  protein: z.number(),
  fat: z.number(),

  meals: z.array(mealSchema),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Ingredient = z.infer<typeof ingredientSchema>;
