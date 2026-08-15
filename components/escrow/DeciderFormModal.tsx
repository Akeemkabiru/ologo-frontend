"use client";

import React, { useMemo, useState } from "react";
import { Expand } from "lucide-react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import TextareaField from "@/components/ui/textareaField";
import Checkbox from "@/components/ui/checkbox";
import ViewToggle, { type ViewMode } from "@/components/ui/ViewToggle";
import { FormButton } from "@/components/forms/FormComponents";

export interface DeciderBeneficiary {
  id: string;
  name: string;
  avatar: string;
  requestedAmount: number;
  requestDescription?: string;
}

export interface DeciderPaymentSummary {
  recipients: { name: string; amount: number }[];
  total: number;
  description: string;
  recurring: boolean;
}

interface DeciderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  escrowName: string;
  available: number;
  beneficiaries: DeciderBeneficiary[];
  onSubmitted?: (summary: DeciderPaymentSummary) => void;
}

const money = (n: number) =>
  `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const dollarIcon = <span className="text-sm text-gray-500">$</span>;

export default function DeciderFormModal({
  isOpen,
  onClose,
  escrowName,
  available,
  beneficiaries,
  onSubmitted,
}: DeciderFormModalProps) {
  const [view, setView] = useState<ViewMode>("list");
  const [payments, setPayments] = useState<Record<string, string>>({});
  const [requests, setRequests] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      beneficiaries.map((b) => [b.id, String(b.requestedAmount || "")]),
    ),
  );
  const [description, setDescription] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [freqAmount, setFreqAmount] = useState("1");
  const [freqUnit, setFreqUnit] = useState("days");
  const [endAt, setEndAt] = useState("");
  const [identity, setIdentity] = useState("name");
  const [alias, setAlias] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [expandedMember, setExpandedMember] =
    useState<DeciderBeneficiary | null>(null);

  const totalToPay = useMemo(
    () =>
      beneficiaries.reduce((sum, b) => sum + (Number(payments[b.id]) || 0), 0),
    [payments, beneficiaries],
  );
  const remaining = available - totalToPay;
  const overBudget = remaining < 0;
  const paidCount = beneficiaries.filter(
    (b) => (Number(payments[b.id]) || 0) > 0,
  ).length;

  // Keep only digits and a single decimal point so text inputs accept numbers
  // only (no spinner arrows, no letters/symbols).
  const onlyNumeric = (v: string) => {
    const cleaned = v.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    return parts.length > 2
      ? `${parts[0]}.${parts.slice(1).join("")}`
      : cleaned;
  };

  const setPayment = (id: string, v: string) =>
    setPayments((p) => ({ ...p, [id]: onlyNumeric(v) }));
  const setRequest = (id: string, v: string) =>
    setRequests((r) => ({ ...r, [id]: onlyNumeric(v) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (overBudget || totalToPay <= 0) return;
    setSubmitting(true);
    const recipients = beneficiaries
      .filter((b) => (Number(payments[b.id]) || 0) > 0)
      .map((b) => ({ name: b.name, amount: Number(payments[b.id]) || 0 }));
    console.log("Decider Form submitted:", {
      escrowName,
      payments,
      requests,
      description,
      recurring: isRecurring
        ? { every: freqAmount, unit: freqUnit, endsAt: endAt }
        : null,
      identity: identity === "alias" ? { alias } : identity,
    });
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    onSubmitted?.({
      recipients,
      total: totalToPay,
      description,
      recurring: isRecurring,
    });
    onClose();
  };

  const handleClose = () => {
    if (!submitting) onClose();
  };

  const notPaid = (id: string) => (Number(payments[id]) || 0) <= 0;

  return (
    <>
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Decider Form"
      description={`Distribute escrow funds for ${escrowName}`}
      maxWidthClassName="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        {/* Balance summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
            <p className="text-[11px] text-gray-500">Available</p>
            <p className="text-sm font-bold text-gray-900">
              {money(available)}
            </p>
          </div>
          <div className="rounded-xl bg-violet-50 border border-violet-100 p-3">
            <p className="text-[11px] text-violet-600">To pay ({paidCount})</p>
            <p className="text-sm font-bold text-violet-700">
              {money(totalToPay)}
            </p>
          </div>
          <div
            className={`rounded-xl border p-3 ${
              overBudget
                ? "bg-rose-50 border-rose-200"
                : "bg-emerald-50 border-emerald-100"
            }`}
          >
            <p
              className={`text-[11px] ${overBudget ? "text-rose-600" : "text-emerald-600"}`}
            >
              Remaining
            </p>
            <p
              className={`text-sm font-bold ${overBudget ? "text-rose-700" : "text-emerald-700"}`}
            >
              {money(remaining)}
            </p>
          </div>
        </div>

        {/* Beneficiaries header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Payment per member
            </p>
            <p className="text-xs text-gray-400">
              Leave an amount at 0 and that member won&apos;t be paid on this
              form.
            </p>
          </div>
          <ViewToggle value={view} onChange={setView} />
        </div>

        {/* Beneficiary amounts */}
        {view === "list" ? (
          <div className="flex flex-col gap-2.5">
            {beneficiaries.map((b) => (
              <div
                key={b.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                  notPaid(b.id)
                    ? "border-gray-100 bg-white"
                    : "border-violet-200 bg-violet-50/40"
                }`}
              >
                <img
                  src={b.avatar}
                  alt={b.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {b.name}
                    </p>
                    {b.requestDescription && (
                      <button
                        type="button"
                        onClick={() => setExpandedMember(b)}
                        aria-label={`View ${b.name}'s request`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-violet-600 hover:text-violet-700 shrink-0"
                      >
                        <Expand size={12} />
                        Request
                      </button>
                    )}
                  </div>
                  {notPaid(b.id) ? (
                    <p className="text-[11px] text-gray-400">Won&apos;t be paid</p>
                  ) : (
                    <p className="text-[11px] text-violet-600 font-medium">
                      Will receive {money(Number(payments[b.id]) || 0)}
                    </p>
                  )}
                </div>
                <div className="w-24 shrink-0">
                  <p className="text-[10px] text-gray-400 mb-1">Requested</p>
                  <InputField
                    type="text"
                    inputMode="decimal"
                    icon={dollarIcon}
                    value={requests[b.id] ?? ""}
                    onChange={(e) => setRequest(b.id, e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="w-24 shrink-0">
                  <p className="text-[10px] text-gray-500 mb-1">Pay</p>
                  <InputField
                    type="text"
                    inputMode="decimal"
                    icon={dollarIcon}
                    value={payments[b.id] ?? ""}
                    onChange={(e) => setPayment(b.id, e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {beneficiaries.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-xl border text-center transition-colors ${
                  notPaid(b.id)
                    ? "border-gray-100 bg-white"
                    : "border-violet-200 bg-violet-50/40"
                }`}
              >
                <img
                  src={b.avatar}
                  alt={b.name}
                  className="w-12 h-12 rounded-full object-cover mx-auto mb-2"
                />
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {b.name}
                </p>
                <p className="text-[11px] text-gray-400 mb-1">
                  {notPaid(b.id)
                    ? "Won't be paid"
                    : `Will receive ${money(Number(payments[b.id]) || 0)}`}
                </p>
                {b.requestDescription && (
                  <button
                    type="button"
                    onClick={() => setExpandedMember(b)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-violet-600 hover:text-violet-700 mb-3"
                  >
                    <Expand size={12} />
                    View request
                  </button>
                )}
                <div className="grid grid-cols-2 gap-2 text-left">
                  <div>
                    <p className="text-[10px] text-gray-400 mb-1">Requested</p>
                    <InputField
                      type="text"
                      inputMode="decimal"
                      icon={dollarIcon}
                      value={requests[b.id] ?? ""}
                      onChange={(e) => setRequest(b.id, e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-1">Pay</p>
                    <InputField
                      type="text"
                      inputMode="decimal"
                      icon={dollarIcon}
                      value={payments[b.id] ?? ""}
                      onChange={(e) => setPayment(b.id, e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {overBudget && (
          <p className="text-xs text-rose-600 -mt-2">
            Total payments exceed the available escrow balance.
          </p>
        )}

        {/* Description */}
        <TextareaField
          label="Payment Description"
          placeholder="Reason for this decision"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        {/* Recurring */}
        <div>
          <Checkbox
            label="Pay on a recurring schedule instead of once"
            name="isRecurring"
            checked={isRecurring}
            onChange={setIsRecurring}
          />
          {isRecurring && (
            <div className="mt-4 p-4 rounded-xl border border-gray-200 grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Every"
                  type="text"
                  inputMode="numeric"
                  value={freqAmount}
                  onChange={(e) =>
                    setFreqAmount(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="1"
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

        {/* Identity */}
        <div>
          <SelectField
            label="Show my identity as"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            options={[
              { label: "My registered name", value: "name" },
              { label: "Anonymous", value: "anonymous" },
              { label: "Alias name", value: "alias" },
            ]}
          />
          {identity === "alias" && (
            <div className="mt-4">
              <InputField
                label="Alias name"
                placeholder="e.g., A Well-wisher"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Actions */}
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
            type="submit"
            size="lg"
            loading={submitting}
            disabled={overBudget || totalToPay <= 0}
            className="sm:flex-1"
          >
            Pay {totalToPay > 0 ? money(totalToPay) : ""}
          </FormButton>
        </div>
      </form>
    </Modal>

    {/* Expanded member request description */}
    <Modal
      isOpen={expandedMember !== null}
      onClose={() => setExpandedMember(null)}
      title={expandedMember ? `${expandedMember.name}'s request` : "Request"}
      description={
        expandedMember
          ? `Requested ${money(expandedMember.requestedAmount)}`
          : undefined
      }
      maxWidthClassName="max-w-lg"
    >
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {expandedMember?.requestDescription ??
          "No description was provided with this request."}
      </p>
    </Modal>
    </>
  );
}
