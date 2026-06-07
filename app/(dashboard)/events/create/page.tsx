"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormGroup,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormButton,
  FormFileUpload,
} from "@/components/forms/FormComponents";
import { CURRENCIES, TIMEZONES, FREQUENCY_OPTIONS } from "@/lib/constants";
import { generateId } from "@/lib/utils";
import { useForm } from "@/hooks";
import Image from "next/image";
interface EventFormValues {
  name: string;
  description: string;
  expectedAmount: string;
  currency: string;
  expectedDate: string;
  timezone: string;
  tags: string;
  isPrivate: boolean;
  image?: File;
}
const initialValues: EventFormValues = {
  name: "",
  description: "",
  expectedAmount: "",
  currency: "USD",
  expectedDate: "",
  timezone: "UTC",
  tags: "",
  isPrivate: false,
};
export default function CreateEventPage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm<EventFormValues>({
    initialValues,
    onSubmit: async (values) => {
      try {
        // TODO: Call eventService.createEvent(values)
        console.log("Creating event:", values);
        // Mock success
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/events");
      } catch (error) {
        console.error("Failed to create event:", error);
      }
    },
    validate: (values) => {
      const errors: Partial<EventFormValues> = {};
      if (!values.name) errors.name = "Event name is required";
      if (!values.description) errors.description = "Description is required";
      if (!values.expectedAmount)
        errors.expectedAmount = "Expected amount is required";
      if (!values.expectedDate)
        errors.expectedDate = "Expected date is required";
      return errors;
    },
  });
  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <main className="ml-64 pt-20 px-8 pb-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Event</h1>
        <p className="text-gray-600">
          Start a fundraising event to reach your goals
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <Form onSubmit={handleSubmit} loading={isSubmitting}>
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Basic Information
            </h2>
            <FormInput
              label="Event Name"
              placeholder="e.g., School Fundraiser"
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
              placeholder="Describe your event, its purpose, and impact"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && !!errors.description}
              errorMessage={errors.description}
              required
              className="min-h-32"
            />
            <FormFileUpload
              label="Event Image"
              name="image"
              onChange={(e) => {
                handleChange(e);
                handleImageChange(e.target.files?.[0] || null);
              }}
              helperText="Upload a high-quality image (JPG, PNG, max 5MB)"
              maxSize={5}
            />
            {imagePreview && (
              <div className="mt-4">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="max-w-md h-auto rounded-lg"
                />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Tags"
                placeholder="e.g., education, charity, community"
                name="tags"
                value={values.tags}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText="Comma-separated tags for discoverability"
              />
              <FormCheckbox
                label="Make this event private (only by invitation)"
                name="isPrivate"
                checked={values.isPrivate}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Fundraising Details */}
          <div className="mb-8 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Fundraising Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Target Amount"
                placeholder="e.g., 5000"
                name="expectedAmount"
                type="number"
                value={values.expectedAmount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.expectedAmount && !!errors.expectedAmount}
                errorMessage={errors.expectedAmount}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Expected Completion Date"
                name="expectedDate"
                type="date"
                value={values.expectedDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.expectedDate && !!errors.expectedDate}
                errorMessage={errors.expectedDate}
                required
              />
              <FormSelect
                label="Timezone"
                name="timezone"
                options={TIMEZONES.map((tz) => ({
                  label: tz,
                  value: tz,
                }))}
                value={values.timezone}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-8 flex gap-4">
            <FormButton
              type="submit"
              loading={isSubmitting}
              variant="primary"
              size="lg"
            >
              Create Event
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
