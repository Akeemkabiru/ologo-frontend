"use client";

import InputField from "@/components/ui/inputField";
import Checkbox from "@/components/ui/checkbox";
import VantaClouds from "@/components/ui/vantaClouds";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

// Validation schema
const RegisterValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    )
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  acceptTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema: RegisterValidationSchema,
    onSubmit: async (values) => {
      try {
        console.log("Form submitted:", values);
        router.push("/kyc");
      } catch (error) {
        console.error("Register error:", error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <VantaClouds />
      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Premium Card Container */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl backdrop-blur-xl p-8 border border-violet-100/50"
          variants={itemVariants}
        >
          {/* Header Section */}
          <motion.div className="mb-8 text-center" variants={itemVariants}>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-900 to-violet-600 bg-clip-text text-transparent mb-3">
              Create Account
            </h1>
            <p className="text-gray-500 text-base">
              Join Ologo and unlock premium features
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Form Fields Container */}
            <motion.div className="space-y-4" variants={containerVariants}>
              {/* Full Name Input */}
              <motion.div variants={itemVariants}>
                <InputField
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.submitCount > 0 && !!formik.errors.fullName}
                  errorMessage={
                    formik.submitCount > 0 ? formik.errors.fullName : undefined
                  }
                />
              </motion.div>

              {/* Username Input */}
              <motion.div variants={itemVariants}>
                <InputField
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.submitCount > 0 && !!formik.errors.username}
                  errorMessage={
                    formik.submitCount > 0 ? formik.errors.username : undefined
                  }
                />
              </motion.div>

              {/* Email Input */}
              <motion.div variants={itemVariants}>
                <InputField
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.submitCount > 0 && !!formik.errors.email}
                  errorMessage={
                    formik.submitCount > 0 ? formik.errors.email : undefined
                  }
                />
              </motion.div>

              {/* Password Input */}
              <motion.div variants={itemVariants}>
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.submitCount > 0 && !!formik.errors.password}
                  errorMessage={
                    formik.submitCount > 0 ? formik.errors.password : undefined
                  }
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer text-gray-400 hover:text-violet-600 transition-colors"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clipRule="evenodd"
                          />
                          <path d="M15.171 13.576l1.813 1.813A6 6 0 0018.98 10c-.79-3.707-4.13-6.5-8.08-6.5-1.712 0-3.357.39-4.82 1.07l2.05 2.05a4 4 0 015.81 5.956z" />
                        </svg>
                      )}
                    </button>
                  }
                />
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div variants={itemVariants}>
                <InputField
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.submitCount > 0 && !!formik.errors.confirmPassword
                  }
                  errorMessage={
                    formik.submitCount > 0
                      ? formik.errors.confirmPassword
                      : undefined
                  }
                  rightIcon={
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="cursor-pointer text-gray-400 hover:text-violet-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clipRule="evenodd"
                          />
                          <path d="M15.171 13.576l1.813 1.813A6 6 0 0018.98 10c-.79-3.707-4.13-6.5-8.08-6.5-1.712 0-3.357.39-4.82 1.07l2.05 2.05a4 4 0 015.81 5.956z" />
                        </svg>
                      )}
                    </button>
                  }
                />
              </motion.div>
            </motion.div>

            {/* Terms Checkbox */}
            <motion.div variants={itemVariants}>
              <Checkbox
                checked={formik.values.acceptTerms}
                onChange={(checked) =>
                  formik.setFieldValue("acceptTerms", checked)
                }
                error={formik.submitCount > 0 && !!formik.errors.acceptTerms}
                errorMessage={
                  formik.submitCount > 0 ? formik.errors.acceptTerms : undefined
                }
                label={
                  <span className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-violet-600 hover:text-violet-700 font-semibold transition-colors"
                    >
                      Terms and Conditions
                    </a>
                  </span>
                }
                id="acceptTerms"
              />
            </motion.div>

            {/* Sign Up Button */}
            <motion.button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-gradient-to-r from-violet-600 to-violet-700 text-white font-bold py-3.5 px-6 rounded-2xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              {formik.isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </div>
              ) : (
                "Sign up"
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            className="flex items-center gap-4 my-7"
            variants={itemVariants}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-violet-200 to-transparent"></div>
            <span className="text-gray-400 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gradient-to-l from-violet-200 to-transparent"></div>
          </motion.div>

          {/* Social Sign Up Buttons */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            variants={containerVariants}
          >
            {/* Apple Button */}
            <motion.button
              type="button"
              className="border-2 border-violet-200 text-gray-700 font-semibold py-3 px-4 rounded-2xl hover:bg-violet-50 hover:border-violet-400 transition-all duration-300 flex items-center justify-center gap-2 group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              <svg
                className="w-5 h-5 group-hover:text-violet-600 transition-colors"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.905-.08 1.81-.78 3.02-.67 1.44.12 2.51.72 3.15 1.81-3.0 1.8-2.48 5.51.48 6.5-.59 1.38-1.38 2.24-2.63 2.93zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="text-sm">Apple</span>
            </motion.button>

            {/* Google Button */}
            <motion.button
              type="button"
              className="border-2 border-violet-200 text-gray-700 font-semibold py-3 px-4 rounded-2xl hover:bg-violet-50 hover:border-violet-400 transition-all duration-300 flex items-center justify-center gap-2 group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              <svg
                className="w-5 h-5 group-hover:text-violet-600 transition-colors"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm">Google</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Sign In Link */}
        <motion.div className="text-center mt-8" variants={itemVariants}>
          <span className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-violet-600 hover:text-violet-700 font-bold transition-colors"
            >
              Sign in
            </Link>
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
