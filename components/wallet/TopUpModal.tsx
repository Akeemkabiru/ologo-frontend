"use client";

import React from "react";
import Modal from "@/components/ui/modal";
import {
  Form,
  FormInput,
  FormSelect,
  FormButton,
  FormCheckbox,
} from "@/components/forms/FormComponents";
import { CURRENCIES } from "@/lib/constants";
import { useForm } from "@/hooks";
import ChargesSummary from "@/components/ui/ChargesSummary";

interface TopUpFormValues {
  amount: string;
  currency: string;
  paymentMethod: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  saveCard: boolean;
}

const initialValues: TopUpFormValues = {
  amount: "",
  currency: "USD",
  paymentMethod: "card",
  saveCard: false,
};

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function TopUpModal({
  isOpen,
  onClose,
  onSuccess,
}: TopUpModalProps) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useForm<TopUpFormValues>({
    initialValues,
    onSubmit: async (values) => {
      console.log("Top-up wallet:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetForm();
      onClose();
      onSuccess?.();
    },
    validate: (values) => {
      const errors: Partial<TopUpFormValues> = {};
      if (!values.amount) errors.amount = "Amount is required";
      if (!values.paymentMethod)
        errors.paymentMethod = "Payment method is required";
      if (values.paymentMethod === "card") {
        if (!values.cardNumber) errors.cardNumber = "Card number is required";
        if (!values.expiryDate) errors.expiryDate = "Expiry date is required";
        if (!values.cvv) errors.cvv = "CVV is required";
      }
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
      title="Add Funds"
      description="Top up your wallet using your preferred payment method"
    >
      <Form onSubmit={handleSubmit} loading={isSubmitting}>
        {/* Amount */}
        <div>
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
          {values.amount && (
            <div className="mt-3 p-3 bg-violet-50 border border-violet-200 rounded-xl">
              <p className="text-xs text-gray-600">Total to add</p>
              <p className="text-lg font-bold text-violet-600">
                {values.currency} {parseFloat(values.amount).toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {/* Payment method */}
        <div>
          <FormSelect
            label="Payment Method"
            name="paymentMethod"
            options={[
              { label: "Debit/Credit Card", value: "card" },
              { label: "Bank Transfer", value: "bank" },
              { label: "Digital Wallet", value: "wallet" },
            ]}
            value={values.paymentMethod}
            onChange={handleChange}
            required
          />

          {values.paymentMethod === "card" && (
            <div className="mt-4 p-4 rounded-xl border border-gray-200 space-y-4">
              <FormInput
                label="Card Number"
                placeholder="4532 1234 5678 9010"
                name="cardNumber"
                value={values.cardNumber || ""}
                onChange={handleChange}
                error={touched.cardNumber && !!errors.cardNumber}
                errorMessage={errors.cardNumber}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Expiry Date"
                  placeholder="MM/YY"
                  name="expiryDate"
                  value={values.expiryDate || ""}
                  onChange={handleChange}
                  error={touched.expiryDate && !!errors.expiryDate}
                  errorMessage={errors.expiryDate}
                />
                <FormInput
                  label="CVV"
                  placeholder="123"
                  name="cvv"
                  type="password"
                  value={values.cvv || ""}
                  onChange={handleChange}
                  error={touched.cvv && !!errors.cvv}
                  errorMessage={errors.cvv}
                />
              </div>
              <FormCheckbox
                label="Save this card for future transactions"
                name="saveCard"
                checked={values.saveCard}
                onChange={handleChange}
              />
            </div>
          )}

          {values.paymentMethod === "bank" && (
            <div className="mt-4 p-4 bg-violet-50 border border-violet-200 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Bank Transfer Details</p>
              <div className="space-y-1.5 text-sm">
                <p>
                  <span className="font-semibold">Bank Name:</span> First Bank
                </p>
                <p>
                  <span className="font-semibold">Account Number:</span>{" "}
                  1234567890
                </p>
                <p>
                  <span className="font-semibold">Routing Number:</span>{" "}
                  021000021
                </p>
                <p className="text-gray-600 mt-3">
                  Please use your email address as the reference when
                  transferring funds.
                </p>
              </div>
            </div>
          )}

          {values.paymentMethod === "wallet" && (
            <div className="mt-4 p-4 bg-violet-50 border border-violet-200 rounded-xl">
              <p className="text-sm text-gray-600">
                Connect your digital wallet to proceed with the payment.
              </p>
              <button
                type="button"
                className="mt-3 w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>

        {/* Charges & tax */}
        {values.amount && parseFloat(values.amount) > 0 && (
          <ChargesSummary
            amount={parseFloat(values.amount)}
            currency={values.currency}
            amountLabel="Top-up amount"
            totalLabel="Total to pay"
          />
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
            Continue to Payment
          </FormButton>
        </div>
      </Form>
    </Modal>
  );
}
