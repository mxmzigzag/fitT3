import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import type {
  EditableIngredient,
  Ingredient,
  IngredientWithWeight,
} from "~/types/ingredient.types";

import IngredientSelect from "../../IngredientSelect/IngredientSelect";
import EditableIngredientRow, { inputStyles } from "./EditableIngredientRow";

import TrashIcon from "~/assets/icons/trash.icon";

type Props = {
  mealId: string;
  formIngredients: EditableIngredient[];
  allIngredients: Ingredient[];
  handleAddIngredient: (
    mealId: string,
    ingredient: IngredientWithWeight
  ) => void;
  handleUpdateIngredient: (
    mealId: string,
    ingredient: IngredientWithWeight
  ) => void;
  handleRemoveIngredient: (mealId: string, ingredientId: string) => void;
};

const rowStyles =
  "grid grid-cols-[2%_25%_10%_10%_10%_10%_10%_8%] gap-3 mb-2.5 text-white text-sm";

const EMPTY_EDITABLE_INGREDIENT: EditableIngredient = {
  ingredient: {
    id: "",
    name: "Name",
    protein: 0,
    fat: 0,
    carbohydrate: 0,
    calories: 0,
  },
  weight: 0,
  isEditable: true,
};

const AddFormIngredients = ({
  mealId,
  formIngredients,
  allIngredients,
  handleAddIngredient,
  handleUpdateIngredient,
  handleRemoveIngredient,
}: Props) => {
  const [ingreds, setIngreds] = useState([...formIngredients]);

  useEffect(() => {
    setIngreds(formIngredients);
  }, [formIngredients]);

  return (
    <div className="flex flex-col">
      <div className={rowStyles}>
        <span>#</span>
        <span>Name</span>
        <span>Protein</span>
        <span>Fat</span>
        <span>Carb.</span>
        <span>Calories</span>
        <span>Grams</span>
        <span />
      </div>
      {ingreds.map((ingr, idx) => (
        <div key={ingr.ingredient.id} className={rowStyles}>
          <span>{idx + 1}</span>
          {ingr.isEditable ? (
            <EditableIngredientRow
              mealId={mealId}
              ingredient={ingr}
              handleUpdate={handleUpdateIngredient}
            />
          ) : (
            <>
              <span>{ingr.ingredient.name}</span>
              <span>{ingr.ingredient.protein}</span>
              <span>{ingr.ingredient.fat}</span>
              <span>{ingr.ingredient.carbohydrate}</span>
              <span>{ingr.ingredient.calories}</span>

              <input
                type="number"
                name="fat"
                min={0}
                value={ingr.weight}
                onChange={(e) =>
                  setIngreds((prev) => [
                    ...prev.slice(0, idx),
                    {
                      ingredient: ingr.ingredient,
                      weight: Number(e.target.value),
                      isEditable: ingr.isEditable,
                    },
                    ...prev.slice(idx + 1),
                  ])
                }
                onBlur={(e) =>
                  handleUpdateIngredient(mealId, {
                    ingredient: ingr.ingredient,
                    weight: Number(e.target.value),
                  })
                }
                className={inputStyles}
              />
            </>
          )}
          <button
            onClick={() => handleRemoveIngredient(mealId, ingr.ingredient.id)}
          >
            <TrashIcon />
          </button>
        </div>
      ))}
      <div className={rowStyles}>
        <span>{formIngredients.length + 1}</span>
        <IngredientSelect
          ingredients={allIngredients}
          formIngredients={formIngredients}
          onSelect={(ingredient) =>
            handleAddIngredient(mealId, { ingredient, weight: 0 })
          }
          onCustom={() =>
            handleAddIngredient(mealId, {
              ...EMPTY_EDITABLE_INGREDIENT,
              ingredient: {
                ...EMPTY_EDITABLE_INGREDIENT.ingredient,
                id: uuid(),
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default AddFormIngredients;
