import React from "react";
import { Input, InputProps } from "../ui/input";
import { cn } from "@/lib/utils";

const SrInput = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
  }
>(({ className, type, prefixIcon, suffixIcon, ...props }, ref) => {
  return (
    <div className="relative">
      {prefixIcon && (
        <div className="absolute left-2 top-0 flex h-full items-center">
          <span className="text-muted-foreground">{prefixIcon}</span>
        </div>
      )}
      <Input
        ref={ref}
        className={cn(
          {
            "pl-4": prefixIcon,
            "pr-4": suffixIcon,
          },
          className,
        )}
        {...props}
      />
      {suffixIcon && (
        <div className="absolute right-2 top-0 flex h-full items-center">
          <span className="text-muted-foreground">{suffixIcon}</span>
        </div>
      )}
    </div>
  );
});

SrInput.displayName = "SrInput";

export default SrInput;
