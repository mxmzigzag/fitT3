import React from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

const Button = ({
  type = "button",
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  children,
  ...props
}: Props) => {
  const btnBaseClasses =
    "flex items-center justify-center px-2.5 py-0.5 rounded-lg border w-full";
  const btnVariantClasses = {
    primary: `${btnBaseClasses} bg-fOrange border-fOrange text-fDark hover:opacity-90`,
    secondary: `${btnBaseClasses} bg-transparent border-fOrange text-fOrange hover:opacity-90`,
  };
  const btnSizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${btnVariantClasses[variant]} ${btnSizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
