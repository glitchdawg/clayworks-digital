import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./util";

interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  label?: string;
  error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, children, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-inter-medium text-black mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full px-4 py-3 rounded-lg appearance-none text-sm font-inter-normal text-gray-900",
              "bg-[#F9F9F9] border border-[#E0E0E0]",
              "focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39]",
              "transition-all cursor-pointer",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error &&
                "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_1.5px_rgba(239,68,68,0.5)]",
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5"
            aria-hidden="true"
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 font-inter-normal">{error}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
