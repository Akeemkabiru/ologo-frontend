"use client";

import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import TextareaField from "@/components/ui/textareaField";
import SelectField from "@/components/ui/selectField";
import { FormButton } from "@/components/forms/FormComponents";
import { useForm } from "@/hooks";

interface ReleaseFormValues {
  amount: string;
  reason: string;
  milestone: string;
  note: string;
}

const initialValues: ReleaseFormValues = {
  amount: "",
  reason: "delivery-complete",
  milestone: "",
  note: "",
};

interface RequestReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  escrowName: string;
}

export default function RequestReleaseModal({
  isOpen,
  onClose,
  escrowName,
}: RequestReleaseModalProps) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useForm<ReleaseFormValues>({
    initialValues,
    onSubmit: async (values) => {
      console.log("Requesting escrow release:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetForm();
      onClose();
    },
    validate: (values) => {
      const errors: Partial<ReleaseFormValues> = {};
      if (!values.amount) errors.amount = "Enter an amount to release";
      else if (Number(values.amount) <= 0)
        errors.amount = "Amount must be greater than 0";
      if (!values.reason) errors.reason = "Select a reason";
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
      title="Request Release"
      description={`Request funds to be released from ${escrowName}`}
      maxWidthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        <InputField
          label="Amount to Release"
          placeholder="e.g., 2000"
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
          label="Reason"
          name="reason"
          options={[
            { label: "Delivery completed", value: "delivery-complete" },
            { label: "Milestone reached", value: "milestone" },
            { label: "Partial completion", value: "partial" },
            { label: "Mutual agreement", value: "mutual" },
          ]}
          value={values.reason}
          onChange={handleChange}
          error={touched.reason && !!errors.reason}
          errorMessage={errors.reason}
        />

        <InputField
          label="Milestone (Optional)"
          placeholder="e.g., Phase 1 delivery"
          name="milestone"
          value={values.milestone}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <TextareaField
          label="Details (Optional)"
          placeholder="Describe what was delivered or why funds should be released"
          name="note"
          value={values.note}
          onChange={handleChange}
          rows={3}
        />

        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
          The other party and the decider will be notified to approve this
          release request.
        </div>

        <div className="flex items-center justify-end flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-2">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </FormButton>
          <FormButton type="submit" size="lg" loading={isSubmitting}>
            Submit Request
          </FormButton>
        </div>
      </form>
    </Modal>
  );
}
