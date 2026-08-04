"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

/* ------------------------------- Cash Flow -------------------------------- */

interface CashFlowPoint {
  month: string;
  income: number;
  expense: number;
}

const CASH_FLOW: CashFlowPoint[] = [
  { month: "Jan", income: 3200, expense: 1800 },
  { month: "Feb", income: 2400, expense: 2100 },
  { month: "Mar", income: 4100, expense: 1500 },
  { month: "Apr", income: 3600, expense: 2600 },
  { month: "May", income: 2900, expense: 1200 },
  { month: "Jun", income: 4300, expense: 2000 },
];

export function CashFlowChart() {
  const max = Math.max(...CASH_FLOW.flatMap((d) => [d.income, d.expense]));
  // Y-axis reference lines (rounded up to a clean ceiling)
  const ceiling = Math.ceil(max / 1000) * 1000;
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(ceiling * f));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900">Cash Flow</h3>
          <p className="text-xs text-gray-400 mt-0.5">Last 6 months</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-600" />
            Income
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-200" />
            Expense
          </span>
        </div>
      </div>

      <div className="flex gap-3 flex-1 items-center min-h-70">
        {/* Y axis labels */}
        <div className="flex flex-col justify-between text-[10px] text-gray-300 h-full py-0.5">
          {[...gridLines].reverse().map((value) => (
            <span key={value}>{value >= 1000 ? `${value / 1000}k` : value}</span>
          ))}
        </div>

        {/* Plot area */}
        <div className="relative flex-1 h-full">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {gridLines.map((value) => (
              <span key={value} className="border-t border-dashed border-gray-100" />
            ))}
          </div>

          {/* Bars */}
          <div className="relative flex items-end justify-between h-full gap-2">
            {CASH_FLOW.map((point) => (
              <div
                key={point.month}
                className="group flex-1 flex flex-col items-center gap-2"
              >
                <div className="relative flex items-end justify-center gap-1 w-full h-full">
                  <Bar
                    heightPct={(point.income / ceiling) * 100}
                    className="bg-violet-600"
                    label={`+$${point.income.toLocaleString()}`}
                  />
                  <Bar
                    heightPct={(point.expense / ceiling) * 100}
                    className="bg-violet-200"
                    label={`-$${point.expense.toLocaleString()}`}
                  />
                </div>
                <span className="text-[11px] text-gray-400 font-medium">
                  {point.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bar({
  heightPct,
  className,
  label,
}: {
  heightPct: number;
  className: string;
  label: string;
}) {
  return (
    <div className="relative flex-1 max-w-[14px] h-full flex items-end">
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: `${heightPct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`w-full rounded-t-md ${className}`}
      />
      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </div>
  );
}

/* ---------------------------- Spending Donut ------------------------------ */

interface Slice {
  label: string;
  value: number;
  color: string;
}

const SPENDING: Slice[] = [
  { label: "Transfers", value: 1425, color: "#7f22fe" },
  { label: "Shopping", value: 470, color: "#c4b5fd" },
  { label: "Travel", value: 320, color: "#34d399" },
  { label: "Other", value: 185, color: "#312e81" },
];

export function SpendingDonut() {
  const [active, setActive] = useState<number | null>(null);
  const total = SPENDING.reduce((sum, s) => sum + s.value, 0);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offsetAcc = 0;

  const focused = active === null ? null : SPENDING[active];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-bold text-gray-900">Spending</h3>
          <p className="text-xs text-gray-400 mt-0.5">This month</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-44 h-44">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
            {SPENDING.map((slice, i) => {
              const fraction = slice.value / total;
              const dash = fraction * circumference;
              const gap = circumference - dash;
              const circle = (
                <motion.circle
                  key={slice.label}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth={active === i ? 20 : 16}
                  strokeDasharray={`${dash} ${gap}`}
                  strokeDashoffset={-offsetAcc}
                  strokeLinecap="butt"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="cursor-pointer transition-[stroke-width] duration-200"
                />
              );
              offsetAcc += dash;
              return circle;
            })}
          </svg>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-gray-900">
              ${(focused ? focused.value : total).toLocaleString()}
            </p>
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">
              {focused ? focused.label : "Total spent"}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mt-6 w-full">
          {SPENDING.map((slice, i) => (
            <button
              key={slice.label}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={`flex items-center justify-between text-left transition-opacity ${
                active !== null && active !== i ? "opacity-40" : "opacity-100"
              }`}
            >
              <span className="flex items-center gap-2 text-xs text-gray-600">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                {slice.label}
              </span>
              <span className="text-xs font-semibold text-gray-900">
                {Math.round((slice.value / total) * 100)}%
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
