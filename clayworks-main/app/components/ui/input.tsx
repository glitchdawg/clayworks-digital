import type * as React from "react";
import { cn } from "./util";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-gray-500 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md px-3 py-3 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-[#E07B39] focus-visible:shadow-[0_0_0_1.5px_#E07B39]",
        "aria-invalid:border-red-500 aria-invalid:shadow-[0_0_0_1.5px_rgba(239,68,68,0.5)]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
