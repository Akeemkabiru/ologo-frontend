"use client";

import Link from "next/link";
import { useState } from "react";
import { CreditCard, BookOpen, Car } from "lucide-react";

export default function IDTypeSelection() {
  const [selectedType, setSelectedType] = useState("passport");

  const idTypes = [
    {
      id: "id-card",
      label: "ID Card",
      description: "Government-issued identification card",
      icon: CreditCard,
    },
    {
      id: "passport",
      label: "Passport",
      description: "International passport document",
      icon: BookOpen,
    },
    {
      id: "driver-id",
      label: "Driver License",
      description: "Driving license or permit",
      icon: Car,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Title */}
      <h1 className="text-xl font-bold text-gray-900 mb-2">
        What type of ID will you use?
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-sm mb-8 leading-relaxed">
        Select your government-issued identification document for verification
      </p>

      {/* ID Type Options */}
      <div className="space-y-4 mb-12 grid grid-cols-3 grid-rows-1 gap-x-6">
        {idTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedType === type.id
                  ? "border-violet-600 bg-violet-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 mt-1 ${
                    selectedType === type.id
                      ? "text-violet-600"
                      : "text-gray-400"
                  }`}
                >
                  <IconComponent size={24} strokeWidth={1.5} />
                </div>
                <div className="">
                  <h3
                    className={`font-semibold text-lg mb-1 ${
                      selectedType === type.id
                        ? "text-violet-600"
                        : "text-gray-700"
                    }`}
                  >
                    {type.label}
                  </h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedType === type.id
                      ? "border-violet-600 bg-violet-600"
                      : "border-gray-300"
                  }`}
                >
                  {selectedType === type.id && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Continue Button */}
      <Link
        href="/kyc/personal-info"
        className="block text-center w-full py-3 rounded-lg font-semibold transition-all duration-200 bg-violet-600 hover:bg-violet-700 text-white"
      >
        Continue to Next Step
      </Link>
    </div>
  );
}
