import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ errorMessage, className, ...props }, ref) => {

    return (
      <>
        <textarea
          className={cn(
            `flex min-h-[80px] w-full rounded-md dark:bg-slate-900 bg-slate-100 ring-2 dark:ring-slate-600 ring-slate-200 ring-offset-0 focus:outline-none px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus:ring-slate-500/80 disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <div className="dark:text-red-500 text-red-500 text-sm">
            {errorMessage}
          </div>
        )}
      </>

    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };