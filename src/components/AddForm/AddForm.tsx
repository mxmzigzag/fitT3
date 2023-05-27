import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MealTypes } from "@prisma/client";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

import type { DayFormValues } from "./types";
import { createEmptyMeal } from "./utils";
import { api } from "~/utils/api";
import { createDaySchema } from "~/types/day.types";
import type { EditableIngredient, Ingredient } from "~/types/ingredient.types";

import Button from "../Button/Button";
import DatePicker from "../DatePicker/DatePicker";
import AddFormIngredients from "./ingredients/AddFormIngredients";

const AddForm = () => {
  const router = useRouter();
  const { data: allIngredients } = api.ingredient.getAllIngredients.useQuery();
  const createDay = api.day.create.useMutation();

  const defaultValues: DayFormValues = {
    date: undefined,
    meals: [createEmptyMeal(MealTypes.BREAKFAST)],
  };

  const {
    formState: { errors },
    setValue,
    clearErrors,
    handleSubmit,
    setError,
    watch,
  } = useForm({
    defaultValues,
    resolver: zodResolver(createDaySchema),
  });
  const formState = watch();

  const onSubmit = (data: DayFormValues) => {
    try {
      if (!data.date) {
        setError("date", { message: "Date is required!" });
        return;
      }
      const validData = {
        date: data.date,
        meals: data.meals.map((meal) => ({
          ...meal,
          ingredients: meal.ingredients.map((ing) => ({
            id: ing.id,
            name: ing.name,
            protein: Number(ing.protein),
            fat: Number(ing.fat),
            carbohydrate: Number(ing.carbohydrate),
            calories: Number(ing.calories),
          })),
        })),
      };
      createDay.mutate(validData);
      void router.push("/");
      toast.success("Day added!");
    } catch (error) {
      console.log("ERR:", error);
      toast.error("Something is not right. Check console.");
    }
  };

  const handleChangeDate = (date: Date | undefined) => {
    if (date) {
      clearErrors("date");
      setValue("date", date);
    }
  };

  const handleAddMeal = () => {
    const mealTypes = Object.keys(MealTypes);
    const usedMealTypes = formState.meals.map((meal) => meal.type);
    const difference = mealTypes.filter(
      (x) => !usedMealTypes.includes(x as MealTypes)
    );
    setValue("meals", [
      ...formState.meals,
      createEmptyMeal(difference[0] as MealTypes),
    ]);
  };

  const handleAddIngredient = (mealId: string, ingredient: Ingredient) => {
    const updMeals = formState.meals.map((meal) => {
      if (meal.id === mealId) {
        return {
          ...meal,
          ingredients: [...meal.ingredients, ingredient],
        };
      }
      return meal;
    });
    setValue("meals", updMeals);
  };

  const handleUpdateIngredient = (mealId: string, ingredient: Ingredient) => {
    const updMeals = formState.meals.map((meal) => {
      if (meal.id === mealId) {
        return {
          ...meal,
          ingredients: meal.ingredients.map((ingr) => {
            if (ingr.id === ingredient.id) return ingredient;
            return ingr;
          }),
        };
      }
      return meal;
    });
    setValue("meals", updMeals);
  };

  const handleRemoveIngredient = (mealId: string, ingredientId: string) => {
    const updMeals = formState.meals.map((meal) => {
      if (meal.id === mealId) {
        return {
          ...meal,
          ingredients: meal.ingredients.filter(
            (ingr) => ingr.id !== ingredientId
          ),
        };
      }
      return meal;
    });
    setValue("meals", updMeals);
  };

  if (!allIngredients) return null;

  return (
    <form name="day-form" onSubmit={handleSubmit(onSubmit)} className="w-full">
      <DatePicker selected={formState.date} onSelect={handleChangeDate} />
      <div className="mb-5 flex flex-col">
        {formState.meals.map((meal, idx) => (
          <React.Fragment key={meal.id}>
            <div className="flex flex-col">
              <MealHeader title={meal.type} />
              <AddFormIngredients
                mealId={meal.id}
                formIngredients={meal.ingredients as EditableIngredient[]}
                allIngredients={allIngredients}
                handleAddIngredient={handleAddIngredient}
                handleUpdateIngredient={handleUpdateIngredient}
                handleRemoveIngredient={handleRemoveIngredient}
              />
            </div>
            {formState.meals.length - 1 === idx && idx < 2 && (
              <MealHeader title="Add meal" onClick={handleAddMeal} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mb-2.5 flex flex-col">
        {Object.entries(errors).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center rounded bg-fRed px-1.5 py-0.5"
          >
            {key}: {value.message}
          </div>
        ))}
      </div>
      <Button type="submit" disabled={createDay.isLoading}>
        Save
      </Button>
    </form>
  );
};

export default memo(AddForm);

type MealHeaderProps = {
  title: string;
  onClick?: () => void;
};

const MealHeader = ({ title, onClick }: MealHeaderProps) => {
  return (
    <div className="mb-2.5 flex items-center justify-center">
      <div className="h-px w-20 bg-gray-400"></div>
      {onClick ? (
        <button
          type="button"
          className="flex-shrink px-4 text-white opacity-70"
          onClick={onClick}
        >
          {title}
        </button>
      ) : (
        <span className="flex-shrink px-4 text-white opacity-70">{title}</span>
      )}
      <div className="h-px w-20 bg-gray-400"></div>
    </div>
  );
};
