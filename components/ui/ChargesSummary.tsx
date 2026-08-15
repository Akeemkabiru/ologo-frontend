"use client";

import React from "react";
import { Info } from "lucide-react";
import { calculateCharges } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

interface ChargesSummaryProps {
  /** Base amount the charges are computed against. */
  amount: number;
  /** Currency code, e.g. "USD". */
  currency?: string;
  /** Tax rate percentage. Pass 0 for tax-exempt actions. */
  taxRate?: number;
  /** Label for the base amount row. */
  amountLabel?: string;
  /** Label for the final total row. */
  totalLabel?: string;
  /** Who settles the charges & tax — shown as a small note. */
  payer?: "you" | "recipient" | "payer";
  className?: string;
}

/**
 * Shared charges & tax breakdown. Shows the total processing fee (API +
 * admin-set general & per-user fees combined) and tax separately, then a total.
 * Used across top-up, transfer, request, convert, withdrawal, KYC and
 * verification forms so charges are surfaced consistently.
 */
export default function ChargesSummary({
  amount,
  currency = "USD",
  taxRate,
  amountLabel = "Amount",
  totalLabel = "Total",
  payer,
  className = "",
}: ChargesSummaryProps) {
  const breakdown = calculateCharges(amount, taxRate);
  const money = (n: number) => formatCurrency(n, currency);

  const payerNote =
    payer === "recipient"
      ? "The recipient will pay these charges & tax."
      : payer === "payer"
        ? "The payer will pay these charges & tax."
        : "These charges & tax will be applied to your transaction.";

  return (
    <div
      className={`rounded-xl border border-gray-200 bg-gray-50/70 p-4 ${className}`}
    >
      <p className="text-sm font-semibold text-gray-800 mb-3">
        Charges &amp; tax
      </p>
      <dl className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-gray-600">{amountLabel}</dt>
          <dd className="font-medium text-gray-900">{money(breakdown.amount)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-gray-600">Processing fee</dt>
          <dd className="font-medium text-gray-900">
            {money(breakdown.processingFee)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-gray-600">
            Tax
            {taxRate === 0 && <span className="text-gray-400"> (exempt)</span>}
          </dt>
          <dd className="font-medium text-gray-900">
            {money(breakdown.taxAmount)}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-2">
          <dt className="font-medium text-gray-700">{totalLabel}</dt>
          <dd className="font-bold text-violet-700">{money(breakdown.total)}</dd>
        </div>
      </dl>
      <div className="flex items-start gap-2 mt-3">
        <Info size={14} className="text-gray-400 mt-0.5 shrink-0" />
        <p className="text-xs text-gray-500">{payerNote}</p>
      </div>
    </div>
  );
}
