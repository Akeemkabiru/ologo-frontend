"use client";

import { FormButton } from "@/components/forms/FormComponents";
import InputField from "@/components/ui/inputField";
import { useFormik } from "formik";
import * as Yup from "yup";

const PersonalInfoSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  nationality: Yup.string().required("Nationality is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string().required("Postal code is required"),
});

export default function PersonalInfo() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      nationality: "",
      address: "",
      city: "",
      postalCode: "",
    },
    validationSchema: PersonalInfoSchema,
    onSubmit: (values) => {
      // Store in sessionStorage for next page
      sessionStorage.setItem("kycPersonalInfo", JSON.stringify(values));
      // Navigate to next page
      window.location.href = "/kyc/id-upload";
    },
  });

  return (
    <div className="flex flex-col">
      {/* Title */}
      <h1 className="text-xl font-bold text-gray-900 mb-2">
        Tell us about yourself
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-sm mb-8 leading-relaxed">
        We need your personal information to verify your identity
      </p>

      {/* Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-6 grid grid-cols-2 gap-x-4"
      >
        <InputField
          label="Date of Birth"
          type="date"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="dateOfBirth"
          error={formik.touched.dateOfBirth && !!formik.errors.dateOfBirth}
          errorMessage={formik.errors.dateOfBirth}
        />

        <InputField
          label="Nationality"
          type="text"
          placeholder="United States"
          value={formik.values.nationality}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="nationality"
          error={formik.touched.nationality && !!formik.errors.nationality}
          errorMessage={formik.errors.nationality}
        />

        <InputField
          label="Address"
          type="text"
          placeholder="123 Main Street"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="address"
          error={formik.touched.address && !!formik.errors.address}
          errorMessage={formik.errors.address}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="City"
            type="text"
            placeholder="New York"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="city"
            error={formik.touched.city && !!formik.errors.city}
            errorMessage={formik.errors.city}
          />
          <InputField
            label="Postal Code"
            type="text"
            placeholder="10001"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="postalCode"
            error={formik.touched.postalCode && !!formik.errors.postalCode}
            errorMessage={formik.errors.postalCode}
          />
        </div>

        {/* Submit Button */}
      </form>
      <FormButton type="submit" className=" w-full">
        Continue to Next Step
      </FormButton>
    </div>
  );
}
