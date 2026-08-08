"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import TextareaField from "@/components/ui/textareaField";
import ToggleSwitch from "@/components/ui/toggleSwitch";
import { FormButton } from "@/components/forms/FormComponents";
import type { MyPledge } from "@/data/myPledges";

interface PledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (pledge: MyPledge) => void;
}

type Mode = "one-time" | "recurring";

export default function PledgeModal({
  isOpen,
  onClose,
  onCreate,
}: PledgeModalProps) {
  const [mode, setMode] = useState<Mode>("one-time");
  const [description, setDescription] = useState("");
  const [performanceDate, setPerformanceDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [identity, setIdentity] = useState("name");
  const [alias, setAlias] = useState("");
  const [freqAmount, setFreqAmount] = useState("1");
  const [freqUnit, setFreqUnit] = useState("months");
  const [endAt, setEndAt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const reset = () => {
    setMode("one-time");
    setDescription("");
    setPerformanceDate("");
    setEmail("");
    setPhone("");
    setIdentity("name");
    setAlias("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError(true);
      return;
    }
    setSubmitting(true);
    console.log("Pledge:", {
      mode,
      description,
      performanceDate,
      email,
      phone,
      identity: identity === "alias" ? { alias } : identity,
      recurring:
        mode === "recurring"
          ? { every: freqAmount, unit: freqUnit, endsAt: endAt }
          : null,
    });
    await new Promise((r) => setTimeout(r, 1000));
    onCreate({
      id: `p-${Date.now()}`,
      description: description.trim(),
      type: mode,
      frequency:
        mode === "recurring" ? `Every ${freqAmount} ${freqUnit}` : undefined,
      performanceDate: performanceDate || "To be scheduled",
      status: "active",
      anonymous: identity !== "name",
      contactEmail: email || undefined,
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });
    setSubmitting(false);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Make a Pledge"
      description="Commit to a cause with a performance-based pledge"
      maxWidthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        {/* Mode */}
        <ToggleSwitch
          variant="pill"
          value={mode}
          onChange={(v) => setMode(v as Mode)}
          options={[
            { label: "One-time", value: "one-time" },
            { label: "Recurring", value: "recurring" },
          ]}
        />

        {/* Description */}
        <TextareaField
          label="Description"
          placeholder="Describe what you're pledging and for which cause"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError(false);
          }}
          error={error && !description.trim()}
          errorMessage={
            error && !description.trim() ? "Describe your pledge" : undefined
          }
          rows={3}
          required
        />

        {/* Performance date */}
        <InputField
          label="Performance date"
          type="date"
          value={performanceDate}
          onChange={(e) => setPerformanceDate(e.target.value)}
        />

        {/* Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Contact email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Contact phone"
            type="tel"
            placeholder="+1 555 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Recurring options */}
        {mode === "recurring" && (
          <div className="p-4 rounded-xl border border-gray-200 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Every"
                type="number"
                inputMode="numeric"
                value={freqAmount}
                onChange={(e) => setFreqAmount(e.target.value)}
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
                placeholder="e.g., A Well-wisher"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </div>
          )}
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
            Pledge
          </FormButton>
        </div>
      </form>
    </Modal>
  );
}
