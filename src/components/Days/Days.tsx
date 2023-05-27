import React from "react";
import Button from "../Button/Button";
import PlusIcon from "~/assets/icons/plus.icon";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const Days = () => {
  const router = useRouter();
  const { data: days } = api.day.getDaysOfUser.useQuery();
  const { data: ingredients } = api.ingredient.getAllIngredients.useQuery();
  console.log("days:", days);
  console.log("ingrs:", ingredients);
  return (
    <div className="flex w-full flex-col">
      <p className="text-center text-white">Days list</p>
      <Button onClick={() => void router.push("/add")} className="mt-5">
        <PlusIcon width={28} height={28} className="text-fDark" />
      </Button>
    </div>
  );
};

export default Days;
