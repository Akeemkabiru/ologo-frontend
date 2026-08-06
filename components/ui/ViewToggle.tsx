"use client";

import { LayoutGrid, List } from "lucide-react";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

const options = [
  { mode: "grid" as const, Icon: LayoutGrid, label: "Grid view" },
  { mode: "list" as const, Icon: List, label: "List view" },
];

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-white rounded-full p-1 border border-gray-100 shadow-sm shrink-0">
      {options.map(({ mode, Icon, label }) => (
        <button
          key={mode}
          type="button"
          onClick={() => onChange(mode)}
          aria-label={label}
          aria-pressed={value === mode}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            value === mode
              ? "bg-violet-600 text-white shadow-sm"
              : "text-gray-400 hover:text-violet-600"
          }`}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
}
