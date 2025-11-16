import React from "react"

import { IconProps } from "types/icon"

const ShoppingBag: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path
        d="M5.83333 8.33333L4.16667 3.33333H2.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8333 8.33333L17.5 3.33333H2.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 16.6667C8.42047 16.6667 9.16667 15.9205 9.16667 15C9.16667 14.0795 8.42047 13.3333 7.5 13.3333C6.57953 13.3333 5.83333 14.0795 5.83333 15C5.83333 15.9205 6.57953 16.6667 7.5 16.6667Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6667 16.6667C17.5871 16.6667 18.3333 15.9205 18.3333 15C18.3333 14.0795 17.5871 13.3333 16.6667 13.3333C15.7462 13.3333 15 14.0795 15 15C15 15.9205 15.7462 16.6667 16.6667 16.6667Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16667 3.33333H17.5L15.8333 8.33333H7.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ShoppingBag

