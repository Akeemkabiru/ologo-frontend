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
      // Simulate verification process
      setTimeout(() => {
        setVerificationComplete(true);
        setIsVerifying(false);
      }, 3000);
    };

    const timer = setTimeout(startVerification, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {isVerifying ? (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative w-24 h-24">
                <svg
                  className="w-24 h-24 text-emerald-500 animate-spin"
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
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Verifying your information
            </h2>
            <p className="text-gray-600 font-500">
              Please wait while we verify your identity...
            </p>
          </div>
        ) : verificationComplete ? (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-emerald-600"
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

            {/* Verification Summary */}
            <div className=" rounded-lg p-6 mb-10 text-left space-y-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-500">Document</span>
                <span className="font-600 text-gray-900 flex items-center gap-2">
                  Passport{" "}
                  <CheckCircle2 size={18} className="text-emerald-600" />
                </span>
              </div>
              <div className="border-t border-gray-300"></div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-500">Personal Info</span>
                <span className="font-600 text-gray-900 flex items-center gap-2">
                  Verified{" "}
                  <CheckCircle2 size={18} className="text-emerald-600" />
                </span>
              </div>
              <div className="border-t border-gray-300"></div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-500">
                  Facial Recognition
                </span>
                <span className="font-600 text-gray-900 flex items-center gap-2">
                  Passed <CheckCircle2 size={18} className="text-emerald-600" />
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Continue Button */}
      {verificationComplete && (
        <div className="pb-8">
          <Link href="/kyc/success">
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-600 py-4 px-6 rounded-lg transition-colors text-lg shadow-sm hover:shadow-md">
              Continue to Dashboard
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
