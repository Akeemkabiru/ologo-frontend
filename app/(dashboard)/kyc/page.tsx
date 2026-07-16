"use client";

import EntityTypeStep from "@/components/kyc/EntityTypeStep";
import { KYC_STORAGE_KEYS } from "@/lib/constants";

export default function KYCEntityType() {
  return (
    <EntityTypeStep
      storageKey={KYC_STORAGE_KEYS.entityType}
      nextHref="/kyc/identity"
      title="Let's verify your account"
      description="KYC is required to unlock full access. Tell us whether you're verifying as an individual or an organisation."
    />
  );
}
