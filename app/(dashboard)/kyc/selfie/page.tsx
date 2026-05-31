"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Selfie() {
  const [captureSelfie, setCaptureSelfie] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Content */}
      <div className="flex-1">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Take a selfie</h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-10 leading-relaxed font-500">
          We need to verify that it's really you. Please take a clear photo of
          your face
        </p>

        {/* Camera/Selfie Area */}
        <div className="mb-8">
          {captureSelfie ? (
            <div className="bg-gray-900 rounded-3xl aspect-square flex items-center justify-center overflow-hidden mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="9" r="3" />
                  <path d="M3 11h18M3 13h18" strokeLinecap="round" />
                </svg>
              </div>
              {/* Oval guide */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-48 border-4 border-emerald-400 rounded-3xl opacity-50"></div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setCaptureSelfie(true)}
              className="w-full bg-linear-to-br from-gray-700 to-gray-900 rounded-3xl aspect-square flex items-center justify-center mb-6 hover:from-gray-600 hover:to-gray-800 transition-all"
            >
              <div className="text-center">
                <svg
                  className="w-16 h-16 text-white mb-3 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
                  <circle cx="12" cy="12" r="6" fill="white" />
                </svg>
                <p className="text-white font-semibold">Tap to take photo</p>
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
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-600 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={18} /> Accept
              </button>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="space-y-3 bg-blue-50 border border-blue-200 rounded-lg p-5">
          <p className="text-sm font-600 text-blue-900">
            Tips for best results:
          </p>
          <ul className="text-sm text-blue-800 space-y-2.5 font-500">
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
      </div>

      {/* Continue Button */}
      <div className="pb-8 mt-8">
        <Link href={captureSelfie ? "/kyc/verification" : "#"}>
          <button
            disabled={!captureSelfie}
            className={`w-full font-600 py-4 px-6 rounded-lg transition-colors text-lg ${
              captureSelfie
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}
