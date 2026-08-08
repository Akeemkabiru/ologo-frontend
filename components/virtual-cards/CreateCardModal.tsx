"use client";

import React, { useState } from "react";
import { Info } from "lucide-react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import Checkbox from "@/components/ui/checkbox";
import { FormButton } from "@/components/forms/FormComponents";
import { formatCurrency } from "@/lib/utils";
import { getCurrency } from "@/lib/currency";
import { walletBalances } from "@/data/wallets";
import { CARD_FEES, type VirtualCard } from "@/data/virtualCards";

const rand = (n: number) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");

function genNumber() {
  return `${rand(4)} ${rand(4)} ${rand(4)} ${rand(4)}`;
}
function genExpiry() {
  const m = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const y = 27 + Math.floor(Math.random() * 4);
  return `${m}/${y}`;
}

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (card: VirtualCard) => void;
}

export default function CreateCardModal({
  isOpen,
  onClose,
  onCreate,
}: CreateCardModalProps) {
  const fundedWallets = walletBalances.filter((w) => w.balance > 0);
  const [currency, setCurrency] = useState(fundedWallets[0]?.code ?? "USD");
  const [label, setLabel] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [useAlias, setUseAlias] = useState(false);
  const [alias, setAlias] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setCurrency(fundedWallets[0]?.code ?? "USD");
    setLabel("");
    setAnonymous(false);
    setUseAlias(false);
    setAlias("");
    setError(false);
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) {
      setError(true);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    const card: VirtualCard = {
      id: `vc-${Date.now()}`,
      label: label.trim(),
      currency,
      number: genNumber(),
      expiry: genExpiry(),
      cvv: rand(3),
      balance: 0,
      status: "active",
      anonymous,
      alias: useAlias && alias.trim() ? alias.trim() : undefined,
      createdAt: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      sharedWith: [],
      transactions: [
        {
          id: `cf-${Date.now()}`,
          type: "fee",
          merchant: "Card creation charge",
          amount: 0,
          date: new Date().toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          identity: "You",
        },
      ],
    };
    console.log("Create virtual card:", card);
    setSubmitting(false);
    onCreate(card);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Virtual Card"
      description="Cards are tied to a wallet currency you've funded"
      maxWidthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div>
          <SelectField
            label="Card currency (from a funded wallet)"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            options={fundedWallets.map((w) => ({
              label: `${getCurrency(w.code).flag} ${w.code} — ${formatCurrency(
                w.balance,
                w.code,
              )} available`,
              value: w.code,
            }))}
          />
          <p className="text-xs text-gray-400 mt-1.5">
            You can create multiple cards per funded currency wallet.
          </p>
        </div>

        <InputField
          label="Card name"
          placeholder="e.g., USD Subscriptions"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            setError(false);
          }}
          error={error && !label.trim()}
          errorMessage={error && !label.trim() ? "Give the card a name" : undefined}
          required
        />

        <div className="grid gap-3">
          <Checkbox
            label="Use for anonymous payments"
            name="anonymous"
            checked={anonymous}
            onChange={setAnonymous}
          />
          <Checkbox
            label="Pay under an alias name"
            name="useAlias"
            checked={useAlias}
            onChange={setUseAlias}
          />
          {useAlias && (
            <InputField
              placeholder="Alias name"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          )}
          <p className="text-[11px] text-gray-400">
            The platform still keeps a private record of every anonymous / alias
            payment for verification.
          </p>
        </div>

        <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-100 p-3">
          <Info size={15} className="text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800">
            A one-time creation charge of{" "}
            <b>{formatCurrency(CARD_FEES.creation, "USD")}</b> and a monthly
            maintenance fee of <b>{formatCurrency(CARD_FEES.maintenance, "USD")}</b>{" "}
            apply (set by admin). Failed transactions from insufficient funds are
            charged {formatCurrency(CARD_FEES.failedTransaction, "USD")}.
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
            type="submit"
            size="lg"
            loading={submitting}
            className="sm:flex-1"
          >
            Create Card
          </FormButton>
        </div>
      </form>
    </Modal>
  );
}
