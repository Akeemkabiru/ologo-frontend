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
  errorMessage,
  className = "",
  containerClassName = "",
  autoComplete,
  maxLength,
  minLength,
  pattern,
  readOnly = false,
  icon,
  rightIcon,
  ...rest
}: IInputField) {
  const inputId = id || name || placeholder;

  return (
    <div className={`flex flex-col gap-2.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`text-sm font-600 ${
            required ? "after:content-['*'] after:ml-1 after:text-gray-700" : ""
          } ${error ? "text-gray-700" : "text-gray-800"}`}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-gray-400 flex items-center">
            {icon}
          </div>
        )}
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
          className={`w-full px-4 py-3 border rounded-lg text-base font-500 transition-all ${
            icon ? "pl-11" : ""
          } ${rightIcon ? "pr-11" : ""} ${
            error
              ? "border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 text-gray-900 placeholder:text-gray-400"
              : "border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500"
          } ${
            disabled
              ? "bg-gray-100 cursor-not-allowed text-gray-500 placeholder:text-gray-400"
              : "bg-white"
          } ${className}`}
          {...rest}
        />
        {rightIcon && (
          <div className="absolute right-4 text-gray-400 cursor-pointer flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && errorMessage && (
        <p className="text-sm font-500 text-gray-700 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
