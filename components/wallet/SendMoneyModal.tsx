"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Modal from "@/components/ui/modal";
import {
  Form,
  FormInput,
  FormSelect,
  FormButton,
  FormTextarea,
  FormCheckbox,
} from "@/components/forms/FormComponents";
import { CURRENCIES } from "@/lib/constants";
import { useForm } from "@/hooks";

interface TransferFormValues {
  recipientEmail: string;
  amount: string;
  currency: string;
  description?: string;
  isRecurring: boolean;
  frequency?: string;
  frequencyAmount?: string;
}

const initialValues: TransferFormValues = {
  recipientEmail: "",
  amount: "",
  currency: "USD",
  description: "",
  isRecurring: false,
  frequency: "monthly",
  frequencyAmount: "",
};

interface RecipientInfo {
  id: string;
  fullName: string;
  email: string;
  profileImage: string;
  verified: boolean;
}

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SendMoneyModal({
  isOpen,
  onClose,
  onSuccess,
}: SendMoneyModalProps) {
  const [recipientInfo, setRecipientInfo] = useState<RecipientInfo | null>(
    null,
  );

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useForm<TransferFormValues>({
    initialValues,
    onSubmit: async (values) => {
      console.log("Transfer funds:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetForm();
      setRecipientInfo(null);
      onClose();
      onSuccess?.();
    },
    validate: (values) => {
      const errors: Partial<TransferFormValues> = {};
      if (!values.recipientEmail)
        errors.recipientEmail = "Recipient email is required";
      if (!values.amount) errors.amount = "Amount is required";
      if (values.isRecurring && !values.frequencyAmount)
        errors.frequencyAmount = "Recurring amount is required";
      return errors;
    },
  });

  const handleSearchRecipient = () => {
    if (!values.recipientEmail) return;
    setRecipientInfo({
      id: "user-123",
      fullName: "Jane Smith",
      email: values.recipientEmail,
      profileImage: "https://i.pravatar.cc/64?img=32",
      verified: true,
    });
  };

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Send Money"
      description="Transfer funds to another user or wallet"
    >
      <Form onSubmit={handleSubmit} loading={isSubmitting}>
        {/* Recipient */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Send To</h3>
          <div className="flex gap-2 items-start">
            <FormInput
              placeholder="Enter recipient email"
              name="recipientEmail"
              type="email"
              value={values.recipientEmail}
              onChange={handleChange}
              error={touched.recipientEmail && !!errors.recipientEmail}
              errorMessage={errors.recipientEmail}
              className="flex-1"
            />
            <button
              type="button"
              onClick={handleSearchRecipient}
              className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 h-10 rounded-lg transition-colors"
            >
              Search
            </button>
          </div>
          {recipientInfo && (
            <div className="mt-3 p-3 bg-violet-50 border border-violet-200 rounded-xl flex items-center gap-3">
              <img
                src={recipientInfo.profileImage}
                alt={recipientInfo.fullName}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 flex items-center gap-1">
                  {recipientInfo.fullName}
                  {recipientInfo.verified && (
                    <CheckCircle2 size={16} className="text-violet-600" />
                  )}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {recipientInfo.email}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Amount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Amount"
            placeholder="100"
            type="number"
            name="amount"
            step="0.01"
            value={values.amount}
            onChange={handleChange}
            error={touched.amount && !!errors.amount}
            errorMessage={errors.amount}
            required
          />
          <FormSelect
            label="Currency"
            name="currency"
            options={CURRENCIES.map((curr) => ({ label: curr, value: curr }))}
            value={values.currency}
            onChange={handleChange}
          />
        </div>

        {/* Recurring */}
        <div>
          <FormCheckbox
            label="Make this a recurring transfer"
            name="isRecurring"
            checked={values.isRecurring}
            onChange={handleChange}
          />
          {values.isRecurring && (
            <div className="mt-4 p-4 rounded-xl border border-gray-200 space-y-4">
              <FormSelect
                label="Frequency"
                name="frequency"
                options={[
                  { label: "Weekly", value: "weekly" },
                  { label: "Bi-weekly", value: "biweekly" },
                  { label: "Monthly", value: "monthly" },
                  { label: "Quarterly", value: "quarterly" },
                  { label: "Annually", value: "annually" },
                ]}
                value={values.frequency || ""}
                onChange={handleChange}
              />
              <FormInput
                label="Recurring Amount"
                placeholder="Amount for each recurring payment"
                type="number"
                name="frequencyAmount"
                step="0.01"
                value={values.frequencyAmount || ""}
                onChange={handleChange}
                error={touched.frequencyAmount && !!errors.frequencyAmount}
                errorMessage={errors.frequencyAmount}
              />
            </div>
          )}
        </div>

        {/* Description */}
        <FormTextarea
          label="Description (Optional)"
          placeholder="Add a note about this transfer"
          name="description"
          value={values.description || ""}
          onChange={handleChange}
          className="min-h-20"
        />

        {/* Summary */}
        {values.amount && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <h4 className="font-bold text-gray-900 mb-3 text-sm">
              Transfer Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold">
                  {values.currency} {parseFloat(values.amount).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fee (2.5%)</span>
                <span className="font-semibold">
                  {values.currency}{" "}
                  {(parseFloat(values.amount) * 0.025).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-emerald-200 pt-2 flex justify-between">
                <span className="text-gray-900 font-bold">Total to Send</span>
                <span className="font-bold text-emerald-600">
                  {values.currency}{" "}
                  {(parseFloat(values.amount) * 1.025).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
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
            loading={isSubmitting}
            variant="primary"
            size="lg"
            className="sm:flex-1"
          >
            Send Money
          </FormButton>
        </div>
      </Form>
    </Modal>
  );
}
