"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormInput,
  FormSelect,
  FormButton,
  FormTextarea,
  FormCheckbox,
} from "@/components/forms/FormComponents";
import { CheckCircle2 } from "lucide-react";
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
export default function WalletTransferPage() {
  const router = useRouter();
  const [recipientInfo, setRecipientInfo] = useState<any>(null);
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm<TransferFormValues>({
    initialValues,
    onSubmit: async (values) => {
      try {
        // TODO: Call walletService.transfer()
        console.log("Transfer funds:", values);
        // Mock success
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/wallet");
      } catch (error) {
        console.error("Failed to transfer:", error);
      }
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
  const handleSearchRecipient = async () => {
    // TODO: Call userService.searchUsers() with email
    console.log("Searching for user:", values.recipientEmail);
    // Mock result
    setRecipientInfo({
      id: "user-123",
      fullName: "Jane Smith",
      email: values.recipientEmail,
      profileImage: "https://via.placeholder.com/50",
      verified: true,
    });
  };
  return (
    <main className="ml-64 pt-20 px-8 pb-8 max-w-2xl">
      <div className="mb-8">
        <Link href="/wallet">
          <button className="text-violet-600 hover:text-violet-700 font-semibold mb-4 flex items-center gap-2">
            ← Back to Wallet
          </button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Send Money</h1>
        <p className="text-gray-600">
          Transfer funds to another user or wallet
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <Form onSubmit={handleSubmit} loading={isSubmitting}>
          {/* Recipient Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Send To</h2>
            <div className="flex gap-2">
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
                className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors h-10 mt-7"
              >
                Search
              </button>
            </div>
            {recipientInfo && (
              <div className="mt-4 p-4 bg-violet-50 border border-violet-200 rounded-lg flex items-center gap-3">
                <img
                  src={recipientInfo.profileImage}
                  alt={recipientInfo.fullName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {recipientInfo.fullName}
                    {recipientInfo.verified && (
                      <CheckCircle2
                        size={18}
                        className="text-violet-600 ml-1 inline"
                      />
                    )}
                  </p>
                  <p className="text-sm text-gray-600">{recipientInfo.email}</p>
                </div>
              </div>
            )}
          </div>
          {/* Amount Section */}
          <div className="mb-8 border-t border-gray-200 pt-8">
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
          </div>
          {/* Transfer Type */}
          <div className="mb-8 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Transfer Type
            </h2>
            <FormCheckbox
              label="Make this a recurring transfer"
              name="isRecurring"
              checked={values.isRecurring}
              onChange={handleChange}
            />
            {values.isRecurring && (
              <div className="mt-6 p-6  rounded-lg border border-gray-200 space-y-4">
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
          <div className="mb-8 border-t border-gray-200 pt-8">
            <FormTextarea
              label="Description (Optional)"
              placeholder="Add a note about this transfer"
              name="description"
              value={values.description || ""}
              onChange={handleChange}
              className="min-h-24"
            />
          </div>
          {/* Summary */}
          {values.amount && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-3">Transfer Summary</h3>
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
                <div className="border-t border-green-200 pt-2 flex justify-between">
                  <span className="text-gray-900 font-bold">Total to Send</span>
                  <span className="font-bold text-green-600">
                    {values.currency}{" "}
                    {(parseFloat(values.amount) * 1.025).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-8 flex gap-4">
            <FormButton
              type="submit"
              loading={isSubmitting}
              variant="primary"
              size="lg"
            >
              Send Money
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
