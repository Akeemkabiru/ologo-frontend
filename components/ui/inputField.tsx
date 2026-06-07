import { IInputField } from "@/types/type";

export default function InputField({
  type = "text",
  label,
  placeholder = "",
  value,
  onChange,
  onBlur,
  id,
  name,
  disabled = false,
  required = false,
  error = false,
  className = "",
  containerClassName = "",
  autoComplete,
  maxLength,
  minLength,
  pattern,
  readOnly = false,
  rightIcon,
  ...rest
}: IInputField) {
  const inputId = id || name || placeholder;

  return (
    <div className={`flex flex-col gap-2.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`text-sm font-medium ${
            required ? "after:content-['*'] after:ml-1 after:text-gray-700" : ""
          } `}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center group">
        <input
          id={inputId}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          readOnly={readOnly}
          className={`
            w-full px-4 py-2.5 text-sm rounded-2xl

            /* BASE (VISIBLE BRAND BORDER) */
            bg-white/40 backdrop-blur-xl
            border-[1.5px] border-[#7f22fe]/60

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
    </div>
  );
}
