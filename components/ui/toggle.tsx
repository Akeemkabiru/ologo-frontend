import { IToggle } from "@/types/type";

export default function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}: IToggle) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-violet-500" : "bg-gray-300"
        } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      {label && (
        <label
          onClick={() => !disabled && onChange(!checked)}
          className={`text-sm font-medium ${
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
