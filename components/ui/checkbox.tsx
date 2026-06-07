import { ICheckbox } from "@/types/type";

export default function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
  id,
  name,
  error = false,
}: ICheckbox) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-start gap-2">
        {/* Input stays accessible */}
        <div className="relative mt-1 flex items-center">
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
            className="absolute opacity-0 w-4 h-4 cursor-pointer"
          />

          {/* Custom box */}
          <label
            htmlFor={id}
            className={`
              flex h-4 w-4 items-center justify-center rounded border cursor-pointer transition-all duration-200
              ${
                checked
                  ? "bg-[#7f22fe] border-[#7f22fe]"
                  : "bg-white border-gray-300"
              }
              ${error ? "border-red-500" : ""}
              ${disabled ? "cursor-not-allowed opacity-50" : ""}
            `}
          >
            {checked && (
              <svg
                viewBox="0 0 24 24"
                className="w-3 h-3 text-white"
                fill="none"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </label>
        </div>

        {/* Text label */}
        {label && (
          <label
            htmlFor={id}
            className={`text-sm font-medium select-none ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } text-gray-700`}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
}
