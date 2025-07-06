"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  className?: string;
}

export function Button({
  variant = "default",
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "rounded-md px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props} />
  );
}
