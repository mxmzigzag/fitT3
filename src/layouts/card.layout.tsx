import React from "react";

type Props = {
  children: React.ReactNode;
};

const CardLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center rounded-xl bg-fDark p-5">
      {children}
    </div>
  );
};

export default CardLayout;
