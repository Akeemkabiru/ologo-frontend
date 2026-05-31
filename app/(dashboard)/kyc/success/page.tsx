"use client";

import Link from "next/link";

export default function KYCSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Success Icon */}
      <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
        <svg
          className="w-16 h-16 text-emerald-600"
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
      <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
        Welcome!
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg text-center mb-12 max-w-md leading-relaxed font-500">
        Your KYC verification has been completed successfully. You can now
        access all features of your account.
      </p>

      {/* Features List */}
      <div className="bg-violet-50 border border-violet-200 rounded-lg p-6 w-full max-w-md mb-12 space-y-5">
        <div className="flex gap-3 items-start">
          <svg
            className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-600 text-gray-900">Account Verified</p>
            <p className="text-sm text-gray-600 font-500">
              Full access to banking services
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <svg
            className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5"
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
            className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5"
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
        <Link href="/dashboard" className="block">
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-600 py-4 px-6 rounded-lg transition-colors text-lg shadow-sm hover:shadow-md">
            Go to Dashboard
          </button>
        </Link>
        <Link href="/" className="block">
          <button className="w-full border-2 border-gray-300 text-gray-700 hover:border-gray-400 font-600 py-4 px-6 rounded-lg transition-colors text-lg hover:">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
