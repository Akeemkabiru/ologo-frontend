"use client";

import { usePathname, useRouter } from "next/navigation";

const steps = [
  { id: 1, name: "Identity", path: "/kyc/identity" },
  { id: 2, name: "Bank", path: "/kyc/bank-account" },
  { id: 3, name: "BVN", path: "/kyc/bvn" },
  { id: 4, name: "Address", path: "/kyc/address" },
];

export default function KYCLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const currentStep =
    steps.findIndex((step) => step.path === pathname) + 1 || 1;
  const progress = (currentStep / steps.length) * 100;

  return (
    <main className="flex items-center w-full justify-center px-4 py-4 sm:py-6 md:py-8">
      <div className="rounded-2xl border-white/10 w-full max-w-2xl bg-white/20 backdrop-blur-xl shadow-2xl p-5 sm:p-6 md:p-8">
        {/* Progress Section */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-semibold text-gray-700">
                Verification Progress
              </h2>
              <span className="text-sm text-gray-500">
                {currentStep} of {steps.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-violet-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-6">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => router.push(step.path)}
                className="text-center cursor-pointer group"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mx-auto mb-2 transition-all duration-300 ease-out group-hover:scale-105 ${
                    step.id < currentStep
                      ? "bg-violet-600 text-white"
                      : step.id === currentStep
                        ? "bg-violet-100 text-violet-600 border-2 border-violet-600"
                        : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600"
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
                  className={`text-xs font-medium transition-colors duration-300 ${
                    step.id <= currentStep
                      ? "text-gray-900"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                >
                  {step.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div>{children}</div>
      </div>
    </main>
  );
}
