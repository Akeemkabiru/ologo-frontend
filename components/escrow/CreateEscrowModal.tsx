"use client";

import { useEffect, useMemo, useState } from "react";
import { UserPlus, X } from "lucide-react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import CustomSelectField from "@/components/ui/customSelectField";
import TextareaField from "@/components/ui/textareaField";
import ToggleSwitch from "@/components/ui/toggleSwitch";
import ChargesSummary from "@/components/ui/ChargesSummary";
import { FormButton } from "@/components/forms/FormComponents";
import { useForm } from "@/hooks";
import { CURRENCIES, PAYMENT_REQUEST_TAX_RATES } from "@/lib/constants";
import { events } from "@/data/events";

const ESCROW_CATEGORIES = [
  "Freelance",
  "Real Estate",
  "Vehicles",
  "Services",
  "Goods",
  "Digital Products",
  "Domains",
  "Legal",
  "Rentals",
  "Milestone",
];

type MemberRole = "Decider" | "Witness" | "Beneficiary";

interface AppointedMember {
  id: string;
  name: string;
  contact: string;
  role: MemberRole;
}

interface EscrowFormValues {
  title: string;
  description: string;
  eventId: string;
  purpose: "business" | "charity";
  category: string;
  amount: string;
  currency: string;
  releaseDate: string;
  visibility: "public" | "private";
}

const initialValues: EscrowFormValues = {
  title: "",
  description: "",
  eventId: "",
  purpose: "business",
  category: "Freelance",
  amount: "",
  currency: "USD",
  releaseDate: "",
  visibility: "private",
};

interface CreateEscrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
  presetEventId?: string;
}

export default function CreateEscrowModal({
  isOpen,
  onClose,
  onCreated,
  presetEventId,
}: CreateEscrowModalProps) {
  const [members, setMembers] = useState<AppointedMember[]>([]);
  const [memberName, setMemberName] = useState("");
  const [memberContact, setMemberContact] = useState("");
  const [memberRole, setMemberRole] = useState<MemberRole>("Beneficiary");

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
  } = useForm<EscrowFormValues>({
    initialValues,
    onSubmit: async (values) => {
      console.log("Creating escrow:", { ...values, members });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetForm();
      setMembers([]);
      onClose();
      onCreated?.();
    },
    validate: (values) => {
      const errors: Partial<EscrowFormValues> = {};
      if (!values.title) errors.title = "Escrow title is required";
      if (!values.amount) errors.amount = "Amount is required";
      return errors;
    },
  });

  // When the escrow is created from within an event, prefill & lock the linked
  // event so the user doesn't re-enter it.
  const isFromEvent = Boolean(presetEventId);
  const presetEvent = useMemo(
    () => events.find((ev) => ev.id === presetEventId),
    [presetEventId],
  );

  useEffect(() => {
    if (isOpen && presetEventId) {
      setValues((prev) => ({
        ...prev,
        eventId: presetEventId,
      }));
    }
  }, [isOpen, presetEventId, setValues]);

  const taxRate = PAYMENT_REQUEST_TAX_RATES[values.purpose] ?? 0;

  const addMember = () => {
    if (!memberName.trim()) return;
    setMembers((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        name: memberName.trim(),
        contact: memberContact.trim(),
        role: memberRole,
      },
    ]);
    setMemberName("");
    setMemberContact("");
    setMemberRole("Beneficiary");
  };

  const removeMember = (id: string) =>
    setMembers((prev) => prev.filter((m) => m.id !== id));

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Escrow"
      description="Hold funds securely until both parties are satisfied"
      maxWidthClassName="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        <InputField
          label="Escrow Title"
          placeholder="e.g., Website Redesign Project"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && !!errors.title}
          errorMessage={errors.title}
          required
        />

        <TextareaField
          label="Description"
          placeholder="Describe the deal, deliverables, and conditions for release"
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
        />

        {/* Linked event — only shown when creating from an event; prefilled &
            disabled so it can't be changed. */}
        {isFromEvent && (
          <InputField
            label="Linked event"
            name="eventName"
            value={presetEvent?.name ?? "Linked event"}
            readOnly
            disabled
            helperText="This escrow is part of the event above."
          />
        )}

        {/* Who the escrow is for — drives tax calculation */}
        <CustomSelectField
          label="Who is this escrow for?"
          name="purpose"
          options={[
            { label: "Business", value: "business" },
            { label: "Charity", value: "charity" },
          ]}
          value={values.purpose}
          onChange={(val) =>
            setValues((prev) => ({
              ...prev,
              purpose: val as EscrowFormValues["purpose"],
            }))
          }
          helperText="We use this to automatically calculate the tax that applies."
        />

        <CustomSelectField
          label="Category"
          name="category"
          options={ESCROW_CATEGORIES.map((c) => ({ label: c, value: c }))}
          value={values.category}
          onChange={(val) => setValues((prev) => ({ ...prev, category: val }))}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Amount"
            placeholder="e.g., 5000"
            name="amount"
            type="text"
            inputMode="decimal"
            value={values.amount}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/[^0-9.]/g, "");
              const parts = cleaned.split(".");
              const next =
                parts.length > 2
                  ? `${parts[0]}.${parts.slice(1).join("")}`
                  : cleaned;
              setValues((prev) => ({ ...prev, amount: next }));
            }}
            onBlur={handleBlur}
            error={touched.amount && !!errors.amount}
            errorMessage={errors.amount}
            required
          />
          <CustomSelectField
            label="Currency"
            name="currency"
            options={CURRENCIES.map((curr) => ({ label: curr, value: curr }))}
            value={values.currency}
            onChange={(val) => setValues((prev) => ({ ...prev, currency: val }))}
            required
          />
        </div>

        {/* Charges & tax */}
        {values.amount && Number(values.amount) > 0 && (
          <ChargesSummary
            amount={Number(values.amount)}
            currency={values.currency}
            taxRate={taxRate}
            amountLabel="Escrow amount"
            totalLabel="Total to fund"
          />
        )}

        {/* Members & roles — appoint members and choose their role */}
        <div className="rounded-xl border border-gray-200 p-4 grid gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Members &amp; roles
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Appoint members and choose a role for each — Decider, Witness or
              Beneficiary.
            </p>
          </div>

          {members.length > 0 && (
            <div className="grid gap-2">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {m.name}
                    </p>
                    {m.contact && (
                      <p className="text-xs text-gray-500 truncate">
                        {m.contact}
                      </p>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                    {m.role}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeMember(m.id)}
                    aria-label={`Remove ${m.name}`}
                    className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Member name"
              placeholder="e.g., Frank Adeyemi"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
            <InputField
              label="Email or username"
              placeholder="Search by email or @username"
              value={memberContact}
              onChange={(e) => setMemberContact(e.target.value)}
            />
          </div>
          <CustomSelectField
            label="Role"
            value={memberRole}
            onChange={(val) => setMemberRole(val as MemberRole)}
            options={[
              { label: "Decider — approves & distributes funds", value: "Decider" },
              { label: "Witness — observes & verifies", value: "Witness" },
              { label: "Beneficiary — receives payments", value: "Beneficiary" },
            ]}
          />
          <FormButton
            type="button"
            variant="secondary"
            size="md"
            onClick={addMember}
            className="w-fit"
          >
            <span className="inline-flex items-center gap-1.5">
              <UserPlus size={15} />
              Appoint member
            </span>
          </FormButton>
        </div>

        <InputField
          label="Release Deadline"
          name="releaseDate"
          type="date"
          value={values.releaseDate}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Visibility toggle */}
        <ToggleSwitch
          label="Escrow Visibility"
          variant="pill"
          value={values.visibility}
          onChange={(visibility) =>
            setValues((prev) => ({ ...prev, visibility }))
          }
          options={[
            { label: "Public", value: "public" },
            { label: "Private", value: "private" },
          ]}
        />

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-2">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleClose}
            disabled={isSubmitting}
            className="sm:flex-1"
          >
            Cancel
          </FormButton>
          <FormButton
            type="submit"
            size="lg"
            loading={isSubmitting}
            className="sm:flex-1"
          >
            Create Escrow
          </FormButton>
        </div>
      </form>
    </Modal>
  );
}
