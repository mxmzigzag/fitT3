import React from "react";

type Props = {
  text: string;
};

export const ErrorText = ({ text }: Props) => {
  return (
    <div className="mt-2.5 flex items-center rounded bg-fRed px-1.5 py-0.5 opacity-80">
      <p className="text-white">{text}</p>
    </div>
  );
};
