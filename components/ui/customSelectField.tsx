"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectFieldProps {
  label?: string;
  name?: string;
  id?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  placeholder?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  containerClassName?: string;
}

/**
 * A fully custom-styled select — a branded trigger button plus a custom
 * dropdown panel (not the browser's native `<option>` list). Used where the
 * native SelectField's default dropdown would look out of place.
 */
export default function CustomSelectField({
  label,
  name,
  id,
  required = false,
  error = false,
  errorMessage,
  helperText,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  onBlur,
  disabled = false,
  containerClassName = "",
}: CustomSelectFieldProps) {
  const selectId = id || name || label;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, onBlur]);

  const commit = (val: string) => {
    onChange(val);
    setOpen(false);
    onBlur?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (options[active]) commit(options[active].value);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapRef}
      className={`relative flex flex-col gap-2.5 ${containerClassName}`}
    >
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
        <button
          type="button"
          id={selectId}
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`
            w-full text-left px-4 py-2.5 pr-11 text-sm rounded-lg
            bg-white/40 backdrop-blur-xl
            border-[1.5px] ${error ? "border-red-400" : "border-[#7f22fe]/60"}
            shadow-sm transition-all duration-300 ease-out
            hover:border-[#7f22fe]/80
            focus:outline-none focus:bg-white/55 focus:border-[#7f22fe]
            focus:ring-2 focus:ring-[#7f22fe]/30
            focus:shadow-[0_0_10px_rgba(127,34,254,0.4),0_0_25px_rgba(127,34,254,0.45),0_0_45px_rgba(127,34,254,0.2)]
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${selected ? "text-gray-900" : "text-gray-500"}
          `}
        >
          {selected ? selected.label : placeholder}
        </button>
        <div className="absolute right-4 text-[#7f22fe]/70 group-focus-within:text-[#7f22fe] transition-colors pointer-events-none flex items-center">
          <ChevronDown
            size={16}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {open && (
        <div
          role="listbox"
          className="absolute top-full left-0 right-0 z-30 mt-1 max-h-60 overflow-y-auto rounded-xl bg-white shadow-lg border border-gray-100 py-1"
        >
          {options.map((opt, idx) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              onClick={() => commit(opt.value)}
              onMouseEnter={() => setActive(idx)}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left transition-colors ${
                idx === active
                  ? "bg-violet-50 text-violet-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {opt.label}
              {opt.value === value && (
                <Check size={14} className="text-violet-600 shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}

      {error && errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
      {helperText && !(error && errorMessage) && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
