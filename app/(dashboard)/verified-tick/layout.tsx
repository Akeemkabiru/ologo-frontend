"use client";

import { usePathname } from "next/navigation";
import { BadgeCheck } from "lucide-react";

const steps = [
  { id: 1, name: "Type", path: "/verified-tick" },
  { id: 2, name: "Identity", path: "/verified-tick/identity" },
  { id: 3, name: "Address", path: "/verified-tick/address" },
];

export default function VerifiedTickLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const currentStep =
    steps.findIndex((step) => step.path === pathname) + 1 || 1;
  const progress = (currentStep / steps.length) * 100;

  return (
    <main className="flex items-center w-full justify-center px-4 py-4 sm:py-6 md:py-8">
      <div className="rounded-2xl border-white/10 w-full max-w-2xl bg-white/20 backdrop-blur-xl shadow-2xl p-5 sm:p-6 md:p-8">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-6">
          <BadgeCheck size={20} className="text-violet-600" />
          <span className="text-sm font-semibold text-violet-700">
            Verified Tick (Optional)
          </span>
        </div>

        {/* Progress Section */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-semibold text-gray-700">
                Application Progress
              </h2>
              <span className="text-sm text-gray-600">
                {currentStep} of {steps.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-violet-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mx-auto mb-2 transition-all ${
                    step.id < currentStep
                      ? "bg-violet-600 text-white"
                      : step.id === currentStep
                        ? "bg-violet-100 text-violet-600 border-2 border-violet-600"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step.id < currentStep ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <p
                  className={`text-xs font-medium ${
                    step.id <= currentStep ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div>{children}</div>
      </div>
    </main>
  );
}
