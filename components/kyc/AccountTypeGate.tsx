"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ACCOUNT_TYPE_KEY } from "@/lib/constants";

interface AccountTypeGateProps {
  /** Where to go once we know the account type (individual/organisation). */
  destination: string;
}

/**
 * Entry point for the KYC and Verified Tick flows. The account type
 * (individual vs organisation) is chosen once, right after sign up, and
 * persisted in localStorage - so returning users skip straight to the
 * flow's first real step instead of being asked again.
 */
export default function AccountTypeGate({ destination }: AccountTypeGateProps) {
  const router = useRouter();

  useEffect(() => {
    const accountType = localStorage.getItem(ACCOUNT_TYPE_KEY);
    if (accountType) {
      router.replace(destination);
    } else {
      router.replace(
        `/auth/account-type?next=${encodeURIComponent(destination)}`,
      );
    }
  }, [router, destination]);

  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
