import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark",
  secondary:
    "bg-surface-light text-gray-900 hover:bg-gray-200 dark:bg-surface-dark dark:text-gray-100 dark:hover:bg-gray-700",
  danger: "bg-red-500 text-white hover:bg-red-600",
  ghost:
    "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`min-h-touch rounded-lg px-4 text-sm font-medium transition disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
