import React from "react";

type InputFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className"
> & {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  containerClassName?: string;
};

export default function InputField({
  type = "text",
  label,
  id,
  name,
  required = false,
  error = false,
  errorMessage,
  helperText,
  className = "",
  containerClassName = "",
  icon,
  rightIcon,
  ...rest
}: InputFieldProps) {
  const inputId = id || name;

  return (
    <div className={`flex flex-col gap-2.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`text-sm font-medium ${
            required ? "after:content-['*'] after:ml-1 after:text-gray-700" : ""
          } ${error ? "text-red-500" : "text-gray-800"}`}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center group">
        {icon && (
          <div className="absolute left-4 text-[#7f22fe]/70 group-focus-within:text-[#7f22fe] transition-colors flex items-center">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          name={name}
          required={required}
          className={`
            w-full px-4 py-2.5 text-sm rounded-lg

            /* BASE (VISIBLE BRAND BORDER) */
            bg-white/40 backdrop-blur-xl
            border-[1.5px] ${error ? "border-red-400" : "border-[#7f22fe]/60"}

            text-gray-900 placeholder:text-gray-500

            shadow-sm
            transition-all duration-300 ease-out

            /* HOVER (slightly stronger border) */
            hover:border-[#7f22fe]/80

            /* FOCUS (NEON MOMENT) */
            focus:outline-none
            focus:bg-white/55
            focus:border-[#7f22fe]
            focus:ring-2 focus:ring-[#7f22fe]/30
            focus:shadow-[0_0_10px_rgba(127,34,254,0.4),0_0_25px_rgba(127,34,254,0.45),0_0_45px_rgba(127,34,254,0.2)]

            /* DISABLED */
            disabled:bg-gray-100
            disabled:text-gray-500
            disabled:border-gray-300
            disabled:cursor-not-allowed

            ${icon ? "pl-11" : ""}
            ${rightIcon ? "pr-11" : ""}
            ${className}
          `}
          {...rest}
        />

        {rightIcon && (
          <div className="absolute right-4 text-[#7f22fe]/70 group-focus-within:text-[#7f22fe] transition-colors flex items-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error && errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
      {helperText && !(error && errorMessage) && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
