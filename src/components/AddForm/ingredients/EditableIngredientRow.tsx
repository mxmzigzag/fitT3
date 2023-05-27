import React, { memo, useState } from "react";
import type { EditableIngredient, Ingredient } from "~/types/ingredient.types";

type Props = {
  mealId: string;
  ingredient: EditableIngredient;
  handleUpdate: (mealId: string, ingredient: Ingredient) => void;
};

const inputStyles =
  "bg-transparent rounded border border-slate-100 px-1 py-0.5 focus:border-fOrange outline-0";

function EditableIngredientRow({ mealId, ingredient, handleUpdate }: Props) {
  const [ingred, setIngred] = useState<EditableIngredient>({ ...ingredient });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngred((state) => ({
      ...state,
      ...(e.target.name === "name"
        ? { [e.target.name]: e.target.value }
        : { [e.target.name]: Number(e.target.value) }),
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
        value={ingred.name}
        onChange={onChange}
        onBlur={onBlur}
        className={inputStyles}
        autoFocus
      />
      <input
        type="number"
        name="protein"
        value={ingred.protein}
        min={0}
        onChange={onChange}
        onBlur={onBlur}
        className={inputStyles}
      />
      <input
        type="number"
        name="fat"
        value={ingred.fat}
        min={0}
        onChange={onChange}
        onBlur={onBlur}
        className={inputStyles}
      />
      <input
        type="number"
        name="carbohydrate"
        value={ingred.carbohydrate}
        min={0}
        onChange={onChange}
        onBlur={onBlur}
        className={inputStyles}
      />
      <input
        type="number"
        name="calories"
        value={ingred.calories}
        min={0}
        onChange={onChange}
        onBlur={onBlur}
        className={inputStyles}
      />
    </>
  );
}

export default memo(EditableIngredientRow);
