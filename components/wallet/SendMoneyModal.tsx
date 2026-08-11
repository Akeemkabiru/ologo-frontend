"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  ArrowUpDown,
  Info,
  Building2,
  HeartHandshake,
} from "lucide-react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import TextareaField from "@/components/ui/textareaField";
import Checkbox from "@/components/ui/checkbox";
import ToggleSwitch from "@/components/ui/toggleSwitch";
import { FormButton } from "@/components/forms/FormComponents";
import {
  CURRENCY_INFO,
  convertCurrency,
  formatMoney,
  getCurrency,
} from "@/lib/currency";

// Transfer charges — in the real product these come from the Admin dashboard.
const FEE_RATE = 0.02; // 2% transfer fee
const VAT_RATE = 0.075; // 7.5% tax on the fee

type DestType = "user" | "external";
type Purpose = "charity" | "business";

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

function CurrencyPill({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const active = getCurrency(value);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 rounded-full pl-2 pr-2.5 py-1.5 transition-colors"
      >
        <span className="text-lg leading-none">{active.flag}</span>
        <span className="text-sm font-semibold text-gray-800">
          {active.code}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              style={{ transformOrigin: "top right" }}
              className="absolute right-0 top-full mt-1.5 z-20 w-40 rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden py-1"
            >
              {CURRENCY_INFO.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onChange(c.code);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${
                    c.code === value
                      ? "bg-violet-50 text-violet-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg leading-none">{c.flag}</span>
                  {c.code}
                  <span className="ml-auto text-gray-400">{c.symbol}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SendMoneyModal({
  isOpen,
  onClose,
  onSuccess,
}: SendMoneyModalProps) {
  const [destType, setDestType] = useState<DestType>("user");
  const [purpose, setPurpose] = useState<Purpose>("charity");

  // Recipient (platform user)
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientInfo, setRecipientInfo] = useState<{
    fullName: string;
    email: string;
  } | null>(null);

  // Recipient (external)
  const [holderName, setHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // Exchange
  const [amount, setAmount] = useState("");
  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveCurrency, setReceiveCurrency] = useState("NGN");

  const [description, setDescription] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [freqAmount, setFreqAmount] = useState("1");
  const [freqUnit, setFreqUnit] = useState("months");
  const [endAt, setEndAt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const sendAmount = Number(amount) || 0;
  const receiveAmount = convertCurrency(
    sendAmount,
    sendCurrency,
    receiveCurrency,
  );
  const rate = convertCurrency(1, sendCurrency, receiveCurrency);
  const fee = sendAmount * FEE_RATE;
  const vat = fee * VAT_RATE;
  const totalCharge = fee + vat;
  const totalPay = sendAmount + totalCharge;

  const reset = () => {
    setDestType("user");
    setPurpose("charity");
    setRecipientEmail("");
    setRecipientInfo(null);
    setHolderName("");
    setBankName("");
    setAccountNumber("");
    setAmount("");
    setSendCurrency("USD");
    setReceiveCurrency("NGN");
    setDescription("");
    setIsRecurring(false);
    setFreqAmount("1");
    setFreqUnit("months");
    setEndAt("");
    setError(false);
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const swapCurrencies = () => {
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(sendCurrency);
  };

  const searchRecipient = () => {
    if (!recipientEmail.trim()) return;
    setRecipientInfo({ fullName: "Jane Smith", email: recipientEmail.trim() });
  };

  const recipientValid =
    destType === "user"
      ? !!recipientEmail.trim()
      : !!holderName.trim() && !!accountNumber.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendAmount <= 0 || !recipientValid) {
      setError(true);
      return;
    }
    setSubmitting(true);
    console.log("Transfer:", {
      destType,
      purpose,
      recipient:
        destType === "user"
          ? { email: recipientEmail }
          : { holderName, bankName, accountNumber },
      send: { amount: sendAmount, currency: sendCurrency },
      receive: { amount: receiveAmount, currency: receiveCurrency },
      charges: { fee, vat, total: totalCharge, totalPay },
      recurring: isRecurring
        ? { every: freqAmount, unit: freqUnit, endsAt: endAt }
        : null,
      description,
    });
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    reset();
    onClose();
    onSuccess?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Send Money"
      description="Transfer to an Ologo user or any bank / wallet"
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        {/* Destination type */}
        <ToggleSwitch
          variant="pill"
          value={destType}
          onChange={(v) => setDestType(v as DestType)}
          options={[
            { label: "Ologo user", value: "user" },
            { label: "Bank / Wallet", value: "external" },
          ]}
        />

        {/* Recipient */}
        {destType === "user" ? (
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-2">Send to</h3>
            <div className="flex gap-2 items-start">
              <InputField
                placeholder="Recipient email or username"
                type="text"
                value={recipientEmail}
                onChange={(e) => {
                  setRecipientEmail(e.target.value);
                  setError(false);
                }}
                error={error && !recipientEmail.trim()}
                errorMessage={
                  error && !recipientEmail.trim() ? "Enter a recipient" : undefined
                }
                containerClassName="flex-1"
              />
              <button
                type="button"
                onClick={searchRecipient}
                className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 h-10.5 rounded-lg transition-colors shrink-0"
              >
                Search
              </button>
            </div>
            {recipientInfo && (
              <div className="mt-3 p-3 bg-violet-50 border border-violet-200 rounded-xl flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/64?img=32"
                  alt={recipientInfo.fullName}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 flex items-center gap-1">
                    {recipientInfo.fullName}
                    <CheckCircle2 size={16} className="text-violet-600" />
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {recipientInfo.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            <InputField
              label="Account holder name"
              placeholder="e.g., John Doe"
              value={holderName}
              onChange={(e) => {
                setHolderName(e.target.value);
                setError(false);
              }}
              error={error && !holderName.trim()}
              errorMessage={
                error && !holderName.trim() ? "Enter the holder name" : undefined
              }
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Bank / Wallet"
                placeholder="e.g., First Bank"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
              <InputField
                label="Account number / address"
                placeholder="Account no. or wallet ID"
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                  setError(false);
                }}
                error={error && !accountNumber.trim()}
                errorMessage={
                  error && !accountNumber.trim() ? "Required" : undefined
                }
              />
            </div>
            <p className="text-xs text-gray-500 -mt-1">
              The recipient doesn&apos;t need an Ologo account.
            </p>
          </div>
        )}

        {/* Purpose */}
        <div>
          <h3 className="text-sm font-medium text-gray-800 mb-2">
            What is this transfer for?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { value: "charity", label: "Charity", Icon: HeartHandshake },
                { value: "business", label: "Business", Icon: Building2 },
              ] as const
            ).map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPurpose(p.value)}
                className={`flex items-center gap-2 rounded-xl border-[1.5px] px-4 py-3 text-sm font-semibold transition-colors ${
                  purpose === p.value
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <p.Icon size={17} />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Currency exchange */}
        <div>
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            {/* You send */}
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 mb-0.5">You send</p>
                <input
                  type="number"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError(false);
                  }}
                  placeholder="0"
                  className="w-full bg-transparent text-2xl font-bold text-gray-900 outline-none placeholder:text-gray-300"
                />
              </div>
              <CurrencyPill value={sendCurrency} onChange={setSendCurrency} />
            </div>

            {/* Swap divider */}
            <div className="relative border-t border-gray-200">
              <button
                type="button"
                onClick={swapCurrencies}
                aria-label="Swap currencies"
                className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center shadow-sm transition-colors"
              >
                <ArrowUpDown size={15} />
              </button>
            </div>

            {/* They get */}
            <div className="flex items-center justify-between gap-3 p-4 bg-gray-50/60">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 mb-0.5">They get</p>
                <p className="text-2xl font-bold text-gray-900 truncate">
                  {getCurrency(receiveCurrency).symbol}
                  {receiveAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <CurrencyPill
                value={receiveCurrency}
                onChange={setReceiveCurrency}
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">
            Rate: {formatMoney(1, sendCurrency)} ={" "}
            {formatMoney(rate, receiveCurrency)}
          </p>
          {error && sendAmount <= 0 && (
            <p className="text-xs text-red-500 mt-1">Enter an amount to send</p>
          )}
        </div>

        {/* Description */}
        <TextareaField
          label="Description (Optional)"
          placeholder="Add a note about this transfer"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />

        {/* Recurring */}
        <div>
          <Checkbox
            label="Make this a recurring transfer"
            name="isRecurring"
            checked={isRecurring}
            onChange={setIsRecurring}
          />
          {isRecurring && (
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
        </div>

        {/* Charges & tax */}
        {sendAmount > 0 && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Info size={14} className="text-amber-600" />
              <p className="text-xs font-semibold text-amber-800">
                Charges &amp; taxes
              </p>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Transfer fee (2%)</span>
                <span className="font-medium text-gray-900">
                  {formatMoney(fee, sendCurrency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax / VAT (7.5%)</span>
                <span className="font-medium text-gray-900">
                  {formatMoney(vat, sendCurrency)}
                </span>
              </div>
              <div className="flex justify-between border-t border-amber-200 pt-1.5">
                <span className="font-semibold text-gray-900">Total to pay</span>
                <span className="font-bold text-amber-800">
                  {formatMoney(totalPay, sendCurrency)}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-amber-700 mt-2">
              Charges and taxes may vary based on the destination and live rates.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
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
            type="submit"
            loading={submitting}
            variant="primary"
            size="lg"
            className="sm:flex-1"
          >
            Send Money
          </FormButton>
        </div>
      </form>
    </Modal>
  );
}
