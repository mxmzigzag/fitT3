// import type { Ingredient } from "@prisma/client";
import React, { memo, useMemo, useRef, useState } from "react";
import SearchIcon from "~/assets/icons/search.icon";
import useOnClickOutside from "~/hooks/useClickOutside";
import type { Ingredient } from "~/types/ingredient.types";

type Props = {
  ingredients: Ingredient[];
  formIngredients: Ingredient[];
  onSelect: (_: Ingredient) => void;
  onCustom?: () => void;
};

const listButtonStyles =
  "text-black hover:text-white hover:bg-fDark rounded transition-all my-0.5";

function IngredientSelect({
  ingredients,
  formIngredients,
  onSelect,
  onCustom,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIngredients = useMemo(
    () =>
      ingredients.filter(
        (ingr) =>
          ingr.name.toLowerCase().includes(search.toLowerCase()) &&
          !formIngredients.find((fIng) => fIng.name === ingr.name)
      ),
    [search, ingredients, formIngredients]
  );

  const handleSelect = (ing: Ingredient) => {
    onSelect(ing);
    setIsOpen(false);
  };

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded bg-fOrange px-1 py-0.5 text-fDark"
      >
        Select ingredient
      </button>
      {isOpen && (
        <div className="absolute left-0 top-7 z-10 flex max-h-[140px] w-full flex-col overflow-y-scroll rounded bg-fOrange px-1.5 py-1 shadow-base">
          {ingredients.length > 3 ? (
            <div className="relative mb-1.5 rounded border border-black">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ingre..."
                className="w-full border-0 bg-transparent py-0.5 pl-1 pr-6 text-black outline-0 ring-0 placeholder:text-slate-700"
              />
              <SearchIcon
                width={14}
                height={14}
                className="absolute right-1.5 top-1/2 -translate-y-1/2"
              />
            </div>
          ) : null}
          {filteredIngredients.map((ing) => (
            <button
              type="button"
              key={ing.id}
              onClick={() => handleSelect(ing)}
              className={listButtonStyles}
            >
              {ing.name}
            </button>
          ))}
          {search ? null : (
            <button
              type="button"
              onClick={() => {
                onCustom && onCustom();
                setIsOpen(false);
              }}
              className={listButtonStyles}
            >
              Custom
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(IngredientSelect);
