// import React from "react";

// export function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
//   return (
//     <button
//       className={`rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "primary" | "secondary"; // Define allowed variants
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md px-4 py-2 text-white focus:outline-none",
          variant === "primary" ? "bg-blue-500 hover:bg-blue-600" : "",
          variant === "ghost" ? "bg-transparent text-gray-700 hover:bg-gray-100" : "",
          variant === "secondary" ? "bg-gray-500 hover:bg-gray-600" : "",
          className || "" // Ensure className is a string
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
