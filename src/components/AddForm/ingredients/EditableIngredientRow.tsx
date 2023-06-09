import React, { memo, useState } from "react";
import type {
  EditableIngredient,
  IngredientWithWeight,
} from "~/types/ingredient.types";

type Props = {
  mealId: string;
  ingredient: EditableIngredient;
  handleUpdate: (mealId: string, ingredient: IngredientWithWeight) => void;
};

export const inputStyles =
  "bg-transparent rounded border border-slate-100 px-1 py-0.5 focus:border-fOrange outline-0";

function EditableIngredientRow({ mealId, ingredient, handleUpdate }: Props) {
  const [ingred, setIngred] = useState<EditableIngredient>({ ...ingredient });

  const onChangeIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngred((state) => ({
      ...state,
      ingredient: {
        ...state.ingredient,
        ...(e.target.name === "name"
          ? { [e.target.name]: e.target.value }
          : { [e.target.name]: Number(e.target.value) }),
      },
    }));
  };
  const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngred((state) => ({
      ...state,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const onBlur = () => {
    handleUpdate(mealId, ingred);
  };
  return (
    <>
      <input
        type="text"
        name="name"
        value={ingred.ingredient.name}
        onChange={onChangeIngredient}
        onBlur={onBlur}
        className={inputStyles}
        placeholder="Ingredient"
        autoFocus
      />
      <input
        type="number"
        step="any"
        name="protein"
        value={ingred.ingredient.protein}
        min={0}
        onChange={onChangeIngredient}
        onBlur={onBlur}
        placeholder="0"
        className={inputStyles}
      />
      <input
        type="number"
        step="any"
        name="fat"
        value={ingred.ingredient.fat}
        min={0}
        onChange={onChangeIngredient}
        onBlur={onBlur}
        placeholder="0"
        className={inputStyles}
      />
      <input
        type="number"
        step="any"
        name="carbohydrate"
        value={ingred.ingredient.carbohydrate}
        min={0}
        onChange={onChangeIngredient}
        onBlur={onBlur}
        placeholder="0"
        className={inputStyles}
      />
      <input
        type="number"
        step="any"
        name="calories"
        value={ingred.ingredient.calories}
        min={0}
        onChange={onChangeIngredient}
        onBlur={onBlur}
        placeholder="0"
        className={inputStyles}
      />
      <input
        type="number"
        step="any"
        name="weight"
        value={ingred.weight}
        min={0}
        onChange={onChangeWeight}
        onBlur={onBlur}
        placeholder="0"
        className={inputStyles}
      />
    </>
  );
}

export default memo(EditableIngredientRow);
