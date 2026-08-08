"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import { FormButton } from "@/components/forms/FormComponents";
import { formatCurrency } from "@/lib/utils";
import type { VirtualCard } from "@/data/virtualCards";

interface ReturnToWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: VirtualCard | null;
  onReturn: (amount: number) => void;
}

export default function ReturnToWalletModal({
  isOpen,
  onClose,
  card,
  onReturn,
}: ReturnToWalletModalProps) {
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!card) return null;

  const numeric = Number(amount) || 0;
  const insufficient = numeric > card.balance;

  const handleClose = () => {
    if (submitting) return;
    setAmount("");
    onClose();
  };

  const handleReturn = async () => {
    if (numeric <= 0 || insufficient) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    onReturn(numeric);
    setAmount("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Return to Wallet"
      description={`Move money from “${card.label}” back to your ${card.currency} wallet`}
      maxWidthClassName="max-w-md"
    >
      <div className="grid gap-5">
        <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 flex items-center justify-between text-sm">
          <span className="text-gray-500">Card balance</span>
          <span className="font-bold text-gray-900">
            {formatCurrency(card.balance, card.currency)}
          </span>
        </div>

        <div>
          <InputField
            label={`Amount to return (${card.currency})`}
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={insufficient}
            errorMessage={insufficient ? "Exceeds card balance" : undefined}
          />
          <button
            type="button"
            onClick={() => setAmount(String(card.balance))}
            className="text-xs font-medium text-violet-600 hover:text-violet-700 mt-1.5"
          >
            Return full balance
          </button>
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
            disabled={numeric <= 0 || insufficient}
            onClick={handleReturn}
            className="sm:flex-1"
          >
            Approve &amp; Return
          </FormButton>
        </div>
      </div>
    </Modal>
  );
}
