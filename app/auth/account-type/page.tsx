"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EntityTypeStep from "@/components/kyc/EntityTypeStep";

function AccountTypeCard() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/auth/register";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="rounded-4xl border border-white/10 bg-white/20 backdrop-blur-xl shadow-2xl p-6 sm:p-8 transition-all duration-300">
          <EntityTypeStep
            nextHref={next}
            title="Let's get started"
            description="Tell us whether you're creating this account as an individual or on behalf of an organisation. This determines your sign-up and verification steps."
          />
        </div>
      </div>
    </div>
  );
}

export default function AccountTypePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <AccountTypeCard />
    </Suspense>
  );
}
