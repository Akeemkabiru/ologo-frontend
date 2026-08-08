"use client";

import React, { useState } from "react";
import Checkbox from "@/components/ui/checkbox";
import SelectField from "@/components/ui/selectField";
import {
  CURRENCY_INFO,
  convertCurrency,
  conversionCharges,
  formatMoney,
} from "@/lib/currency";

/**
 * Reusable "pay from another wallet with currency conversion" option, shown in
 * payment flows (transfer, escrow deposit, donate, payment links) for when the
 * payer doesn't hold enough of the requested currency.
 */
export default function ConvertOption({
  amount,
  targetCurrency,
}: {
  amount: number;
  targetCurrency: string;
}) {
  const [convert, setConvert] = useState(false);
  const [payFrom, setPayFrom] = useState(
    CURRENCY_INFO.find((c) => c.code !== targetCurrency)?.code ?? "NGN",
  );

  const charges = conversionCharges(amount);
  const fromAmount = convertCurrency(amount + charges.total, targetCurrency, payFrom);

  return (
    <div>
      <Checkbox
        label={`Don't have enough ${targetCurrency}? Convert from another wallet`}
        name="convert"
        checked={convert}
        onChange={setConvert}
      />
      {convert && (
        <div className="mt-4 p-4 rounded-xl border border-gray-200 grid gap-3">
          <SelectField
            label="Pay from"
            value={payFrom}
            onChange={(e) => setPayFrom(e.target.value)}
            options={CURRENCY_INFO.filter((c) => c.code !== targetCurrency).map(
              (c) => ({ label: `${c.flag} ${c.code} wallet`, value: c.code }),
            )}
          />
          <div className="rounded-lg bg-violet-50 border border-violet-100 p-3 text-sm">
            <span className="text-gray-600">You&apos;ll pay about </span>
            <span className="font-bold text-violet-700">
              {formatMoney(fromAmount, payFrom)}
            </span>
            <span className="text-gray-600">
              {" "}
              from your {payFrom} wallet (incl. conversion charge)
            </span>
          </div>
          <p className="text-[11px] text-amber-700">
            Conversion charges vary with live rates and platform fees.
          </p>
        </div>
      )}
    </div>
  );
}
