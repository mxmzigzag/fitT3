import { v4 as uuidv4 } from "uuid";
import type { MealTypes } from "@prisma/client";
import type { Meal } from "~/types/meal.types";
import type { Ingredient } from "~/types/ingredient.types";

export const createEmptyMeal = (type: MealTypes): Meal => ({
  id: uuidv4(),
  type,
  ingredients: [],
});

export const createEmptyIngredient = (): Ingredient => ({
  id: uuidv4(),
  name: "",
  protein: 0,
  fat: 0,
  carbohydrate: 0,
  calories: 0,
});
