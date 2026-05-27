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
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`text-sm font-medium ${
            required ? "after:content-['*'] after:ml-1 after:text-red-500" : ""
          } ${error ? "text-red-500" : "text-gray-700"}`}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3 text-gray-400">{icon}</div>}
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
          className={`w-full px-3 py-2 border rounded-full transition-colors ${
            icon ? "pl-10" : ""
          } ${rightIcon ? "pr-10" : ""} ${
            error
              ? "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          } ${
            disabled
              ? "bg-gray-100 cursor-not-allowed text-gray-500"
              : "bg-white"
          } ${className}`}
          {...rest}
        />
        {rightIcon && (
          <div className="absolute right-3 text-gray-400 cursor-pointer">
            {rightIcon}
          </div>
        )}
      </div>
      {error && errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
