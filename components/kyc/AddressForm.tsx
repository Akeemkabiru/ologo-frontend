"use client";

import { useRouter } from "next/navigation";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import { FormButton } from "@/components/forms/FormComponents";
import { useForm } from "@/hooks";
import { NIGERIAN_STATES, COUNTRIES } from "@/lib/constants";
import ChargesSummary from "@/components/ui/ChargesSummary";

interface AddressValues {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const initialValues: AddressValues = {
  streetAddress: "",
  city: "",
  state: "",
  postalCode: "",
  country: "Nigeria",
};

interface AddressFormProps {
  storageKey: string;
  nextHref: string;
  backHref: string;
  submitLabel?: string;
  /** When set, shows a charges & tax summary for this fee before submitting. */
  chargeFee?: number;
  chargeLabel?: string;
}

export default function AddressForm({
  storageKey,
  nextHref,
  backHref,
  submitLabel = "Continue",
  chargeFee,
  chargeLabel = "Verification fee",
}: AddressFormProps) {
  const router = useRouter();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useForm<AddressValues>({
      initialValues,
      onSubmit: async (values) => {
        sessionStorage.setItem(storageKey, JSON.stringify(values));
        router.push(nextHref);
      },
      validate: (values) => {
        const errors: Partial<AddressValues> = {};
        if (!values.streetAddress) errors.streetAddress = "Street address is required";
        if (!values.city) errors.city = "City is required";
        if (!values.state) errors.state = "State is required";
        if (!values.country) errors.country = "Country is required";
        return errors;
      },
    });

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold text-gray-900 mb-1">
        Physical Address
      </h1>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Tell us where you&apos;re physically located
      </p>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <InputField
          label="Street Address"
          name="streetAddress"
          required
          placeholder="123 Main Street"
          value={values.streetAddress}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.streetAddress && !!errors.streetAddress}
          errorMessage={errors.streetAddress}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="City"
            name="city"
            required
            placeholder="e.g., Ikeja"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.city && !!errors.city}
            errorMessage={errors.city}
          />
          <SelectField
            label="State"
            name="state"
            required
            options={NIGERIAN_STATES.map((state) => ({
              label: state,
              value: state,
            }))}
            value={values.state}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.state && !!errors.state}
            errorMessage={errors.state}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Country"
            name="country"
            required
            options={COUNTRIES.map((country) => ({
              label: country,
              value: country,
            }))}
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.country && !!errors.country}
            errorMessage={errors.country}
          />
          <InputField
            label="Postal Code (optional)"
            name="postalCode"
            placeholder="e.g., 100001"
            value={values.postalCode}
            onChange={handleChange}
          />
        </div>

        {chargeFee != null && chargeFee > 0 && (
          <ChargesSummary
            amount={chargeFee}
            currency="USD"
            amountLabel={chargeLabel}
            totalLabel="Total to pay"
          />
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => router.push(backHref)}
            className="sm:flex-1"
          >
            Back
          </FormButton>
          <FormButton
            type="submit"
            size="lg"
            loading={isSubmitting}
            className="sm:flex-1"
          >
            {submitLabel}
          </FormButton>
        </div>
      </form>
    </div>
  );
}
