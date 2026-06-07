"use client";

import InputField from "@/components/ui/inputField";
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
        setSubmittedEmail(values.email);
        setIsSubmitted(true);
      } catch (error) {
        console.error(error);
      }
    },
  });

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-4xl border flex flex-col items-center border-white/10 bg-white/20 backdrop-blur-xl shadow-2xl p-8 text-center">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm16 3.38L12 12.4l-8-5.02V6h16v1.38z" />
              </svg>
            </div>

            {/* Content */}
            <div className="space-y-2 mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Check your email
              </h2>

              <p className="text-gray-500 text-sm">
                We’ve sent reset instructions to:
              </p>

              <p className="text-gray-900 font-semibold break-all">
                {submittedEmail}
              </p>
            </div>

            {/* Note */}
            <div className="bg-white/30 border border-[#7f22fe]/20 rounded-2xl p-4 mb-6 text-left w-fit">
              <p className="text-sm text-gray-700">
                Follow the link in your inbox to reset your password.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 flex flex-col w-full">
              <Link href="/auth/login">
                <button className="w-full bg-violet-600 text-white font-semibold py-2.5 rounded-2xl hover:bg-violet-700 transition-all shadow-md">
                  Back to login
                </button>
              </Link>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full border border-white/20 bg-white/30 text-sm text-gray-700 font-semibold py-2.5 rounded-2xl hover:border-[#7f22fe]/50 transition-all"
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
        <div className="rounded-4xl border border-white/10 bg-white/20 backdrop-blur-xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-10 space-y-1">
            <h1 className="text-lg font-bold text-gray-900">Reset password</h1>
            <p className="text-gray-500 text-sm">
              Enter your email to receive reset instructions
            </p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <InputField
              label="Email address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              errorMessage={
                formik.touched.email ? formik.errors.email : undefined
              }
            />

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-violet-600 text-white font-semibold py-2.5 rounded-2xl hover:bg-violet-700 active:scale-95 transition-all shadow-md"
            >
              {formik.isSubmitting ? "Sending..." : "Send reset link"}
            </button>

            {/* Secondary action grouped properly */}
            <div className="pt-2 text-center">
              <span className="text-sm text-gray-500">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="text-violet-600 font-semibold hover:text-violet-700"
                >
                  Back to login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
