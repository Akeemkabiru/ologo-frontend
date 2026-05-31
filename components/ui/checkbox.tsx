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
  errorMessage,
}: ICheckbox) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-start gap-2">
        <input
          id={id}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className={`mt-1 h-4 w-4 rounded border ${
            error ? "border-red-500" : "border-gray-300"
          } ${
            checked ? "bg-violet-500 border-violet-500" : "bg-white"
          } cursor-pointer ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        />
        {label && (
          <label
            htmlFor={id}
            className={`text-sm font-medium ${
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            } ${error ? "text-gray-700" : "text-gray-700"}`}
          >
            {label}
          </label>
        )}
      </div>
      {error && errorMessage && (
        <p className="text-sm text-gray-700">{errorMessage}</p>
      )}
    </div>
  );
}
