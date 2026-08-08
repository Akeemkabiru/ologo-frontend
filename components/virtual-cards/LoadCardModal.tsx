"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import { FormButton } from "@/components/forms/FormComponents";
import { formatCurrency } from "@/lib/utils";
import { getBalance } from "@/data/wallets";
import type { VirtualCard } from "@/data/virtualCards";

interface LoadCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: VirtualCard | null;
  onLoad: (amount: number) => void;
}

export default function LoadCardModal({
  isOpen,
  onClose,
  card,
  onLoad,
}: LoadCardModalProps) {
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!card) return null;

  const available = getBalance(card.currency);
  const numeric = Number(amount) || 0;
  const insufficient = numeric > available;

  const handleClose = () => {
    if (submitting) return;
    setAmount("");
    onClose();
  };

  const handleLoad = async () => {
    if (numeric <= 0 || insufficient) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    onLoad(numeric);
    setAmount("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Load Card"
      description={`Move money from your ${card.currency} wallet onto “${card.label}”`}
      maxWidthClassName="max-w-md"
    >
      <div className="grid gap-5">
        <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 flex items-center justify-between text-sm">
          <span className="text-gray-500">{card.currency} wallet balance</span>
          <span className="font-bold text-gray-900">
            {formatCurrency(available, card.currency)}
          </span>
        </div>

        <InputField
          label={`Amount to load (${card.currency})`}
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={insufficient}
          errorMessage={insufficient ? "Exceeds wallet balance" : undefined}
        />

        <p className="text-xs text-gray-400">
          Only money loaded onto a card can be spent — nothing is auto-spent from
          your wallet.
        </p>

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
            disabled={numeric <= 0 || insufficient}
            onClick={handleLoad}
            className="sm:flex-1"
          >
            Load {numeric > 0 ? formatCurrency(numeric, card.currency) : ""}
          </FormButton>
        </div>
      </div>
    </Modal>
  );
}
