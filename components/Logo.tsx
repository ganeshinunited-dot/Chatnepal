import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "auto" | "light" | "dark";
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  showText = true,
  variant = "auto",
  href = "/",
}) => {
  const dimensions = {
    sm: { icon: 26, text: "text-sm tracking-[0.2em]" },
    md: { icon: 34, text: "text-base sm:text-lg tracking-[0.22em]" },
    lg: { icon: 44, text: "text-xl sm:text-2xl tracking-[0.24em]" },
    xl: { icon: 56, text: "text-2xl sm:text-3xl tracking-[0.25em]" },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-90 ${className}`}>
      {/* Official KARKTECH Graphic Emblem */}
      <div
        className="relative flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ width: dimensions.icon, height: dimensions.icon }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full ${
            variant === "light"
              ? "text-white fill-white"
              : variant === "dark"
              ? "text-zinc-950 fill-zinc-950"
              : "text-zinc-950 dark:text-zinc-50 fill-current"
          }`}
        >
          <path
            d="M18 24 L82 24 C84 34, 84 44, 82 48 L56 48 L76 78 L64 78 L44 52 C39 64, 30 73, 23 78 L18 73 C28 66, 36 57, 40 48 L18 48 C16 43, 16 33, 18 24 Z"
          />
          <circle cx="26" cy="35" r="2.8" className="fill-current" />
          <circle cx="35" cy="35" r="2.8" className="fill-current" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      {showText && (
        <span
          className={`font-semibold uppercase font-sans select-none ${dimensions.text} ${
            variant === "light"
              ? "text-white"
              : variant === "dark"
              ? "text-zinc-950"
              : "text-zinc-900 dark:text-zinc-50"
          }`}
        >
          Kark<span className="font-light opacity-80">Tech</span>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group inline-flex items-center" aria-label="KarkTech Home">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
