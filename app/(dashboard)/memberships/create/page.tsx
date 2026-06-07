"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormInput,
  FormTextarea,
  FormSelect,
  FormButton,
} from "@/components/forms/FormComponents";
import { CURRENCIES, FREQUENCY_OPTIONS } from "@/lib/constants";
import { useForm } from "@/hooks";

interface MembershipFormValues {
  name: string;
  description: string;
  membershipAmount: string;
  frequency: string;
  currency: string;
  features?: string;
}

const initialValues: MembershipFormValues = {
  name: "",
  description: "",
  membershipAmount: "",
  frequency: "monthly",
  currency: "USD",
  features: "",
};

export default function CreateMembershipPage() {
  const router = useRouter();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm<MembershipFormValues>({
    initialValues,
    onSubmit: async (values) => {
      try {
        // TODO: Call membershipService.createMembership()
        console.log("Creating membership:", values);

        // Mock success
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/memberships");
      } catch (error) {
        console.error("Failed to create membership:", error);
      }
    },
    validate: (values) => {
      const errors: Partial<MembershipFormValues> = {};
      if (!values.name) errors.name = "Membership name is required";
      if (!values.description) errors.description = "Description is required";
      if (!values.membershipAmount)
        errors.membershipAmount = "Amount is required";
      return errors;
    },
  });

  return (
    <main className="min-h-screen  px-8 pb-8 max-w-2xl">
      <div className="mb-8">
        <Link href="/memberships">
          <button className="text-violet-600 hover:text-violet-700 font-semibold mb-4 flex items-center gap-2">
            ← Back to Memberships
          </button>
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Create Membership
        </h1>
        <p className="text-gray-600">
          Set up a recurring membership program to generate stable revenue
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <Form onSubmit={handleSubmit} loading={isSubmitting}>
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Basic Information
            </h2>

            <FormInput
              label="Membership Name"
              placeholder="e.g., Premium Supporter"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && !!errors.name}
              errorMessage={errors.name}
              required
            />

            <FormTextarea
              label="Description"
              placeholder="Describe what members get with this membership"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && !!errors.description}
              errorMessage={errors.description}
              required
              className="min-h-32"
            />

            <FormTextarea
              label="Features & Benefits"
              placeholder="List the features and benefits separated by newlines"
              name="features"
              value={values.features || ""}
              onChange={handleChange}
              className="min-h-24"
              helperText="Each line will be displayed as a separate feature"
            />
          </div>

          {/* Pricing */}
          <div className="mb-8 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Pricing</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                label="Amount"
                placeholder="9.99"
                type="number"
                name="membershipAmount"
                step="0.01"
                value={values.membershipAmount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.membershipAmount && !!errors.membershipAmount}
                errorMessage={errors.membershipAmount}
                required
              />

              <FormSelect
                label="Frequency"
                name="frequency"
                options={[
                  { label: "Weekly", value: "weekly" },
                  { label: "Monthly", value: "monthly" },
                  { label: "Quarterly", value: "quarterly" },
                  { label: "Yearly", value: "yearly" },
                ]}
                value={values.frequency}
                onChange={handleChange}
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
                required
              />
            </div>

            {values.membershipAmount && (
              <div className="mt-6 p-4 bg-violet-50 border border-violet-200 rounded-lg">
                <p className="text-sm text-gray-600">Member will be charged</p>
                <p className="text-lg font-bold text-violet-600">
                  {values.currency}{" "}
                  {parseFloat(values.membershipAmount).toFixed(2)} per{" "}
                  {values.frequency}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-8 flex gap-4">
            <FormButton
              type="submit"
              loading={isSubmitting}
              variant="primary"
              size="lg"
            >
              Create Membership
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

      {/* Info Box */}
      <div className="mt-8 bg-violet-50 border border-violet-200 rounded-2xl p-6">
        <h3 className="font-bold text-violet-900 mb-3">
          Tips for Creating a Great Membership
        </h3>
        <ul className="space-y-2 text-sm text-violet-800">
          <li>• Clearly describe the value members will receive</li>
          <li>• Be competitive with pricing while accounting for your costs</li>
          <li>• Highlight exclusive benefits that members-only get</li>
          <li>• Consider offering an annual option for committed supporters</li>
          <li>• Start building a community around your membership</li>
        </ul>
      </div>
    </main>
  );
}
