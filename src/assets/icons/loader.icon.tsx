import React from "react";
import type { IconProps } from "./icon.types";

function LoaderIcon({ width = 200, height = 200, className = "" }: IconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 100 100"
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      className={className}
    >
      <g>
        <circle cx="60" cy="50" r="4" fill="#e15b64">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            values="95;35"
            keyTimes="0;1"
            begin="-0.67s"
          ></animate>
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="1s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="-0.67s"
          ></animate>
        </circle>
        <circle cx="60" cy="50" r="4" fill="#e15b64">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            values="95;35"
            keyTimes="0;1"
            begin="-0.33s"
          ></animate>
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="1s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="-0.33s"
          ></animate>
        </circle>
        <circle cx="60" cy="50" r="4" fill="#e15b64">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            values="95;35"
            keyTimes="0;1"
            begin="0s"
          ></animate>
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="1s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="0s"
          ></animate>
        </circle>
      </g>
      <g transform="translate(-15 0)">
        <path
          d="M50 50L20 50A30 30 0 0 0 80 50Z"
          fill="#f8b26a"
          transform="rotate(90 50 50)"
        ></path>
        <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f8b26a">
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;45 50 50;0 50 50"
            keyTimes="0;0.5;1"
          ></animateTransform>
        </path>
        <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#f8b26a">
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;-45 50 50;0 50 50"
            keyTimes="0;0.5;1"
          ></animateTransform>
        </path>
      </g>
    </svg>
  );
}

export default LoaderIcon;
