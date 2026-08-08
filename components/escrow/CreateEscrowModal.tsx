"use client";

import { useState } from "react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import TextareaField from "@/components/ui/textareaField";
import ToggleSwitch from "@/components/ui/toggleSwitch";
import { FormButton } from "@/components/forms/FormComponents";
import { useForm } from "@/hooks";
import { CURRENCIES } from "@/lib/constants";
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

interface EscrowFormValues {
  title: string;
  description: string;
  linkType: "standalone" | "event";
  eventId: string;
  category: string;
  amount: string;
  currency: string;
  counterpartyEmail: string;
  role: "buyer" | "seller";
  releaseDate: string;
  visibility: "public" | "private";
}

const initialValues: EscrowFormValues = {
  title: "",
  description: "",
  linkType: "standalone",
  eventId: "",
  category: "Freelance",
  amount: "",
  currency: "USD",
  counterpartyEmail: "",
  role: "buyer",
  releaseDate: "",
  visibility: "private",
};

interface CreateEscrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function CreateEscrowModal({
  isOpen,
  onClose,
  onCreated,
}: CreateEscrowModalProps) {
  const [releaseTerms, setReleaseTerms] = useState("both");

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
      console.log("Creating escrow:", { ...values, releaseTerms });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetForm();
      setReleaseTerms("both");
      onClose();
      onCreated?.();
    },
    validate: (values) => {
      const errors: Partial<EscrowFormValues> = {};
      if (!values.title) errors.title = "Escrow title is required";
      if (!values.amount) errors.amount = "Amount is required";
      if (!values.counterpartyEmail)
        errors.counterpartyEmail = "Counterparty email is required";
      return errors;
    },
  });

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

        <SelectField
          label="Category"
          name="category"
          options={ESCROW_CATEGORIES.map((c) => ({ label: c, value: c }))}
          value={values.category}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Amount"
            placeholder="e.g., 5000"
            name="amount"
            type="number"
            inputMode="numeric"
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.amount && !!errors.amount}
            errorMessage={errors.amount}
            required
          />
          <SelectField
            label="Currency"
            name="currency"
            options={CURRENCIES.map((curr) => ({ label: curr, value: curr }))}
            value={values.currency}
            onChange={handleChange}
            required
          />
        </div>

        <InputField
          label="Counterparty"
          placeholder="Enter counterparty email"
          name="counterpartyEmail"
          type="email"
          value={values.counterpartyEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.counterpartyEmail && !!errors.counterpartyEmail}
          errorMessage={errors.counterpartyEmail}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Your Role"
            name="role"
            options={[
              { label: "Buyer (I pay into escrow)", value: "buyer" },
              { label: "Seller (I deliver, then get paid)", value: "seller" },
            ]}
            value={values.role}
            onChange={handleChange}
          />
          <InputField
            label="Release Deadline"
            name="releaseDate"
            type="date"
            value={values.releaseDate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <SelectField
          label="Funds are released when…"
          value={releaseTerms}
          onChange={(e) => setReleaseTerms(e.target.value)}
          options={[
            { label: "Both parties approve", value: "both" },
            { label: "Buyer approves delivery", value: "buyer" },
            { label: "A milestone is completed", value: "milestone" },
          ]}
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
