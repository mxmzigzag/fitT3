import React from "react";
import type { IconProps } from "./icon.types";

function TrashIcon({ width = 24, height = 24, className = "" }: IconProps) {
  return (
    <svg
      stroke="#e15b64"
      fill="transparent"
      strokeWidth="2"
      viewBox="0 0 24 24"
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

export default TrashIcon;
