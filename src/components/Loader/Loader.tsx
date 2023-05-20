import React from "react";
import LoaderIcon from "~/assets/icons/loader.icon";

const Loader = () => {
  return (
    <div className="flex items-center justify-center rounded-xl bg-fDark p-3">
      <LoaderIcon />
    </div>
  );
};

export default Loader;
