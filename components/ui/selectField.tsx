import { ChevronDown } from "lucide-react";

interface SelectOption {
  label: string;
  value: string;
}

interface ISelectField {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  containerClassName?: string;
  placeholder?: string;
  options: SelectOption[];
}

export default function SelectField({
  label,
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
  placeholder = "Select an option",
  options,
}: ISelectField) {
  const selectId = id || name || label;

  return (
    <div className={`flex flex-col gap-2.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={selectId}
          className={`text-sm font-medium ${
            required ? "after:content-['*'] after:ml-1 after:text-gray-700" : ""
          } ${error ? "text-red-500" : "text-gray-800"}`}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center group">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={`
            w-full appearance-none px-4 py-2.5 pr-11 text-sm rounded-lg

            /* BASE (VISIBLE BRAND BORDER) */
            bg-white/40 backdrop-blur-xl
            border-[1.5px] ${error ? "border-red-400" : "border-[#7f22fe]/60"}

            text-gray-900

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

            ${className}
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute right-4 text-[#7f22fe]/70 group-focus-within:text-[#7f22fe] transition-colors pointer-events-none flex items-center">
          <ChevronDown size={16} />
        </div>
      </div>

      {error && errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
