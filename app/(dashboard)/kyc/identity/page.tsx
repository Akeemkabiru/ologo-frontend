"use client";

import IdentityForm from "@/components/kyc/IdentityForm";
import { KYC_STORAGE_KEYS } from "@/lib/constants";

// Mock signed-up name - replace with API call to userService.getProfile()
const SIGNED_UP_NAME = "John Doe";

export default function KYCIdentity() {
  return (
    <IdentityForm
      entityStorageKey={KYC_STORAGE_KEYS.entityType}
      storageKey={KYC_STORAGE_KEYS.identity}
      nextHref="/kyc/bank-account"
      backHref="/kyc"
      defaultName={SIGNED_UP_NAME}
    />
  );
}
