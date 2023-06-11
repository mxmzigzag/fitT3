import React, { memo, useMemo } from "react";
import { format } from "date-fns";

import type { Ingredient } from "@prisma/client";
import { Day } from "~/types/day.types";

import { formatValue, pick } from "~/utils";

import Meal from "../Meal/Meal";

type Props = {
  day: Day;
};

type TotalSum = {
  protein: number;
  fat: number;
  carbohydrate: number;
  calories: number;
};

const Day: React.FC<Props> = ({ day }) => {
  const total: TotalSum = useMemo(() => {
    const ingredients: Pick<
      Ingredient,
      "protein" | "fat" | "carbohydrate" | "calories"
    >[] = [];
    day.meals.forEach((meal) =>
      meal.ingredients.forEach((ingr) =>
        ingredients.push(
          pick(ingr.ingredient, "protein", "fat", "carbohydrate", "calories")
        )
      )
    );
    return ingredients.reduce(
      (prev, cur) => ({
        protein: prev.protein + cur.protein,
        fat: prev.fat + cur.fat,
        carbohydrate: prev.carbohydrate + cur.carbohydrate,
        calories: prev.calories + cur.calories,
      }),
      { protein: 0, fat: 0, carbohydrate: 0, calories: 0 }
    );
  }, [day]);

  return (
    <div className="flex flex-col overflow-hidden rounded-md bg-fDayBg">
      <div className="flex items-center justify-center bg-fDayHeaderBg px-4 py-1">
        <span className="text-xl text-white">
          {format(day.date, "d MMM, yyyy")}
        </span>
      </div>
      <div className="flex flex-col gap-3 px-4 py-4 pt-2">
        {day.meals.length ? (
          day.meals.map((meal) => <Meal key={meal.id} meal={meal} />)
        ) : (
          <p className="text-center text-white">
            No meals was taken at that day
          </p>
        )}
      </div>
      <div className="grid grid-cols-[30%_17%_17%_17%_17%] bg-fDayHeaderBg px-4 py-1">
        <span className="text-sm text-white">Total</span>
        <span className="text-sm text-white">
          {formatValue(total.protein)}g
        </span>
        <span className="text-sm text-white">{formatValue(total.fat)}g</span>
        <span className="text-sm text-white">
          {formatValue(total.carbohydrate)}g
        </span>
        <span className="text-sm text-white">
          {formatValue(total.calories)}kCal
        </span>
      </div>
    </div>
  );
};

export default memo(Day);
