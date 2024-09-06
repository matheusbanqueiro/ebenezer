import { cn } from "@/lib/utils";
import {
  ExclamationCircleIcon,
  EyeDropperIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import React, { memo, useState } from "react";
import { twMerge } from "tailwind-merge";


interface ValidateInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  errorMessage?: string;
  full?: boolean;
}

const ValidateInput = React.forwardRef<HTMLInputElement, ValidateInputProps>(
  (
    { disabled = false, errorMessage, full = false, className, type, ...props },
    ref
  ) => {
    const [inputType, setInputType] = useState(type);

    return (
      <div className={`relative ${full ? "w-full" : ""}`}>
        <input
          disabled={disabled}
          type={inputType}
          className={cn(
            `flex h-10 w-full rounded-md dark:bg-slate-900 bg-slate-100 ring-2 dark:ring-slate-600 ring-slate-200 ring-offset-0 focus:outline-none focus:ring-2 focus:ring-slate-500/80 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
        {disabled && (
          <LockClosedIcon className="w-5 h-5 absolute right-3 top-2 text-slate-400" />
        )}
        {errorMessage && (
          <ExclamationCircleIcon className="w-5 h-5 absolute right-4 top-2.5 dark:text-red-500 text-red-500" />
        )}
        {errorMessage && (
          <div className="dark:text-red-500 text-red-500 mt-1.5 text-sm">
            {errorMessage}
          </div>
        )}
        {type === "password" && inputType === "password" && (
          <EyeIcon
            onClick={() => setInputType("text")}
            className={`w-5 h-5 absolute ${errorMessage ? "right-10" : "right-4"
              } top-2.5 text-slate-600 cursor-pointer `}
          />
        )}
        {type === "password" && inputType === "text" && (
          <EyeSlashIcon
            onClick={() => setInputType("password")}
            className={`w-5 h-5 absolute  ${errorMessage ? "right-10" : "right-4"
              } top-2.5 text-slate-600   cursor-pointer`}
          />
        )}
      </div>
    );
  }
);

ValidateInput.displayName = "ValidateInput";

export { ValidateInput };