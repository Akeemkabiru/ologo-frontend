"use client";

import Link from "next/link";
import { Clock, BadgeCheck } from "lucide-react";

export default function VerifiedTickSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] px-6">
      <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mb-8">
        <BadgeCheck className="w-10 h-10 text-violet-600" />
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
        Application Submitted
      </h1>

      <p className="text-gray-600 text-sm sm:text-base text-center mb-6 sm:mb-8 md:mb-10 max-w-md leading-relaxed">
        We&apos;re verifying your details automatically and our team will
        review your application for the verified tick shortly.
      </p>

      <div className="flex items-start gap-3 bg-violet-50 border border-violet-200 rounded-lg p-4 w-full max-w-md mb-6 sm:mb-8 md:mb-10">
        <Clock size={18} className="text-violet-600 shrink-0 mt-0.5" />
        <p className="text-sm text-violet-800 leading-relaxed">
          You&apos;ll be notified once an admin approves or declines your
          verified tick application.
        </p>
      </div>

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
