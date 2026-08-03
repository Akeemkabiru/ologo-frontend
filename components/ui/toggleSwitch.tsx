"use client";

import { useId } from "react";
import { motion } from "framer-motion";

interface ToggleOption<T extends string> {
  label: string;
  value: T;
}

interface ToggleSwitchProps<T extends string> {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  options: [ToggleOption<T>, ToggleOption<T>];
  containerClassName?: string;
}

export default function ToggleSwitch<T extends string>({
  label,
  value,
  onChange,
  options,
  containerClassName = "",
}: ToggleSwitchProps<T>) {
  const layoutId = useId();

  return (
    <div className={`flex flex-col gap-2.5 ${containerClassName}`}>
      {label && (
        <span className="text-sm font-medium text-gray-800">{label}</span>
      )}
      <div className="relative inline-flex bg-gray-100 rounded-full p-1 w-fit">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                active ? "text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {active && (
                <motion.span
                  layoutId={`toggle-switch-${layoutId}`}
                  className="absolute inset-0 bg-violet-600 rounded-full -z-10"
                  transition={{ type: "spring", duration: 0.35, bounce: 0.2 }}
                />
              )}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
