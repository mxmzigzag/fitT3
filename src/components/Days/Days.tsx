import React from "react";
import Button from "../Button/Button";
import PlusIcon from "~/assets/icons/plus.icon";

const Days = () => {
  return (
    <div className="flex w-full flex-col px-3">
      <p className="text-center text-white">Days list</p>
      <Button onClick={() => console.log("add day")} className="mt-5">
        <PlusIcon width={28} height={28} className="text-fDark" />
      </Button>
    </div>
  );
};

export default Days;
