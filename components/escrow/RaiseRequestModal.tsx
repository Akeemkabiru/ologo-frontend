"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import TextareaField from "@/components/ui/textareaField";
import { FormButton } from "@/components/forms/FormComponents";
import type { RequestForm } from "@/data/escrowDetail";

interface RaiseRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (request: RequestForm) => void;
  requesterName?: string;
  requesterAvatar?: string;
}

export default function RaiseRequestModal({
  isOpen,
  onClose,
  onAdd,
  requesterName = "You",
  requesterAvatar = "https://i.pravatar.cc/64?img=25",
}: RaiseRequestModalProps) {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);

  const reset = () => {
    setAmount("");
    setReason("");
    setNote("");
    setError(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0 || !reason.trim()) {
      setError(true);
      return;
    }
    onAdd({
      id: `r-${Date.now()}`,
      name: requesterName,
      avatar: requesterAvatar,
      amount: Number(amount),
      reason: reason.trim(),
      note: note.trim(),
      date: new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "pending",
    });
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Raise a Request"
      description="Every member of the group will see this request form"
      maxWidthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        <InputField
          label="Amount Requested"
          placeholder="e.g., 1000"
          type="number"
          inputMode="numeric"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError(false);
          }}
          error={error && (!amount || Number(amount) <= 0)}
          errorMessage={
            error && (!amount || Number(amount) <= 0)
              ? "Enter a valid amount"
              : undefined
          }
          required
        />

        <InputField
          label="Reason"
          placeholder="e.g., Groceries for the week"
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            setError(false);
          }}
          error={error && !reason.trim()}
          errorMessage={error && !reason.trim() ? "Add a reason" : undefined}
          required
        />

        <TextareaField
          label="Details (Optional)"
          placeholder="Add any details that help the Decider approve this"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-1">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleClose}
            className="sm:flex-1"
          >
            Cancel
          </FormButton>
          <FormButton type="submit" size="lg" className="sm:flex-1">
            Submit Request
          </FormButton>
        </div>
      </form>
    </Modal>
  );
}
