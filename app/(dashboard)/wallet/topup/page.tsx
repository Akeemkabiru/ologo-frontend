"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormInput,
  FormSelect,
  FormButton,
  FormCheckbox,
} from "@/components/forms/FormComponents";
import { CURRENCIES } from "@/lib/constants";
import { useForm } from "@/hooks";
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
export default function WalletTopUpPage() {
  const router = useRouter();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm<TopUpFormValues>({
    initialValues,
    onSubmit: async (values) => {
      try {
        // TODO: Call walletService.topUpWallet()
        console.log("Top-up wallet:", values);
        // Mock success
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/wallet");
      } catch (error) {
        console.error("Failed to top-up wallet:", error);
      }
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
  return (
    <main className="ml-64 pt-20 px-8 pb-8 max-w-2xl">
      <div className="mb-8">
        <Link href="/wallet">
          <button className="text-blue-600 hover:text-blue-700 font-semibold mb-4 flex items-center gap-2">
            ← Back to Wallet
          </button>
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Top Up Wallet</h1>
        <p className="text-gray-600">
          Add funds to your wallet using your preferred payment method
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <Form onSubmit={handleSubmit} loading={isSubmitting}>
          {/* Amount Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Amount</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Amount"
                placeholder="100"
                type="number"
                name="amount"
                step="0.01"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.amount && !!errors.amount}
                errorMessage={errors.amount}
                required
              />
              <FormSelect
                label="Currency"
                name="currency"
                options={CURRENCIES.map((curr) => ({
                  label: curr,
                  value: curr,
                }))}
                value={values.currency}
                onChange={handleChange}
              />
            </div>
            {values.amount && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-600">Total to add</p>
                <p className="text-lg font-bold text-blue-600">
                  {values.currency} {parseFloat(values.amount).toFixed(2)}
                </p>
              </div>
            )}
          </div>
          {/* Payment Method */}
          <div className="mb-8 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Payment Method
            </h2>
            <FormSelect
              label="Select Payment Method"
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
            {/* Card Details */}
            {values.paymentMethod === "card" && (
              <div className="mt-6 p-6  rounded-lg border border-gray-200">
                <FormInput
                  label="Card Number"
                  placeholder="4532 1234 5678 9010"
                  name="cardNumber"
                  value={values.cardNumber || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                    onBlur={handleBlur}
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
                    onBlur={handleBlur}
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
            {/* Bank Transfer */}
            {values.paymentMethod === "bank" && (
              <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  Bank Transfer Details:
                </p>
                <div className="space-y-2 text-sm">
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
                  <p className="text-gray-600 mt-4">
                    Please use your email address as the reference when
                    transferring funds.
                  </p>
                </div>
              </div>
            )}
            {/* Digital Wallet */}
            {values.paymentMethod === "wallet" && (
              <div className="mt-6 p-6 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-gray-600">
                  Connect your digital wallet to proceed with the payment.
                </p>
                <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
          {/* Info Box */}
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> A processing fee of 2.5% will be applied to
              your transaction.
            </p>
          </div>
          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-8 flex gap-4">
            <FormButton
              type="submit"
              loading={isSubmitting}
              variant="primary"
              size="lg"
            >
              Continue to Payment
            </FormButton>
            <FormButton
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => router.back()}
            >
              Cancel
            </FormButton>
          </div>
        </Form>
      </div>
    </main>
  );
}
