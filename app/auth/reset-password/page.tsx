"use client";

import InputField from "@/components/ui/inputField";
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
        console.log("Reset token:", token);
        setIsSuccess(true);
      } catch (error) {
        console.error(error);
      }
    },
  });

  // ✅ SUCCESS STATE (glass style)
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-4xl border border-white/10 bg-white/20 backdrop-blur-xl shadow-2xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14l-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9l-7 7z" />
                </svg>
              </div>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Password reset successful
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              You can now sign in with your new password
            </p>

            <Link href="/auth/login">
              <button className="w-full bg-violet-600 text-white font-semibold py-2.5 rounded-2xl hover:bg-violet-700 transition-all shadow-md">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ❌ INVALID TOKEN STATE (glass style)
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-4xl border border-white/10 bg-white/20 backdrop-blur-xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M1 21h22L12 2 1 21zm11-3h2v2h-2v-2zm0-8h2v6h-2v-6z" />
              </svg>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Invalid or expired link
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              This reset link is no longer valid
            </p>

            <div className="space-y-3">
              <Link href="/auth/forgot-password">
                <button className="w-full bg-violet-600 text-white font-semibold py-2.5 rounded-2xl hover:bg-violet-700 transition-all shadow-md">
                  Request new link
                </button>
              </Link>

              <Link href="/auth/login">
                <button className="w-full border border-white/20 bg-white/30 text-gray-700 font-semibold py-2.5 rounded-2xl hover:border-[#7f22fe]/50 transition-all">
                  Back to login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🔐 MAIN FORM (MATCHES LOGIN DESIGN)
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-4xl border border-white/10 bg-white/20 backdrop-blur-xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-lg font-bold text-gray-900 mb-1">
              Create new password
            </h1>
            <p className="text-gray-500 text-sm">
              Enter your new password below
            </p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="grid gap-5">
            <InputField
              type="password"
              name="password"
              placeholder="New password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              errorMessage={
                formik.touched.password ? formik.errors.password : undefined
              }
            />

            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword
              }
              errorMessage={
                formik.touched.confirmPassword
                  ? formik.errors.confirmPassword
                  : undefined
              }
            />

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-violet-600 text-white font-semibold py-2.5 rounded-2xl hover:bg-violet-700 active:scale-95 transition-all shadow-md"
            >
              {formik.isSubmitting ? "Resetting..." : "Reset password"}
            </button>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-sm font-semibold text-violet-600 hover:text-violet-700"
              >
                Back to login
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
