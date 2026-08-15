"use client";

import InputField from "@/components/ui/inputField";
import CustomSelectField from "@/components/ui/customSelectField";
import ComboBoxField from "@/components/ui/comboBoxField";
import Checkbox from "@/components/ui/checkbox";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import {
  ACCOUNT_TYPE_KEY,
  ORGANISATION_SUFFIXES,
  TITLE_OPTIONS,
  COUNTRIES,
  STATES_BY_COUNTRY,
  MINIMUM_SIGNUP_AGE,
} from "@/lib/constants";

// Returns the date (YYYY-MM-DD) exactly MINIMUM_SIGNUP_AGE years ago — the
// latest DOB allowed for a valid account.
const maxDobDate = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - MINIMUM_SIGNUP_AGE);
  return d.toISOString().split("T")[0];
};

// Whether a DOB string means the user is at least MINIMUM_SIGNUP_AGE.
const isOldEnough = (dob?: string) => {
  if (!dob) return false;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return false;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age >= MINIMUM_SIGNUP_AGE;
};

// Validation schema - last name is only required for individuals; vendors
// (organisations) get an optional suffix select instead.
const getRegisterValidationSchema = (isVendor: boolean) =>
  Yup.object().shape({
    // Title only applies to personal accounts.
    title: isVendor
      ? Yup.string().notRequired()
      : Yup.string().required("Title is required"),

    firstName: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required(isVendor ? "Business name is required" : "First name is required"),

    lastName: isVendor
      ? Yup.string().notRequired()
      : Yup.string()
          .min(2, "Last name must be at least 2 characters")
          .required("Last name is required"),

    suffix: Yup.string().notRequired(),

    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters")
      .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscores allowed")
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    // Date of birth & the 18+ rule apply to personal accounts only.
    dateOfBirth: isVendor
      ? Yup.string().notRequired()
      : Yup.string()
          .required("Date of birth is required")
          .test(
            "is-adult",
            `You must be at least ${MINIMUM_SIGNUP_AGE} years old to create an account`,
            (value) => isOldEnough(value),
          ),

    country: Yup.string().required("Country is required"),

    state: Yup.string().required("State/Province is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm your password"),

    acceptTerms: Yup.boolean()
      .oneOf([true], "You must accept terms")
      .required(),
  });

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountTypeReady, setAccountTypeReady] = useState(false);
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    const accountType = localStorage.getItem(ACCOUNT_TYPE_KEY);
    if (accountType) {
      setIsVendor(accountType === "organisation");
      setAccountTypeReady(true);
    } else {
      router.replace("/auth/account-type?next=/auth/register");
    }
  }, [router]);

  const formik = useFormik({
    initialValues: {
      title: "",
      firstName: "",
      lastName: "",
      suffix: "",
      username: "",
      email: "",
      dateOfBirth: "",
      country: "",
      state: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema: getRegisterValidationSchema(isVendor),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        console.log(values);
        router.push("/kyc");
      } catch (error) {
        console.error("Register error:", error);
      }
    },
  });

  // State/Province list depends on the chosen country; unknown countries fall
  // back to free typing via the combobox.
  const stateOptions = useMemo(
    () => STATES_BY_COUNTRY[formik.values.country] ?? [],
    [formik.values.country],
  );

  if (!accountTypeReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Card (same as login) */}
        <div className="rounded-4xl border border-white/10 bg-white/20 backdrop-blur-xl shadow-2xl p-6 sm:p-8 transition-all duration-300">
          {/* Header */}
          <div className="mb-5 sm:mb-6 md:mb-8">
            <h1 className="text-lg font-bold text-gray-900 mb-1">
              Create account
            </h1>
            <p className="text-gray-500 text-sm">Join us and get started</p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="grid gap-4">
            <div className="grid gap-5">
              {/* Title — personal accounts only */}
              {!isVendor && (
                <CustomSelectField
                  placeholder="Title"
                  name="title"
                  options={TITLE_OPTIONS}
                  value={formik.values.title}
                  onChange={(val) => formik.setFieldValue("title", val)}
                  onBlur={() => formik.setFieldTouched("title", true)}
                  error={formik.touched.title && !!formik.errors.title}
                  errorMessage={
                    formik.touched.title ? formik.errors.title : undefined
                  }
                />
              )}

              {/* First Name (personal) / Business Name (organisation) */}
              <div className="grid gap-x-3 gap-y-5 grid-cols-1 sm:grid-cols-2">
                {" "}
                <InputField
                  type="text"
                  placeholder={isVendor ? "Business Name" : "First Name"}
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && !!formik.errors.firstName}
                  errorMessage={
                    formik.touched.firstName
                      ? formik.errors.firstName
                      : undefined
                  }
                />
                {/* Last Name (individual) / Suffix (vendor) */}
                {isVendor ? (
                  <CustomSelectField
                    placeholder="Suffix"
                    name="suffix"
                    options={ORGANISATION_SUFFIXES.filter((s) => s.value)}
                    value={formik.values.suffix}
                    onChange={(val) => formik.setFieldValue("suffix", val)}
                    onBlur={() => formik.setFieldTouched("suffix", true)}
                    error={formik.touched.suffix && !!formik.errors.suffix}
                    errorMessage={
                      formik.touched.suffix ? formik.errors.suffix : undefined
                    }
                  />
                ) : (
                  <InputField
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && !!formik.errors.lastName}
                    errorMessage={
                      formik.touched.lastName
                        ? formik.errors.lastName
                        : undefined
                    }
                  />
                )}
              </div>

              {/* Username */}
              <InputField
                type="text"
                placeholder="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && !!formik.errors.username}
                errorMessage={
                  formik.touched.username ? formik.errors.username : undefined
                }
              />

              {/* Email */}
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

              {/* Date of Birth (personal accounts only — must be 18+) */}
              {!isVendor && (
                <InputField
                  type="date"
                  label="Date of Birth"
                  name="dateOfBirth"
                  max={maxDobDate()}
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.dateOfBirth && !!formik.errors.dateOfBirth
                  }
                  errorMessage={
                    formik.touched.dateOfBirth
                      ? formik.errors.dateOfBirth
                      : undefined
                  }
                  helperText={`You must be at least ${MINIMUM_SIGNUP_AGE} years old.`}
                />
              )}

              {/* Country & State/Province (type, search or pick) */}
              <div className="grid gap-x-3 gap-y-5 grid-cols-1 sm:grid-cols-2">
                <ComboBoxField
                  placeholder="Country"
                  name="country"
                  options={COUNTRIES}
                  value={formik.values.country}
                  onChange={(val) => {
                    formik.setFieldValue("country", val);
                    // Reset state when the country changes.
                    formik.setFieldValue("state", "");
                  }}
                  onBlur={() => formik.setFieldTouched("country", true)}
                  error={formik.touched.country && !!formik.errors.country}
                  errorMessage={
                    formik.touched.country ? formik.errors.country : undefined
                  }
                />
                <ComboBoxField
                  placeholder="State/Province"
                  name="state"
                  options={stateOptions}
                  value={formik.values.state}
                  onChange={(val) => formik.setFieldValue("state", val)}
                  onBlur={() => formik.setFieldTouched("state", true)}
                  error={formik.touched.state && !!formik.errors.state}
                  errorMessage={
                    formik.touched.state ? formik.errors.state : undefined
                  }
                />
              </div>

              {/* Password */}
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
                    onClick={() => setShowPassword((p) => !p)}
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

              {/* Confirm Password */}
              <InputField
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
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
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    className="cursor-pointer transition-all duration-500"
                  >
                    {showConfirmPassword ? (
                      <Eye size={16} color="#7f22fe" />
                    ) : (
                      <EyeOff size={16} color="#7f22fe" />
                    )}
                  </button>
                }
              />

              {/* Terms */}
              <Checkbox
                checked={formik.values.acceptTerms}
                onChange={(val) => formik.setFieldValue("acceptTerms", val)}
                label="I accept the terms and conditions"
                error={
                  formik.touched.acceptTerms && !!formik.errors.acceptTerms
                }
                errorMessage={
                  formik.touched.acceptTerms
                    ? formik.errors.acceptTerms
                    : undefined
                }
              />

              {/* Privacy Policy & Terms buttons */}
              <div className="flex flex-wrap gap-3 -mt-1">
                <button
                  type="button"
                  className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors"
                >
                  Privacy Policy
                </button>
                <span className="text-gray-300 text-xs">•</span>
                <button
                  type="button"
                  className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors"
                >
                  Terms &amp; Conditions
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-violet-600 text-white font-semibold py-2.5 px-4 rounded-2xl hover:bg-violet-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {formik.isSubmitting ? "Creating..." : "Create account"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="w-16 h-px bg-gray-50"></div>
            <span className="text-gray-400 text-sm font-medium">OR</span>
            <div className="w-16 h-px bg-gray-50"></div>
          </div>

          {/* Social sign-up options */}
          <div className="flex items-center flex-row-reverse gap-x-4 justify-center">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="#000000">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.905-.08 1.81-.78 3.02-.67 1.44.12 2.51.72 3.15 1.81-3.0 1.8-2.48 5.51.48 6.5-.59 1.38-1.38 2.24-2.63 2.93zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>

            <svg width="18" height="18" viewBox="0 0 48 48">
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

            {/* Instagram */}
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              role="img"
              aria-label="Sign up with Instagram"
            >
              <defs>
                <linearGradient
                  id="instagram-gradient-register"
                  x1="2"
                  y1="22"
                  x2="22"
                  y2="2"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#FEDA75" />
                  <stop offset="0.25" stopColor="#FA7E1E" />
                  <stop offset="0.5" stopColor="#D62976" />
                  <stop offset="0.75" stopColor="#962FBF" />
                  <stop offset="1" stopColor="#4F5BD5" />
                </linearGradient>
              </defs>
              <rect
                width={22}
                height={22}
                x={1}
                y={1}
                rx={6.5}
                ry={6.5}
                fill="url(#instagram-gradient-register)"
              />
              <rect
                width={13}
                height={13}
                x={5.5}
                y={5.5}
                rx={4}
                ry={4}
                fill="none"
                stroke="#ffffff"
                strokeWidth={1.7}
              />
              <circle
                cx={12}
                cy={12}
                r={3.2}
                fill="none"
                stroke="#ffffff"
                strokeWidth={1.7}
              />
              <circle cx={16.2} cy={7.8} r={1.05} fill="#ffffff" />
            </svg>

            {/* Twitter (X) */}
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="#000000"
              role="img"
              aria-label="Sign up with Twitter"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-violet-600 hover:text-violet-700 transition-colors"
            >
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
