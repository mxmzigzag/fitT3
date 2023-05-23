import z from "zod";

export const ingredientSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  carbohydrate: z.number(),
  protein: z.number(),
  fat: z.number(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export const editableIngredientSchema = ingredientSchema.extend({
  isEditable: z.boolean(),
});

export type Ingredient = z.infer<typeof ingredientSchema>;
export type EditableIngredient = z.infer<typeof editableIngredientSchema>;
