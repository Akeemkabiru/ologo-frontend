interface ITextareaField {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  className?: string;
  containerClassName?: string;
  rows?: number;
}

export default function TextareaField({
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
  helperText,
  className = "",
  containerClassName = "",
  rows = 4,
}: ITextareaField) {
  const textareaId = id || name || label;

  return (
    <div className={`flex flex-col gap-2.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className={`text-sm font-medium ${
            required ? "after:content-['*'] after:ml-1 after:text-gray-700" : ""
          } ${error ? "text-red-500" : "text-gray-800"}`}
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`
          w-full px-4 py-2.5 text-sm rounded-lg resize-none

          bg-white/40 backdrop-blur-xl
          border-[1.5px] ${error ? "border-red-400" : "border-[#7f22fe]/60"}

          text-gray-900 placeholder:text-gray-500

          shadow-sm
          transition-all duration-300 ease-out

          hover:border-[#7f22fe]/80

          focus:outline-none
          focus:bg-white/55
          focus:border-[#7f22fe]
          focus:ring-2 focus:ring-[#7f22fe]/30
          focus:shadow-[0_0_10px_rgba(127,34,254,0.4),0_0_25px_rgba(127,34,254,0.45),0_0_45px_rgba(127,34,254,0.2)]

          disabled:bg-gray-100
          disabled:text-gray-500
          disabled:border-gray-300
          disabled:cursor-not-allowed

          ${className}
        `}
      />

      {error && errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
      {helperText && !(error && errorMessage) && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
