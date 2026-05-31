"use client";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
export default function Settings() {
  const [kycStatus, setKycStatus] = useState("pending"); // pending, completed, expired
  return (
    <main className="min-h-screen bg-gray-50 px-8 pb-8">
      <div className="max-w-3xl">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600 mb-8">
          Manage your account and security settings
        </p>
        {/* Settings Grid */}
        <div className="space-y-6">
          {/* KYC Verification Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Identity Verification (KYC)
                </h2>
                <p className="text-gray-600">
                  Verify your identity to unlock all features and increase
                  transaction limits
                </p>
              </div>
              <div
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  kycStatus === "completed"
                    ? "bg-violet-100 text-violet-700"
                    : kycStatus === "expired"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {kycStatus === "completed" ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={16} /> Verified
                  </span>
                ) : kycStatus === "pending" ? (
                  <span className="flex items-center gap-1">
                    <Clock size={16} /> Pending
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <AlertCircle size={16} /> Expired
                  </span>
                )}
              </div>
            </div>
            {/* Verification Steps */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                    kycStatus === "completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {kycStatus === "completed" ? <CheckCircle2 size={18} /> : "1"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Choose ID Type</p>
                  <p className="text-sm text-gray-600">
                    Select the type of identification you&apos;ll use
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                    kycStatus === "completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {kycStatus === "completed" ? <CheckCircle2 size={18} /> : "2"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Personal Information
                  </p>
                  <p className="text-sm text-gray-600">
                    Provide your personal details
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                    kycStatus === "completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {kycStatus === "completed" ? <CheckCircle2 size={18} /> : "3"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Upload Documents
                  </p>
                  <p className="text-sm text-gray-600">
                    Submit clear photos of your ID
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                    kycStatus === "completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {kycStatus === "completed" ? <CheckCircle2 size={18} /> : "4"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Facial Verification
                  </p>
                  <p className="text-sm text-gray-600">
                    Take a selfie to verify your identity
                  </p>
                </div>
              </div>
            </div>
            {/* Action Button */}
            {kycStatus !== "completed" && (
              <Link href="/kyc">
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors">
                  {kycStatus === "pending"
                    ? "Continue Verification"
                    : "Start Verification"}
                </button>
              </Link>
            )}
            {kycStatus === "completed" && (
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                <p className="text-violet-700 text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 size={18} /> Your identity has been verified.
                  You have access to all features.
                </p>
              </div>
            )}
          </div>
          {/* Account Security */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Account Security
            </h2>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span className="font-semibold text-gray-900">
                  Change Password
                </span>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span className="font-semibold text-gray-900">
                  Two-Factor Authentication
                </span>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Notifications
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded"
                />
                <span className="text-gray-700">Email notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded"
                />
                <span className="text-gray-700">SMS notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded" />
                <span className="text-gray-700">Marketing emails</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
