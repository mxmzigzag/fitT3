import z from "zod";

export const ingredientSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  carbohydrate: z.number(),
  protein: z.number(),
  fat: z.number(),
  calories: z.number(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export const ingredientWithWeightSchema = z.object({
  ingredient: ingredientSchema,
  weight: z.number(),
});
export const editableIngredientSchema = ingredientWithWeightSchema.extend({
  isEditable: z.boolean(),
});

export type Ingredient = z.infer<typeof ingredientSchema>;
export type IngredientWithWeight = z.infer<typeof ingredientWithWeightSchema>;
export type EditableIngredient = z.infer<typeof editableIngredientSchema>;
