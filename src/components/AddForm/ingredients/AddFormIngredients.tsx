import React from "react";
import { v4 as uuid } from "uuid";
import TrashIcon from "~/assets/icons/trash.icon";
import IngredientSelect from "../../IngredientSelect/IngredientSelect";
import type { EditableIngredient, Ingredient } from "~/types/ingredient.types";
import EditableIngredientRow from "./EditableIngredientRow";

type Props = {
  mealId: string;
  formIngredients: EditableIngredient[];
  allIngredients: Ingredient[];
  handleAddIngredient: (mealId: string, ingredient: Ingredient) => void;
  handleUpdateIngredient: (mealId: string, ingredient: Ingredient) => void;
  handleRemoveIngredient: (mealId: string, ingredientId: string) => void;
};

const rowStyles =
  "grid grid-cols-[2%_30%_10%_10%_20%_15%] gap-3 mb-2.5 text-white text-sm";

const EMPTY_EDITABLE_INGREDIENT: Omit<EditableIngredient, "id"> = {
  name: "Name",
  protein: 0,
  fat: 0,
  carbohydrate: 0,
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
  return (
    <div className="flex flex-col">
      <div className={rowStyles}>
        <span>#</span>
        <span>Name</span>
        <span>Protein</span>
        <span>Fat</span>
        <span>Carbohydrate</span>
        <span />
      </div>
      {formIngredients.map((ingredient, idx) => (
        <div key={ingredient.id} className={rowStyles}>
          <span>{idx + 1}</span>
          {ingredient.isEditable ? (
            <EditableIngredientRow
              mealId={mealId}
              ingredient={ingredient}
              handleUpdate={handleUpdateIngredient}
            />
          ) : (
            <>
              <span>{ingredient.name}</span>
              <span>{ingredient.protein}</span>
              <span>{ingredient.fat}</span>
              <span>{ingredient.carbohydrate}</span>
            </>
          )}
          <button onClick={() => handleRemoveIngredient(mealId, ingredient.id)}>
            <TrashIcon />
          </button>
        </div>
      ))}
      <div className={rowStyles}>
        <span>{formIngredients.length + 1}</span>
        <IngredientSelect
          ingredients={allIngredients}
          onSelect={(ingredient) => handleAddIngredient(mealId, ingredient)}
          onCustom={() =>
            handleAddIngredient(mealId, {
              ...EMPTY_EDITABLE_INGREDIENT,
              id: uuid(),
            })
          }
        />
      </div>
    </div>
  );
};

export default AddFormIngredients;
