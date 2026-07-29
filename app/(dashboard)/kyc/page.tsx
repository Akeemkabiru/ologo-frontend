"use client";

import AccountTypeGate from "@/components/kyc/AccountTypeGate";

export default function KYCEntry() {
  return <AccountTypeGate destination="/kyc/identity" />;
}
