import React, { memo } from "react";
import { useRouter } from "next/router";

import { api } from "~/utils/api";
import type { Day as DayType } from "~/types/day.types";

import Button from "../Button/Button";
import Day from "../Day/Day";

import PlusIcon from "~/assets/icons/plus.icon";
import SpinnerIcon from "~/assets/icons/spinner.icon";

const Days = () => {
  const router = useRouter();
  const { data: days, isLoading } = api.day.getDaysOfUser.useQuery();
  return (
    <div className="flex w-full flex-col gap-3">
      {isLoading ? (
        <SpinnerIcon size={100} className="mx-auto" />
      ) : days?.length ? (
        days.map((day) => <Day key={day.id} day={day as DayType} />)
      ) : (
        <p className="text-center text-white">
          Add your first day by clicking the button below!
        </p>
      )}
      <Button onClick={() => void router.push("/add")} className="mt-5">
        <PlusIcon width={28} height={28} className="text-fDark" />
      </Button>
    </div>
  );
};

export default memo(Days);
