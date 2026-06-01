"use client";

import Link from "next/link";

export default function KYCSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] px-6">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-6 mb-8">
        <svg
          className="w-10 h-10 text-violet-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
        Verification Complete!
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg text-center mb-10 max-w-md leading-relaxed">
        Your KYC verification has been completed successfully. You can now
        access all features of your account.
      </p>

      {/* Features List */}
      <div className="bg-violet-50 border border-violet-200 rounded-lg p-6 w-full max-w-md mb-10 space-y-4">
        <div className="flex gap-3 items-start">
          <svg
            className="w-5 h-5 text-violet-600 shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-semibold text-gray-900">Account Verified</p>
            <p className="text-sm text-gray-600">
              Full access to banking services
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <svg
            className="w-6 h-6 text-violet-600 shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-600 text-gray-900">Secure & Safe</p>
            <p className="text-sm text-gray-600 font-500">
              Your data is encrypted and protected
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <svg
            className="w-6 h-6 text-violet-600 shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-600 text-gray-900">Ready to Use</p>
            <p className="text-sm text-gray-600 font-500">
              Start using all features now
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-md space-y-3">
        <Link
          href="/dashboard"
          className="block text-center w-full py-3 rounded-lg font-semibold transition-all duration-200 bg-violet-600 hover:bg-violet-700 text-white"
        >
          Go to Dashboard
        </Link>
        <Link href="/" className="block">
          <button className="w-full border-2 border-gray-300 text-gray-700 hover:border-gray-400 font-600 py-3 rounded-lg transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
