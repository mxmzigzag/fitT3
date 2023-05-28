import z from "zod";
import { ingredientWithWeightSchema } from "./ingredient.types";

export const mealSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["BREAKFAST", "LUNCH", "DINNER"]),

  ingredients: z.array(ingredientWithWeightSchema),
  dayId: z.string().uuid().optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Meal = z.infer<typeof mealSchema>;
