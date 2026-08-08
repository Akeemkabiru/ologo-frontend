"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import TextareaField from "@/components/ui/textareaField";
import { FormButton } from "@/components/forms/FormComponents";
import ConvertOption from "@/components/wallet/ConvertOption";
import { formatCurrency } from "@/lib/utils";

export interface JoinMembershipTarget {
  id: string;
  name: string;
  membershipAmount: number;
  frequency: string;
  currency: string;
}

interface JoinMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  membership: JoinMembershipTarget | null;
  onJoined?: (id: string) => void;
}

const FREQ_UNITS = [
  { label: "Minutes", value: "minutes" },
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
  { label: "Months", value: "months" },
];

export default function JoinMembershipModal({
  isOpen,
  onClose,
  membership,
  onJoined,
}: JoinMembershipModalProps) {
  const [amount, setAmount] = useState("");
  const [freqAmount, setFreqAmount] = useState("1");
  const [freqUnit, setFreqUnit] = useState("months");
  const [endAt, setEndAt] = useState("");
  const [note, setNote] = useState("");
  const [identity, setIdentity] = useState("name");
  const [alias, setAlias] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [submitting, setSubmitting] = useState(false);

  // Prefill amount when a membership is opened.
  const [lastId, setLastId] = useState<string | null>(null);
  if (membership && membership.id !== lastId) {
    setLastId(membership.id);
    setAmount(String(membership.membershipAmount));
  }

  if (!membership) return null;

  const numericAmount = Number(amount) || 0;

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  const handleJoin = async () => {
    setSubmitting(true);
    console.log("Join membership (Members Form):", {
      id: membership.id,
      amount: numericAmount,
      frequency: { every: freqAmount, unit: freqUnit, endsAt: endAt },
      note,
      identity: identity === "alias" ? { alias } : identity,
      paymentMethod,
    });
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    onJoined?.(membership.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Join ${membership.name}`}
      description="Set your terms, then confirm your membership"
      maxWidthClassName="max-w-md"
    >
      <div className="grid gap-5">
        <div className="rounded-xl bg-violet-50 border border-violet-100 p-4 flex items-baseline justify-between">
          <span className="text-sm text-gray-600">Suggested fee</span>
          <span>
            <span className="text-xl font-bold text-violet-700">
              {formatCurrency(membership.membershipAmount, membership.currency)}
            </span>
            <span className="text-sm text-gray-500">
              {" "}
              / {membership.frequency}
            </span>
          </span>
        </div>

        {/* Editable amount */}
        <InputField
          label="Membership amount (you can edit)"
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Frequency */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Pay every"
            type="number"
            inputMode="numeric"
            value={freqAmount}
            onChange={(e) => setFreqAmount(e.target.value)}
          />
          <SelectField
            label="Frequency"
            options={FREQ_UNITS}
            value={freqUnit}
            onChange={(e) => setFreqUnit(e.target.value)}
          />
        </div>
        <InputField
          label="End date & time"
          type="datetime-local"
          value={endAt}
          onChange={(e) => setEndAt(e.target.value)}
        />

        {/* Identity */}
        <div>
          <SelectField
            label="Show me as"
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
                placeholder="e.g., A Supporter"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Note */}
        <TextareaField
          label="Post a note (optional)"
          placeholder="Say something to the group"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
        />

        {/* Payment */}
        <SelectField
          label="Payment Method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          options={[
            { label: "Debit/Credit Card", value: "card" },
            { label: "Bank Transfer", value: "bank" },
            { label: "Wallet Balance", value: "wallet" },
          ]}
        />
        <ConvertOption
          amount={numericAmount}
          targetCurrency={membership.currency}
        />

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
            onClick={handleJoin}
            className="sm:flex-1"
          >
            Join &amp; Pay
          </FormButton>
        </div>
      </div>
    </Modal>
  );
}
