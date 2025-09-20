import React from "react";

const AiIcon = ({ size = 24, fill = "#BBBBBB" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2Z"
        fill={fill}
      />
      <path
        d="M4 8C4 6.89543 4.89543 6 6 6H18C19.1046 6 20 6.89543 20 8V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V8Z"
        fill={fill}
      />
      <circle cx="8" cy="11" r="1.5" fill="white" />
      <circle cx="16" cy="11" r="1.5" fill="white" />
      <path
        d="M8 14H16"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 18V20"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 20H16"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AiIcon;