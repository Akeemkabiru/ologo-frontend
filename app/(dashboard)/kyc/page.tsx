"use client";

import Link from "next/link";
import { useState } from "react";

export default function IDTypeSelection() {
  const [selectedType, setSelectedType] = useState("passport");

  const idTypes = [
    {
      id: "id-card",
      label: "ID Card",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="8" cy="11" r="2" fill="currentColor" />
          <path d="M11 11h6" strokeLinecap="round" />
          <path d="M8 15h8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "passport",
      label: "Passport",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <circle cx="12" cy="9" r="3" fill="white" />
          <path d="M6 17h12c0-2-2-4-6-4s-6 2-6 4" fill="white" />
        </svg>
      ),
    },
    {
      id: "driver-id",
      label: "Driver ID",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <circle cx="8" cy="11" r="2" fill="currentColor" />
          <path d="M11 10h8" strokeLinecap="round" />
          <path d="M11 13h6" strokeLinecap="round" />
          <path d="M11 16h4" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Content */}
      <div className="flex-1">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          What type of ID will you use?
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-12 leading-relaxed font-500">
          We need to verify your identity with an official document
        </p>

        {/* ID Type Options */}
        <div className="space-y-5 mb-12">
          {idTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3 ${
                selectedType === type.id
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`${
                  selectedType === type.id
                    ? "text-emerald-600"
                    : "text-gray-400"
                }`}
              >
                {type.icon}
              </div>
              <span
                className={`font-semibold text-base ${
                  selectedType === type.id
                    ? "text-emerald-600"
                    : "text-gray-700"
                }`}
              >
                {type.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="pb-8 mt-8">
        <Link href="/kyc/personal-info">
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-600 py-4 px-6 rounded-lg transition-colors text-lg shadow-sm hover:shadow-md">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}
