"use client";

import React from "react";
import { gsap } from "gsap";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--brand)] text-white hover:brightness-95 focus-visible:ring-[var(--brand)] ring-offset-background",
  outline:
    "border border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--tint)] focus-visible:ring-[var(--brand)]",
  ghost:
    "text-[var(--brand)] hover:bg-[var(--tint)] focus-visible:ring-[var(--brand)]",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.to(el, { y: -2, boxShadow: "0 8px 16px rgba(0,0,0,0.15)", duration: 0.2, ease: "power2.out" });
      el.addEventListener("mouseenter", () => tl.play());
      el.addEventListener("mouseleave", () => tl.reverse());
      el.addEventListener("mousedown", () => gsap.to(el, { scale: 0.98, duration: 0.1 }));
      el.addEventListener("mouseup", () => gsap.to(el, { scale: 1, duration: 0.1 }));
    }, buttonRef);
    return () => ctx.revert();
  }, []);

  const classes = [baseClasses, sizeClasses[size], variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button ref={buttonRef} className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;


