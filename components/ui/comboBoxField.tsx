"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface ComboBoxFieldProps {
  label?: string;
  name?: string;
  id?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  /** Allow the typed value even if it isn't in the options list. */
  allowCustom?: boolean;
  disabled?: boolean;
  containerClassName?: string;
}

/**
 * A field that lets the user type & search OR pick from a dropdown list.
 * Used for Country and State/Province selection on the sign-up form.
 */
export default function ComboBoxField({
  label,
  name,
  id,
  required = false,
  error = false,
  errorMessage,
  helperText,
  placeholder = "Type or select",
  options,
  value,
  onChange,
  onBlur,
  allowCustom = true,
  disabled = false,
  containerClassName = "",
}: ComboBoxFieldProps) {
  const inputId = id || name || label;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // When closed, show the selected value; when open, show what's being typed.
  const display = open ? query : value;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [query, options]);

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
    setQuery("");
    setOpen(false);
    onBlur?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[active]) commit(filtered[active]);
      else if (allowCustom && query.trim()) commit(query.trim());
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
          htmlFor={inputId}
          className={`text-sm font-medium ${
            required ? "after:content-['*'] after:ml-1 after:text-gray-700" : ""
          } ${error ? "text-red-500" : "text-gray-800"}`}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center group">
        <input
          id={inputId}
          name={name}
          autoComplete="off"
          disabled={disabled}
          value={display}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            if (!open) setOpen(true);
            if (allowCustom) onChange(e.target.value);
          }}
          onFocus={() => {
            setQuery("");
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className={`
            w-full px-4 py-2.5 pr-11 text-sm rounded-lg
            bg-white/40 backdrop-blur-xl
            border-[1.5px] ${error ? "border-red-400" : "border-[#7f22fe]/60"}
            text-gray-900 placeholder:text-gray-500
            shadow-sm transition-all duration-300 ease-out
            hover:border-[#7f22fe]/80
            focus:outline-none focus:bg-white/55 focus:border-[#7f22fe]
            focus:ring-2 focus:ring-[#7f22fe]/30
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
          `}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => {
            if (disabled) return;
            setQuery("");
            setOpen((o) => !o);
          }}
          className="absolute right-4 text-[#7f22fe]/70 group-focus-within:text-[#7f22fe] transition-colors"
          aria-label="Toggle options"
        >
          <ChevronDown
            size={16}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 z-30 mt-1 max-h-60 overflow-y-auto rounded-xl bg-white shadow-lg border border-gray-100 py-1">
          {filtered.length > 0 ? (
            filtered.map((opt, idx) => (
              <button
                key={opt}
                type="button"
                onClick={() => commit(opt)}
                onMouseEnter={() => setActive(idx)}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left transition-colors ${
                  idx === active
                    ? "bg-violet-50 text-violet-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {opt}
                {opt === value && (
                  <Check size={14} className="text-violet-600 shrink-0" />
                )}
              </button>
            ))
          ) : allowCustom && query.trim() ? (
            <button
              type="button"
              onClick={() => commit(query.trim())}
              className="w-full px-3 py-2 text-sm text-left text-violet-700 hover:bg-violet-50"
            >
              Use “{query.trim()}”
            </button>
          ) : (
            <p className="px-3 py-2 text-sm text-gray-400">No matches</p>
          )}
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
