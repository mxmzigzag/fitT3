import React, { memo } from "react";
import type { Ingredient } from "~/types/ingredient.types";
import type { Meal as MealType } from "~/types/meal.types";
import { calcIngredientWithWeight } from "~/utils/ingredients.utils";

type Props = {
  meal: MealType;
};

const Meal: React.FC<Props> = ({ meal }) => {
  return (
    <div className="flex flex-col">
      <div className="mb-4 flex justify-center">
        <span className="border-b text-lg text-white">{meal.type}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[30%_17%_17%_17%_17%]">
          <span className="text-sm text-white">Name</span>
          <span className="text-sm text-white">Protein</span>
          <span className="text-sm text-white">Fat</span>
          <span className="text-sm text-white">Carbs</span>
          <span className="text-sm text-white">Weight</span>
        </div>
        {meal.ingredients?.length ? (
          meal.ingredients.map(({ ingredient, weight }) => (
            <IngredientRow
              key={ingredient.id}
              ingredient={ingredient}
              weight={weight}
            />
          ))
        ) : (
          <span className="text-center text-white">
            No ingredients in that meal
          </span>
        )}
      </div>
    </div>
  );
};

type IngredientRowProps = {
  ingredient: Ingredient;
  weight: number;
};

const IngredientRow: React.FC<IngredientRowProps> = ({
  ingredient,
  weight,
}) => {
  const { protein, fat, carbohydrate } = calcIngredientWithWeight({
    protein: ingredient.protein,
    fat: ingredient.fat,
    carbohydrate: ingredient.carbohydrate,
    weight,
  });
  return (
    <div className="grid grid-cols-[30%_17%_17%_17%_17%]">
      <span className="text-sm text-white">{ingredient.name}</span>
      <span className="text-sm text-white">{protein}g</span>
      <span className="text-sm text-white">{fat}g</span>
      <span className="text-sm text-white">{carbohydrate}g</span>
      <span className="text-sm text-white">{weight}g</span>
    </div>
  );
};

export default memo(Meal);
