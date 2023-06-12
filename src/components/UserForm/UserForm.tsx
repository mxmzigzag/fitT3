import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import type { UserFormValue } from "./types";
import { userSettingsSchema } from "~/types/user.types";
import { inputStyles } from "../AddForm/ingredients/EditableIngredientRow";
import Button from "../Button/Button";
import { api } from "~/utils/api";
import { ErrorText } from "../ErrorText/ErrorText";

const UserForm = () => {
  const { data: settings } = api.user.getUserSettings.useQuery();
  const saveSettings = api.user.saveUserSettings.useMutation();

  const defaultValues: UserFormValue = {
    caloriesLimit: settings?.caloriesLimit.toString() || "0",
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(userSettingsSchema),
  });

  const onSubmit = (data: UserFormValue) => {
    try {
      saveSettings.mutate(data);
      toast.success("User updated!");
    } catch (error) {
      console.log("ERR:", error);
      toast.error("Something is not right. Check console.");
    }
  };

  return (
    <form
      name="user-form"
      className="flex w-full flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between">
        <label className="text-lg text-white">Calories Limit</label>
        <input
          type="number"
          step="any"
          min={0}
          placeholder="0"
          className={`${inputStyles} text-white`}
          {...register("caloriesLimit")}
        />
      </div>
      {errors.caloriesLimit?.message && (
        <ErrorText text={errors.caloriesLimit.message} />
      )}
      <Button type="submit" className="mt-2.5">
        Save
      </Button>
    </form>
  );
};

export default memo(UserForm);
