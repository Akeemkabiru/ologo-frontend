"use client";

import InputField from "@/components/ui/inputField";
import Link from "next/link";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const PersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
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
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Tell us about yourself
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-sm mb-8 leading-relaxed">
        We need your personal information to verify your identity
      </p>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            type="text"
            placeholder="John"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="firstName"
            error={formik.touched.firstName && !!formik.errors.firstName}
            errorMessage={formik.errors.firstName}
          />
          <InputField
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="lastName"
            error={formik.touched.lastName && !!formik.errors.lastName}
            errorMessage={formik.errors.lastName}
          />
        </div>

        <InputField
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
          error={formik.touched.email && !!formik.errors.email}
          errorMessage={formik.errors.email}
        />

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
        <button
          type="submit"
          className="block text-center w-full py-3 rounded-lg font-semibold transition-all duration-200 bg-violet-600 hover:bg-violet-700 text-white mt-8"
        >
          Continue to Next Step
        </button>
      </form>
    </div>
  );
}
