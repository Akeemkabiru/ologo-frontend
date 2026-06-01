"use client";

import { usePathname, useRouter } from "next/navigation";

const steps = [
  { id: 1, name: "ID Type", path: "/kyc" },
  { id: 2, name: "Personal Info", path: "/kyc/personal-info" },
  { id: 3, name: "ID Upload", path: "/kyc/id-upload" },
  { id: 4, name: "Selfie", path: "/kyc/selfie" },
  { id: 5, name: "Verification", path: "/kyc/verification" },
];

export default function KYCLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const currentStep =
    steps.findIndex((step) => step.path === pathname) + 1 || 1;
  const progress = (currentStep / steps.length) * 100;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-8 pb-8">
      <div className="max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="text-violet-600 hover:text-violet-700 font-medium mb-8 flex items-center gap-2 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        {/* Progress Section */}
        <div className="mb-12">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-semibold text-gray-700">
                Verification Progress
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
          <div className="grid grid-cols-5 gap-2 mt-6">
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
