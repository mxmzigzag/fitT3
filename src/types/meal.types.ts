import z from "zod";
import { ingredientSchema } from "./ingredient.types";

export const mealSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["BREAKFAST", "LUNCH", "DINNER"]),

  ingredients: z.array(ingredientSchema),
  dayId: z.string().uuid(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Meal = z.infer<typeof mealSchema>;
