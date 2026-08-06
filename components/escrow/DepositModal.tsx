"use client";

import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import TextareaField from "@/components/ui/textareaField";
import SelectField from "@/components/ui/selectField";
import { FormButton } from "@/components/forms/FormComponents";
import { useForm } from "@/hooks";

interface DepositFormValues {
  amount: string;
  paymentMethod: string;
  note: string;
}

const initialValues: DepositFormValues = {
  amount: "",
  paymentMethod: "card",
  note: "",
};

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  escrowName: string;
}

export default function DepositModal({
  isOpen,
  onClose,
  escrowName,
}: DepositModalProps) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useForm<DepositFormValues>({
    initialValues,
    onSubmit: async (values) => {
      console.log("Depositing into escrow:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetForm();
      onClose();
    },
    validate: (values) => {
      const errors: Partial<DepositFormValues> = {};
      if (!values.amount) errors.amount = "Enter an amount to deposit";
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
      title="Deposit Funds"
      description={`Secure funds in escrow for ${escrowName}`}
      maxWidthClassName="max-w-md"
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        <InputField
          label="Deposit Amount"
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
          label="Payment Method"
          name="paymentMethod"
          options={[
            { label: "Debit/Credit Card", value: "card" },
            { label: "Bank Transfer", value: "bank" },
            { label: "Wallet Balance", value: "wallet" },
          ]}
          value={values.paymentMethod}
          onChange={handleChange}
        />

        <TextareaField
          label="Note (Optional)"
          placeholder="Add a reference or note for the other party"
          name="note"
          value={values.note}
          onChange={handleChange}
          rows={3}
        />

        <div className="rounded-xl bg-violet-50 border border-violet-200 p-3 text-xs text-gray-600">
          Funds are held securely and only released once the agreed conditions
          are met by all parties.
        </div>

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
            Deposit Funds
          </FormButton>
        </div>
      </form>
    </Modal>
  );
}
