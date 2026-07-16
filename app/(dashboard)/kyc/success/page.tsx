"use client";

import Link from "next/link";
import { Clock } from "lucide-react";

export default function KYCSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] px-6">
      {/* Pending Icon */}
      <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-8">
        <Clock className="w-10 h-10 text-violet-600" />
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
        Application Submitted
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-sm sm:text-base text-center mb-6 sm:mb-8 md:mb-10 max-w-md leading-relaxed">
        We&apos;re verifying your details automatically and our team will
        review your submission. This usually takes 1-2 business days.
      </p>

      {/* Status List */}
      <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 sm:p-5 md:p-6 w-full max-w-md mb-6 sm:mb-8 md:mb-10 space-y-4">
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
            <p className="font-semibold text-gray-900">Details Received</p>
            <p className="text-sm text-gray-600">
              Your identity, bank, BVN and address details were submitted
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <Clock size={20} className="text-violet-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">
              Automatic Verification In Progress
            </p>
            <p className="text-sm text-gray-600">
              We&apos;re checking your details against official records
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <Clock size={20} className="text-gray-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">Admin Review</p>
            <p className="text-sm text-gray-600">
              A team member will approve or decline your application
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
        <Link href="/dashboard/settings" className="block">
          <button className="w-full border-2 border-gray-300 text-gray-700 hover:border-gray-400 font-semibold py-3 rounded-lg transition-colors">
            View Verification Status
          </button>
        </Link>
      </div>
    </div>
  );
}
