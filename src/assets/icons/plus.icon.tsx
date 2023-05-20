import React from "react";
import type { IconProps } from "./icon.types";

function PlusIcon({ width = 24, height = 24, className = "" }: IconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="transparent"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );
}

export default PlusIcon;
