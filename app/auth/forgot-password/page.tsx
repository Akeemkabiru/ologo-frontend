"use client";

import { FormInput, FormButton } from "@/components/forms/FormComponents";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Link from "next/link";

const ForgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: ForgotPasswordValidationSchema,
    onSubmit: async (values) => {
      try {
        console.log("Password reset email sent to:", values.email);
        setSubmittedEmail(values.email);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Forgot password error:", error);
      }
    },
  });

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm16 3.38L12 12.4l-8-5.02V6h16v1.38z" />
                </svg>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-600 text-sm mb-4">We've sent password reset instructions to:</p>
              <p className="text-gray-900 font-semibold break-all">{submittedEmail}</p>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-violet-900">Note:</span> Check your inbox and follow the link.
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/auth/login">
                <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg">
                  Back to Sign In
                </button>
              </Link>
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full border-2 border-gray-200 hover:bg-violet-50 text-gray-700 font-semibold py-3 rounded-lg"
              >
                Try another email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Reset password</h1>
            <p className="text-gray-500 text-sm">Enter your email to receive reset instructions</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <FormInput
              label="Email address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              errorMessage={formik.errors.email}
              required
            />

            <FormButton
              type="submit"
              loading={formik.isSubmitting}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Send reset link
            </FormButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Back to{" "}
              <Link href="/auth/login">
                <button className="text-violet-600 hover:text-violet-700 font-semibold">
                  Sign In
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
