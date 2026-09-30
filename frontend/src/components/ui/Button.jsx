import React from "react";

/**
 * Button Component
 * Reusable button with different variants
 */
const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
  fullWidth = false,
  ...props
}) => {

  const baseClasses =
    "inline-flex items-center justify-center font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 hover:shadow-2xl transform hover:scale-105 active:scale-95 focus:ring-green-500",

    secondary:
      "bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 hover:shadow-xl transform hover:scale-105 active:scale-95",

    danger:
      "bg-red-600 text-white hover:bg-red-700 hover:shadow-xl transform hover:scale-105 active:scale-95",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
