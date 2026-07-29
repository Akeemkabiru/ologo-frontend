"use client";

import AccountTypeGate from "@/components/kyc/AccountTypeGate";

export default function VerifiedTickEntry() {
  return <AccountTypeGate destination="/verified-tick/identity" />;
}
