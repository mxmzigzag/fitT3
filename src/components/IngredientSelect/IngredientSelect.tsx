// import type { Ingredient } from "@prisma/client";
import React, { memo, useRef, useState } from "react";
import useOnClickOutside from "~/hooks/useClickOutside";
import type { Ingredient } from "~/types/ingredient.types";

type Props = {
  ingredients: Ingredient[];
  onSelect: (_: Ingredient) => void;
  onCustom?: () => void;
};

const listButtonStyles = "hover:bg-fDark rounded transition-all";

function IngredientSelect({ ingredients, onSelect, onCustom }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (ing: Ingredient) => {
    onSelect(ing);
    setIsOpen(false);
  };

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded bg-fOrange px-1 py-0.5 text-fDark"
      >
        Select ingredient
      </button>
      {isOpen && (
        <div className="absolute left-0 top-7 flex w-full flex-col rounded bg-fOrange px-1.5 py-1 drop-shadow-base">
          {ingredients.map((ing) => (
            <button
              key={ing.id}
              onClick={() => handleSelect(ing)}
              className={listButtonStyles}
            >
              {ing.name}
            </button>
          ))}
          <button
            onClick={() => {
              onCustom && onCustom();
              setIsOpen(false);
            }}
            className={listButtonStyles}
          >
            Custom
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(IngredientSelect);
