import React from "react";

type Props = {
  children: React.ReactNode;
};

const CardLayout = ({ children }: Props) => {
  return <div className="rounded-xl bg-fDark p-5">{children}</div>;
};

export default CardLayout;
