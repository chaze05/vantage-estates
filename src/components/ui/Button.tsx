"use client";

import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "emerald" | "outline";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  solid: "bg-navy text-white hover:bg-navy-deep",
  emerald: "bg-emerald text-white hover:bg-emerald/90",
  outline: "border border-line bg-white text-ink hover:border-emerald/50",
};

export function Button({
  children,
  href,
  onClick,
  variant = "solid",
  type = "button",
  disabled,
  className = "",
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
