"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  CalendarClock,
} from "lucide-react";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import Checkbox from "@/components/ui/checkbox";
import ToggleSwitch from "@/components/ui/toggleSwitch";
import { FormButton } from "@/components/forms/FormComponents";
import {
  CURRENCY_INFO,
  convertCurrency,
  formatMoney,
  getCurrency,
} from "@/lib/currency";
import { getPaymentLinkById } from "@/data/paymentLinks";

type Mode = "once" | "recurring";
type Result = "pending" | "paid" | "declined";

export default function PayPage() {
  const { id } = useParams<{ id: string }>();
  const link = getPaymentLinkById(id);

  const [amount, setAmount] = useState(String(link.amount));
  const [mode, setMode] = useState<Mode>("once");
  const [convert, setConvert] = useState(false);
  const [payFrom, setPayFrom] = useState(
    CURRENCY_INFO.find((c) => c.code !== link.currency)?.code ?? "NGN",
  );
  const [freqAmount, setFreqAmount] = useState("1");
  const [freqUnit, setFreqUnit] = useState("months");
  const [endAt, setEndAt] = useState("");
  const [result, setResult] = useState<Result>("pending");
  const [submitting, setSubmitting] = useState(false);

  const numericAmount = Number(amount) || 0;
  const converted = useMemo(
    () => convertCurrency(numericAmount, link.currency, payFrom),
    [numericAmount, link.currency, payFrom],
  );
  const hostSymbol = getCurrency(link.currency).symbol;

  const pay = async () => {
    if (numericAmount <= 0) return;
    setSubmitting(true);
    console.log("Paying link:", {
      id,
      amount: numericAmount,
      currency: link.currency,
      mode,
      payWith: convert ? { from: payFrom, converted } : link.currency,
      recurring:
        mode === "recurring"
          ? { every: freqAmount, unit: freqUnit, endsAt: endAt }
          : null,
    });
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setResult("paid");
  };

  if (result !== "pending") {
    const paid = result === "paid";
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              paid ? "bg-emerald-100" : "bg-rose-100"
            }`}
          >
            {paid ? (
              <CheckCircle2 size={34} className="text-emerald-600" />
            ) : (
              <XCircle size={34} className="text-rose-500" />
            )}
          </div>
          <h1 className="text-lg font-bold text-gray-900">
            {paid ? "Payment Successful" : "Payment Declined"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {paid
              ? `${formatMoney(numericAmount, link.currency)} sent to ${link.requesterName} for “${link.name}”.`
              : `You declined the request for “${link.name}”.`}
          </p>
          {paid && mode === "recurring" && (
            <p className="text-xs text-violet-600 mt-2">
              Recurring every {freqAmount} {freqUnit}
              {endAt ? ` until ${new Date(endAt).toLocaleString()}` : ""}.
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Brand bar */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-8 h-8 rounded-lg bg-violet-600 text-white font-bold flex items-center justify-center">
            O
          </span>
          <span className="font-bold text-gray-900">Ologo</span>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500">Payment Request</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Hero */}
          <div className="relative h-40">
            <img
              src={link.image}
              alt={link.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <div className="flex items-center gap-1.5 mb-1">
                <ShieldCheck size={14} />
                <span className="text-xs font-medium">Secure payment link</span>
              </div>
              <h1 className="text-lg font-bold">{link.name}</h1>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {/* Requester */}
            <div className="flex items-center gap-3 mb-5">
              <img
                src={link.requesterAvatar}
                alt={link.requesterName}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Requested by</p>
                <p className="text-sm font-semibold text-gray-900">
                  {link.requesterName}
                  {link.hostStatus === "co-host" && link.onBehalfOf && (
                    <span className="font-normal text-gray-500">
                      {" "}
                      · on behalf of {link.onBehalfOf}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {link.description && (
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                {link.description}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mb-5">
              <span className="inline-flex items-center gap-1">
                <CalendarClock size={13} />
                Due {link.dueAt}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock size={13} />
                {link.timezone}
              </span>
            </div>

            {link.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {link.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Pay mode */}
            <div className="mb-5">
              <ToggleSwitch
                variant="pill"
                value={mode}
                onChange={(v) => setMode(v as Mode)}
                options={[
                  { label: "Pay once", value: "once" },
                  { label: "Recurring", value: "recurring" },
                ]}
              />
            </div>

            {/* Editable amount */}
            <InputField
              label="Amount to pay (you can edit)"
              type="number"
              inputMode="decimal"
              icon={<span className="text-sm text-gray-500">{hostSymbol}</span>}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* Currency conversion */}
            <div className="mt-4">
              <Checkbox
                label={`Don't have enough ${link.currency}? Convert from another wallet`}
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
                    options={CURRENCY_INFO.filter(
                      (c) => c.code !== link.currency,
                    ).map((c) => ({
                      label: `${c.flag} ${c.code} wallet`,
                      value: c.code,
                    }))}
                  />
                  <div className="rounded-lg bg-violet-50 border border-violet-100 p-3 text-sm">
                    <span className="text-gray-600">You&apos;ll pay about </span>
                    <span className="font-bold text-violet-700">
                      {formatMoney(converted, payFrom)}
                    </span>
                    <span className="text-gray-600"> from your {payFrom} wallet</span>
                  </div>
                </div>
              )}
            </div>

            {/* Recurring options */}
            {mode === "recurring" && (
              <div className="mt-4 p-4 rounded-xl border border-gray-200 grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Every"
                    type="number"
                    inputMode="numeric"
                    value={freqAmount}
                    onChange={(e) => setFreqAmount(e.target.value)}
                  />
                  <SelectField
                    label="Frequency"
                    value={freqUnit}
                    onChange={(e) => setFreqUnit(e.target.value)}
                    options={[
                      { label: "Minutes", value: "minutes" },
                      { label: "Hours", value: "hours" },
                      { label: "Days", value: "days" },
                      { label: "Weeks", value: "weeks" },
                      { label: "Months", value: "months" },
                    ]}
                  />
                </div>
                <InputField
                  label="Ends on"
                  type="datetime-local"
                  value={endAt}
                  onChange={(e) => setEndAt(e.target.value)}
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
              <FormButton
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => setResult("declined")}
                disabled={submitting}
                className="sm:flex-1"
              >
                Decline
              </FormButton>
              <FormButton
                type="button"
                size="lg"
                loading={submitting}
                onClick={pay}
                className="sm:flex-1"
              >
                {numericAmount > 0
                  ? `Pay ${formatMoney(numericAmount, link.currency)}`
                  : "Pay"}
              </FormButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
