"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function KYCLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-200 w-full">
        <div className="h-full bg-emerald-500" style={{ width: "0%" }}></div>
      </div>

      {/* Header with Back Button */}
      <div className="px-6 py-4 border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="text-gray-700 text-2xl font-light hover:text-gray-900 transition-colors"
        >
          ←
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">{children}</div>
    </div>
  );
}
