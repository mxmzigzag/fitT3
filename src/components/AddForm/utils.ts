import { v4 as uuidv4 } from "uuid";
import type { Ingredient, Meal } from "./types";
import type { MealTypes } from "@prisma/client";

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
});
