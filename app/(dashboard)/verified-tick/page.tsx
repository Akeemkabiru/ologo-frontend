"use client";

import EntityTypeStep from "@/components/kyc/EntityTypeStep";
import { VERIFIED_TICK_STORAGE_KEYS } from "@/lib/constants";

export default function VerifiedTickEntityType() {
  return (
    <EntityTypeStep
      storageKey={VERIFIED_TICK_STORAGE_KEYS.entityType}
      nextHref="/verified-tick/identity"
      title="Apply for a verified tick"
      description="The verified tick is optional and shows others your account is authentic. Tell us whether you're applying as an individual or an organisation."
    />
  );
}
