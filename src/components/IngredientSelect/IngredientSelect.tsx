// import type { Ingredient } from "@prisma/client";
import React, { memo, useRef, useState } from "react";
import useOnClickOutside from "~/hooks/useClickOutside";
import type { Ingredient } from "~/types/ingredient.types";

type Props = {
  ingredients: Ingredient[];
  onSelect: (_: Ingredient) => void;
};

function IngredientSelect({ ingredients, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (ing: Ingredient) => {
    onSelect(ing);
    setIsOpen(false);
  };

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative flex flex-col">
      <button onClick={() => setIsOpen(!isOpen)}>Select ingredient</button>
      {isOpen && (
        <div className="absolute left-0 top-0 flex flex-col">
          {ingredients.map((ing) => (
            <button key={ing.id} onClick={() => handleSelect(ing)}>
              {ing.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(IngredientSelect);
