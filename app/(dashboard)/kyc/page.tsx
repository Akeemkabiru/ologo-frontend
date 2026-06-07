"use client";

import { useState } from "react";
import { CreditCard, BookOpen, Car, Upload } from "lucide-react";
import { FormButton } from "@/components/forms/FormComponents";
import { useRouter } from "next/navigation";

export default function IDTypeSelection() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [uploadedFront, setUploadedFront] = useState<File | null>(null);
  const [uploadedBack, setUploadedBack] = useState<File | null>(null);

  const router = useRouter();

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

  const isComplete = uploadedFront && uploadedBack;

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold text-gray-900 mb-2">
        What type of ID will you use?
      </h1>

      <p className="text-gray-600 text-sm mb-8 leading-relaxed">
        Select your government-issued identification document for verification
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {idTypes.map((type) => {
          const IconComponent = type.icon;

          return (
            <button
              key={type.id}
              onClick={() => {
                setSelectedType(type.id);
                setUploadedFront(null);
                setUploadedBack(null);
              }}
              className={`p-4 rounded-2xl transition-all duration-200 text-left flex flex-col items-start ${
                selectedType === type.id
                  ? "border-violet-600 border-2 bg-violet-50 shadow-lg"
                  : "bg-white/40 border-2 border-white/50"
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
                  <IconComponent size={18} strokeWidth={1.5} />
                </div>

                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
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

      {selectedType && (
        <div className="mb-12">
          <h3 className="text-base font-semibold text-gray-900 mb-6">
            Upload your {idTypes.find((t) => t.id === selectedType)?.label}
          </h3>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Front Side
            </label>

            <label
              className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                uploadedFront
                  ? "border-violet-500 bg-violet-50"
                  : "border-violet-300 hover:bg-violet-50"
              }`}
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setUploadedFront(file);
                }}
              />

              {uploadedFront ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-3 text-violet-600 font-bold">
                    ✓
                  </div>
                  <p className="font-medium text-violet-600">
                    Front side uploaded
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {uploadedFront.name}
                  </p>
                </>
              ) : (
                <>
                  <Upload
                    className="w-8 h-8 mb-3 text-violet-600"
                    strokeWidth={1.5}
                  />
                  <p className="font-medium text-gray-900">Upload Front Side</p>
                  <p className="text-xs text-gray-500">Click or drag & drop</p>
                </>
              )}
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Back Side
            </label>

            <label
              className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                uploadedBack
                  ? "border-violet-500 bg-violet-50"
                  : "border-violet-300 hover:bg-violet-50"
              }`}
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setUploadedBack(file);
                }}
              />

              {uploadedBack ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mb-3 text-violet-600 font-bold">
                    ✓
                  </div>
                  <p className="font-medium text-violet-600">
                    Back side uploaded
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {uploadedBack.name}
                  </p>
                </>
              ) : (
                <>
                  <Upload
                    className="w-8 h-8 mb-3 text-violet-600"
                    strokeWidth={1.5}
                  />
                  <p className="font-medium text-gray-900">Upload Back Side</p>
                  <p className="text-xs text-gray-500">Click or drag & drop</p>
                </>
              )}
            </label>
          </div>
        </div>
      )}

      <FormButton
        onClick={() => {
          if (isComplete) {
            router.push("/kyc/personal-info");
          }
        }}
        className={`block text-center w-full py-3 rounded-2xl font-semibold text-base transition-all duration-200 ${
          isComplete
            ? "bg-violet-600 hover:bg-violet-700 text-white"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        Continue to Next Step
      </FormButton>
    </div>
  );
}
