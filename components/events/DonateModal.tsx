"use client";

import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import TextareaField from "@/components/ui/textareaField";
import Checkbox from "@/components/ui/checkbox";
import { FormButton } from "@/components/forms/FormComponents";
import { useForm } from "@/hooks";

interface DonateFormValues {
  amount: string;
  note: string;
  isAnonymous: boolean;
}

const initialValues: DonateFormValues = {
  amount: "",
  note: "",
  isAnonymous: false,
};

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}

export default function DonateModal({
  isOpen,
  onClose,
  eventName,
}: DonateModalProps) {
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
  } = useForm<DonateFormValues>({
    initialValues,
    onSubmit: async (values) => {
      console.log("Donating:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetForm();
      onClose();
    },
    validate: (values) => {
      const errors: Partial<DonateFormValues> = {};
      if (!values.amount) errors.amount = "Enter a donation amount";
      else if (Number(values.amount) <= 0)
        errors.amount = "Amount must be greater than 0";
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
      title="Donate"
      description={`Support ${eventName}`}
      maxWidthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        <InputField
          label="Donation Amount"
          placeholder="e.g., 100"
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

        <TextareaField
          label="Message (Optional)"
          placeholder="Share why you're supporting this cause"
          name="note"
          value={values.note}
          onChange={handleChange}
          rows={3}
        />

        <Checkbox
          label="Donate anonymously"
          name="isAnonymous"
          checked={values.isAnonymous}
          onChange={(checked) =>
            setValues((prev) => ({ ...prev, isAnonymous: checked }))
          }
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
            Donate Now
          </FormButton>
        </div>
      </form>
    </Modal>
  );
}
