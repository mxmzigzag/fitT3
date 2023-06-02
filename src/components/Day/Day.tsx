import React, { memo } from "react";
import { format } from "date-fns";

import { Day } from "~/types/day.types";
import Meal from "../Meal/Meal";

type Props = {
  day: Day;
};

const Day: React.FC<Props> = ({ day }) => {
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
    </div>
  );
};

export default memo(Day);
