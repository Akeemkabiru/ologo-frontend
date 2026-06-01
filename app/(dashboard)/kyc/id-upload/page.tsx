"use client";

import Link from "next/link";
import { useState } from "react";
import { Info } from "lucide-react";

export default function IDUpload() {
  const [uploadedFront, setUploadedFront] = useState(false);
  const [uploadedBack, setUploadedBack] = useState(false);

  const handleFileUpload = (side: "front" | "back") => {
    if (side === "front") {
      setUploadedFront(true);
    } else {
      setUploadedBack(true);
    }
  };

  const isComplete = uploadedFront && uploadedBack;

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload your ID</h1>

      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
        Please provide clear photos of both sides of your document
      </p>

      <div className="flex items-start gap-3 bg-violet-50 border border-violet-200 rounded-lg p-4 mb-10">
        <Info size={20} className="text-violet-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-violet-900">
          Make sure the document is clear, fully visible, and all corners are
          visible.
        </p>
      </div>

      {/* Front Side Upload */}
      <div className="mb-10">
        <label className="block text-lg font-semibold text-gray-900 mb-4">
          Front Side
        </label>
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            uploadedFront
              ? "border-violet-500 bg-violet-50"
              : "border-gray-300 hover:border-gray-400 bg-gray-50"
          }`}
          onClick={() => {
            const input = document.getElementById(
              "front-upload",
            ) as HTMLInputElement;
            input?.click();
          }}
        >
          <input
            id="front-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={() => handleFileUpload("front")}
          />
          {uploadedFront ? (
            <div className="flex flex-col items-center gap-3">
              <svg
                className="w-12 h-12 text-violet-600"
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
              <p className="text-violet-600 font-semibold text-base">
                Front side uploaded
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <svg
                className="w-12 h-12 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-gray-700 font-600 text-base">
                Click to upload front side
              </p>
              <p className="text-gray-500 text-sm font-500">or drag and drop</p>
            </div>
          )}
        </div>
      </div>

      {/* Back Side Upload */}
      <div className="mb-10">
        <label className="block text-lg font-semibold text-gray-900 mb-4">
          Back Side
        </label>
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            uploadedBack
              ? "border-violet-500 bg-violet-50"
              : "border-gray-300 hover:border-gray-400 bg-gray-50"
          }`}
          onClick={() => {
            const input = document.getElementById(
              "back-upload",
            ) as HTMLInputElement;
            input?.click();
          }}
        >
          <input
            id="back-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={() => handleFileUpload("back")}
          />
          {uploadedBack ? (
            <div className="flex flex-col items-center gap-3">
              <svg
                className="w-12 h-12 text-violet-500"
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
              <p className="text-violet-600 font-semibold text-base">
                Back side uploaded
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-gray-700 font-600 text-base">
                Click to upload back side
              </p>
              <p className="text-gray-500 text-sm font-500">or drag and drop</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="flex items-start gap-3 bg-violet-50 border border-violet-200 rounded-lg p-5 mb-10">
        <Info size={20} className="text-violet-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm font-600 text-violet-900">
          Make sure the document is clear, fully visible, and all corners are
          visible
        </p>
      </div>

      {/* Continue Button */}
      {isComplete && (
        <Link
          href="/kyc/selfie"
          className="block text-center w-full py-3 rounded-lg font-semibold transition-all duration-200 bg-violet-600 hover:bg-violet-700 text-white"
        >
          Continue to Next Step
        </Link>
      )}
    </div>
  );
}
