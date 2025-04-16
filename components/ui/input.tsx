import * as React from "react";
import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type: string;
  prefixLabel?: string;
  valuePrefix?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefixLabel, valuePrefix, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <>
        {type === "password" ? (
          <div className="relative w-full flex flex-row items-center">
            <input
              type={type === "password" && showPassword ? "text" : type}
              className={clsx(
                "flex h-10 w-full rounded-md border focus:border-green-600 bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}
              ref={ref}
              {...props}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0  flex items-center px-3 text-sm text-muted-foreground"
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
        ) : type === "amount" ? (
          <div
            className={`px-4 flex bg-background flex-row w-full border-[2px] items-center rounded-md ${className} ${
              isFocused ? "border-green-600" : ""
            } w-full ${className} `}
          >
            <span className="text-sm md:text-sm font-semibold">Rp.</span>
            <div className="border border-gray-300 h-[30px] ml-4 w-fit"></div>
            <input
              type={"text"}
              className={clsx(
                `flex h-10 w-full rounded-md focus:border-green-600 text-sm bg-background px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none   disabled:cursor-not-allowed disabled:opacity-50`
              )}
              ref={ref}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
          </div>
        ) : type === "file" ? (
          <div className="relative w-full">
            <input type="file" className="hidden" ref={ref} {...props} />
            <label
              htmlFor={props.id || "file-upload"}
              className={clsx(
                "flex h-fit w-full cursor-pointer rounded-md border border-input  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-100",
                className
              )}
            >
              {props?.value ? (props.value as string) : "Pilih File"}
            </label>
          </div>
        ) : (
          <div
            className={`${
              prefixLabel || valuePrefix
                ? `flex bg-background flex-row w-full border-[2px] items-center rounded-md ${className} ${
                    isFocused ? "border-green-600" : ""
                  }`
                : ` w-full flex flex-row rounded-md bg-background ${className} `
            }`}
          >
            {prefixLabel && (
              <div
                className={`text-black py-2 px-2 bg-background font-medium text-xs rounded-l-md `}
              >
                {prefixLabel}
              </div>
            )}

            <input
              type={type}
              className={clsx(
                `flex h-10 w-full  ${
                  prefixLabel || valuePrefix
                    ? "rounded-r-md md:text-sm text-xs"
                    : "rounded-md focus:border-green-600 text-sm"
                } border  bg-background px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none   disabled:cursor-not-allowed disabled:opacity-50`
              )}
              ref={ref}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
          </div>
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
