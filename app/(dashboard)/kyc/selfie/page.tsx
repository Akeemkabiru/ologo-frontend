"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Selfie() {
  const [captureSelfie, setCaptureSelfie] = useState(false);

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Take a selfie</h1>

      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
        We need to verify that it's really you. Please take a clear photo of
        your face
      </p>

      {/* Camera/Selfie Area */}
      <div className="mb-12">
        {captureSelfie ? (
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl aspect-square flex items-center justify-center overflow-hidden mb-6 relative shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="9" r="3" />
                <path d="M3 11h18M3 13h18" strokeLinecap="round" />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-48 border-4 border-violet-400 rounded-3xl opacity-40"></div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setCaptureSelfie(true)}
            className="w-full bg-gradient-to-b from-gray-200 to-gray-300 rounded-xl aspect-square flex items-center justify-center mb-6 hover:from-gray-300 hover:to-gray-400 transition-all shadow-sm"
          >
            <div className="text-center">
              <svg
                className="w-16 h-16 text-gray-600 mb-3 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
                <circle cx="12" cy="12" r="6" fill="white" />
              </svg>
              <p className="text-gray-700 font-semibold">Tap to take photo</p>
            </div>
          </button>
        )}

        {captureSelfie && (
          <div className="flex gap-4">
            <button
              onClick={() => setCaptureSelfie(false)}
              className="flex-1 border-2 border-gray-300 text-gray-700 font-600 py-3 rounded-lg hover:border-gray-400 transition-colors"
            >
              Retake
            </button>
            <button
              onClick={() => setCaptureSelfie(true)}
              className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-600 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} /> Accept
            </button>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="space-y-3 bg-violet-50 border border-violet-200 rounded-lg p-5">
        <p className="text-sm font-600 text-violet-900">
          Tips for best results:
        </p>
        <ul className="text-sm text-violet-800 space-y-2.5 font-500">
          <li className="flex items-center gap-2">
            <CheckCircle2 size={16} /> Make sure your face is clearly visible
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 size={16} /> Look straight at the camera
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 size={16} /> Good lighting is important
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 size={16} /> Remove any glasses or hats
          </li>
        </ul>
      </div>

      {/* Continue Button */}
      {captureSelfie && (
        <Link
          href="/kyc/verification"
          className="block text-center w-full py-3 rounded-lg font-semibold transition-all duration-200 bg-violet-600 hover:bg-violet-700 text-white mt-8"
        >
          Continue to Verification
        </Link>
      )}
    </div>
  );
}
