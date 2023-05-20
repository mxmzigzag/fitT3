import React from "react";

type Props = {
  children: React.ReactNode;
};

const Button = ({ children, ...props }: Props) => {
  return <button {...props}>{children}</button>;
};

export default Button;
