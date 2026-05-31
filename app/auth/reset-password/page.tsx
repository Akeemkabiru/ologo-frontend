"use client";

import { FormInput, FormButton } from "@/components/forms/FormComponents";
import { useFormik } from "formik";
import { useState, Suspense } from "react";
import * as Yup from "yup";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Validation schema
const ResetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isSuccess, setIsSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordValidationSchema,
    onSubmit: async () => {
      try {
        console.log("Password reset with token:", token);
        console.log("New password set successfully");
        setIsSuccess(true);
      } catch (error) {
        console.error("Reset password error:", error);
      }
    },
  });

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Password reset successful
              </h2>
              <p className="text-gray-600 text-sm">
                Your password has been changed. You can now sign in with your
                new password.
              </p>
            </div>

            <Link href="/auth/login">
              <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg">
                Sign in to your account
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Invalid link
              </h2>
              <p className="text-gray-600 text-sm">
                This password reset link is invalid or has expired.
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/auth/forgot-password">
                <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg">
                  Request new link
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="w-full border-2 border-gray-200 hover:bg-violet-50 text-gray-700 font-semibold py-3 rounded-lg">
                  Back to Sign In
                </button>
              </Link>
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
            <h1 className="text-lg font-bold text-gray-900 mb-1">
              Create new password
            </h1>
            <p className="text-gray-500 text-sm">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <FormInput
              label="New password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              errorMessage={formik.errors.password}
              required
            />

            <FormInput
              label="Confirm password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword
              }
              errorMessage={formik.errors.confirmPassword}
              required
            />

            <FormButton
              type="submit"
              loading={formik.isSubmitting}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Reset password
            </FormButton>

            <div className="text-center">
              <Link href="/auth/login">
                <button className="text-violet-600 hover:text-violet-700 font-semibold text-sm">
                  Back to Sign In
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
