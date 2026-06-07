"use client";

import InputField from "@/components/ui/inputField";
import Toggle from "@/components/ui/toggle";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

// Validation schema
const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      try {
        console.log("Form submitted:", { ...values, rememberMe });

        // simulate API safety hook (optional future-proofing)
        await new Promise((res) => setTimeout(res, 0));

        router.push("/dashboard");
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-4xl border border-white/10 bg-white/20 backdrop-blur-xl shadow-2xl p-8 transition-all duration-300">
          <div className="mb-8">
            <h1 className="text-lg font-bold text-gray-900 mb-1">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="grid gap-4">
            <div className="grid gap-5">
              <InputField
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && !!formik.errors.email}
                errorMessage={
                  formik.touched.email ? formik.errors.email : undefined
                }
              />

              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && !!formik.errors.password}
                errorMessage={
                  formik.touched.password ? formik.errors.password : undefined
                }
                rightIcon={
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer transition-all duration-500"
                  >
                    {showPassword ? (
                      <Eye size={16} color="#7f22fe" />
                    ) : (
                      <EyeOff size={16} color="#7f22fe" />
                    )}
                  </button>
                }
              />

              <div className="flex items-center justify-between">
                <Toggle
                  checked={rememberMe}
                  onChange={setRememberMe}
                  label="Remember Me"
                />

                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-violet-600 text-white font-semibold py-2.5 px-4 rounded-2xl hover:bg-violet-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {formik.isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center gap-4 my-6">
            <div className="w-16 h-px bg-gray-50"></div>
            <span className="text-gray-400 text-sm font-medium">OR</span>
            <div className="w-16 h-px bg-gray-50"></div>
          </div>

          <div className="flex items-center flex-row-reverse gap-x-4 justify-center">
            {/* Apple */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 28 28"
              fill="#000000"
              aria-label="Sign in with Apple"
              role="img"
            >
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.905-.08 1.81-.78 3.02-.67 1.44.12 2.51.72 3.15 1.81-3.0 1.8-2.48 5.51.48 6.5-.59 1.38-1.38 2.24-2.63 2.93zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>

            {/* Google */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 48 48"
              aria-label="Sign in with Google"
              role="img"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.72 1.22 9.21 3.6l6.85-6.85C35.9 2.46 30.4 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.43 13.13 17.81 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.1 24.5c0-1.64-.15-3.21-.43-4.75H24v9.02h12.4c-.54 2.9-2.18 5.37-4.66 7.03l7.19 5.6C43.98 37.61 46.1 31.5 46.1 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.54 28.43A14.5 14.5 0 019.5 24c0-1.52.26-2.99.72-4.43l-7.98-6.2A24 24 0 000 24c0 3.87.92 7.53 2.56 10.78l7.98-6.35z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.14 15.9-5.82l-7.19-5.6c-2 1.34-4.6 2.12-8.71 2.12-6.19 0-11.57-3.63-13.46-8.93l-7.98 6.35C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
          </div>
        </div>

        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/register"
              className="font-semibold text-violet-600 hover:text-violet-700 transition-colors"
            >
              Sign up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
