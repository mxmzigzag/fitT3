import React, { memo, useRef, useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";
import PlusIcon from "~/assets/icons/plus.icon";
import ChangeIcon from "~/assets/icons/change.icon";
import useOnClickOutside from "~/hooks/useClickOutside";

type Props = {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  disabledDates: Date[];
};

const DatePicker = ({ selected, onSelect, disabledDates }: Props) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(pickerRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div className="relative mb-5 flex items-center justify-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center"
      >
        <span className="mr-2 text-lg text-white">
          {selected ? format(selected, "d MMM yyyy") : "Date"}
        </span>
        {selected ? (
          <ChangeIcon className="text-white" />
        ) : (
          <PlusIcon className="text-white" />
        )}
      </button>
      {isOpen && (
        <div
          className="absolute left-1/2 top-8 z-50 -translate-x-1/2 rounded-lg bg-fOrange shadow-base"
          ref={pickerRef}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date: Date | undefined) => {
              onSelect(date);
              setIsOpen(false);
            }}
            disabled={disabledDates}
          />
        </div>
      )}
    </div>
  );
};

export default memo(DatePicker);
