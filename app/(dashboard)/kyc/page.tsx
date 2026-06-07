"use client";

import Link from "next/link";
import { useState } from "react";
import { CreditCard, BookOpen, Car, Upload } from "lucide-react";

export default function IDTypeSelection() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
        What type of ID will you use?
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-sm mb-8 leading-relaxed">
        Select your government-issued identification document for verification
      </p>

      {/* ID Type Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {idTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => {
                setSelectedType(type.id);
                setUploadedFile(null);
              }}
              className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left flex flex-col items-start ${
                selectedType === type.id
                  ? "border-violet-600 bg-violet-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div
                  className={`flex-shrink-0 ${
                    selectedType === type.id
                      ? "text-violet-600"
                      : "text-gray-400"
                  }`}
                >
                  <IconComponent size={28} strokeWidth={1.5} />
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedType === type.id
                      ? "border-violet-600 bg-violet-600"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selectedType === type.id && (
                    <svg
                      className="w-4 h-4 text-white"
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
              <h3
                className={`font-semibold text-base mb-1 ${
                  selectedType === type.id ? "text-violet-600" : "text-gray-700"
                }`}
              >
                {type.label}
              </h3>
              <p className="text-xs text-gray-600 leading-snug">
                {type.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* File Upload Section - Shows when ID type is selected */}
      {selectedType && (
        <div className="mb-12 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upload your {idTypes.find((t) => t.id === selectedType)?.label}
          </h3>

          {/* File Upload Box */}
          <label className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-violet-300 rounded-xl cursor-pointer hover:bg-violet-50 transition-colors duration-200">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload
                className="w-12 h-12 mb-3 text-violet-600"
                strokeWidth={1.5}
              />
              <p className="mb-2 text-sm font-semibold text-gray-900">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setUploadedFile(file);
                }
              }}
            />
          </label>

          {/* Uploaded File Display */}
          {uploadedFile && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-violet-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      )}

      {/* Continue Button - Only enabled when file is uploaded */}
      <Link
        href={uploadedFile ? "/kyc/personal-info" : "#"}
        className={`block text-center w-full py-3 rounded-2xl font-semibold text-base transition-all duration-200 ${
          uploadedFile
            ? "bg-violet-600 hover:bg-violet-700 text-white cursor-pointer"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
        onClick={(e) => !uploadedFile && e.preventDefault()}
      >
        Continue to Next Step
      </Link>
    </div>
  );
}
