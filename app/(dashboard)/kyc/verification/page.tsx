"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Verification() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);

  useEffect(() => {
    const startVerification = () => {
      setIsVerifying(true);
      setTimeout(() => {
        setVerificationComplete(true);
        setIsVerifying(false);
      }, 3000);
    };

    const timer = setTimeout(startVerification, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px]">
      {isVerifying ? (
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative w-24 h-24">
              <svg
                className="w-24 h-24 text-violet-600 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verifying your information
          </h2>
          <p className="text-gray-600">
            Please wait while we process your documents
          </p>
        </div>
      ) : verificationComplete ? (
        <div className="text-center w-full">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Verification Successful
          </h2>
          <p className="text-gray-600 mb-10 font-500 text-lg">
            Your identity has been verified successfully
          </p>

          <div className="rounded-lg p-6 mb-10 text-left space-y-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-500">Document</span>
              <span className="font-600 text-gray-900 flex items-center gap-2">
                Passport <CheckCircle2 size={18} className="text-violet-600" />
              </span>
            </div>
            <div className="border-t border-gray-300"></div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-500">Personal Info</span>
              <span className="font-600 text-gray-900 flex items-center gap-2">
                Verified <CheckCircle2 size={18} className="text-violet-600" />
              </span>
            </div>
            <div className="border-t border-gray-300"></div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-500">Facial Recognition</span>
              <span className="font-600 text-gray-900 flex items-center gap-2">
                Passed <CheckCircle2 size={18} className="text-violet-600" />
              </span>
            </div>
          </div>

          <Link
            href="/kyc/success"
            className="block text-center w-full py-3 rounded-lg font-semibold transition-all duration-200 bg-violet-600 hover:bg-violet-700 text-white"
          >
            Continue to Success Page
          </Link>
        </div>
      ) : null}
    </div>
  );
}
