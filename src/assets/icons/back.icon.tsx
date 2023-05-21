import React from "react";
import type { IconProps } from "./icon.types";

function BackIcon({ width = 24, height = 24, className = "" }: IconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
    </svg>
  );
}

export default BackIcon;
