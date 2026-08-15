"use client";

import React, { useMemo, useState } from "react";
import { ArrowDown, CheckCircle2, Info } from "lucide-react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import { FormButton } from "@/components/forms/FormComponents";
import {
  CURRENCY_INFO,
  convertCurrency,
  conversionCharges,
  formatMoney,
  getCurrency,
} from "@/lib/currency";
import { walletBalances, getBalance } from "@/data/wallets";
import { DEFAULT_TAX_RATE_PERCENTAGE } from "@/lib/constants";

interface ExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExchangeModal({ isOpen, onClose }: ExchangeModalProps) {
  const fundedWallets = walletBalances.filter((w) => w.balance > 0);
  const [from, setFrom] = useState(fundedWallets[0]?.code ?? "USD");
  const [to, setTo] = useState(
    CURRENCY_INFO.find((c) => c.code !== (fundedWallets[0]?.code ?? "USD"))
      ?.code ?? "USD",
  );
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const available = getBalance(from);
  const numericAmount = Number(amount) || 0;

  const { charges, tax, received, totalDebit } = useMemo(() => {
    const charges = conversionCharges(numericAmount);
    const tax = (numericAmount * DEFAULT_TAX_RATE_PERCENTAGE) / 100;
    const received = convertCurrency(numericAmount, from, to);
    const totalDebit = numericAmount + charges.total + tax;
    return { charges, tax, received, totalDebit };
  }, [numericAmount, from, to]);

  const insufficient = totalDebit > available;
  const sameCurrency = from === to;

  const swapDisabled =
    numericAmount <= 0 || insufficient || sameCurrency || submitting;

  const handleClose = () => {
    if (submitting) return;
    setAmount("");
    setDone(false);
    onClose();
  };

  const handlePay = async () => {
    if (swapDisabled) return;
    setSubmitting(true);
    console.log("Currency conversion:", {
      from,
      to,
      amount: numericAmount,
      charges,
      received,
      totalDebit,
    });
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} maxWidthClassName="max-w-md">
        <div className="text-center py-2">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={30} className="text-emerald-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Conversion Complete</h2>
          <p className="text-sm text-gray-500 mt-1">
            {formatMoney(numericAmount, from)} converted to{" "}
            {formatMoney(received, to)} in your {to} wallet.
          </p>
          <FormButton
            type="button"
            size="lg"
            onClick={handleClose}
            className="w-full mt-6"
          >
            Done
          </FormButton>
        </div>
      </Modal>
    );
  }

  const toOptions = CURRENCY_INFO.filter((c) => c.code !== from);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Convert Currency"
      description="Move money between your currency wallets"
      maxWidthClassName="max-w-md"
    >
      <div className="grid gap-4">
        {/* From */}
        <div>
          <SelectField
            label="From wallet"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            options={fundedWallets.map((w) => ({
              label: `${getCurrency(w.code).flag} ${w.code} — ${formatMoney(
                w.balance,
                w.code,
              )}`,
              value: w.code,
            }))}
          />
          <p className="text-xs text-gray-400 mt-1.5">
            Available: {formatMoney(available, from)}
          </p>
        </div>

        <InputField
          label={`Amount to convert (${from})`}
          type="number"
          inputMode="decimal"
          icon={
            <span className="text-sm text-gray-500">
              {getCurrency(from).symbol}
            </span>
          }
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={insufficient}
          errorMessage={insufficient ? "Amount + charges exceed balance" : undefined}
        />

        <div className="flex justify-center">
          <span className="w-9 h-9 rounded-full bg-violet-50 flex items-center justify-center text-violet-600">
            <ArrowDown size={16} />
          </span>
        </div>

        {/* To */}
        <SelectField
          label="To wallet"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          options={toOptions.map((c) => ({
            label: `${c.flag} ${c.code} wallet`,
            value: c.code,
          }))}
        />

        {/* Summary */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2 text-sm">
          <Row label="You convert" value={formatMoney(numericAmount, from)} />
          <Row
            label="Gateway charge (1.5%)"
            value={formatMoney(charges.gateway, from)}
            muted
          />
          <Row
            label="Platform charge (0.5%)"
            value={formatMoney(charges.platform, from)}
            muted
          />
          <div className="border-t border-gray-200 pt-2">
            <Row
              label="Total processing fee"
              value={formatMoney(charges.total, from)}
              bold
            />
            <Row
              label={`Tax (${DEFAULT_TAX_RATE_PERCENTAGE}%)`}
              value={formatMoney(tax, from)}
              muted
            />
          </div>
          <div className="border-t border-gray-200 pt-2">
            <Row
              label={`You receive (${to})`}
              value={formatMoney(received, to)}
              highlight
            />
            <Row
              label="Total debited"
              value={formatMoney(totalDebit, from)}
              muted
            />
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-100 p-3">
          <Info size={15} className="text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800">
            Conversion charges vary with live gateway rates and platform fees,
            so the final amount may differ slightly.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-1">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleClose}
            disabled={submitting}
            className="sm:flex-1"
          >
            Cancel
          </FormButton>
          <FormButton
            type="button"
            size="lg"
            loading={submitting}
            disabled={swapDisabled}
            onClick={handlePay}
            className="sm:flex-1"
          >
            Pay / Transfer
          </FormButton>
        </div>
      </div>
    </Modal>
  );
}

function Row({
  label,
  value,
  muted,
  bold,
  highlight,
}: {
  label: string;
  value: string;
  muted?: boolean;
  bold?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? "text-gray-500" : "text-gray-700"}>{label}</span>
      <span
        className={
          highlight
            ? "font-bold text-violet-600"
            : bold
              ? "font-bold text-gray-900"
              : muted
                ? "text-gray-600"
                : "font-medium text-gray-900"
        }
      >
        {value}
      </span>
    </div>
  );
}
