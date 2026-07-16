"use client";

import IdentityForm from "@/components/kyc/IdentityForm";
import { VERIFIED_TICK_STORAGE_KEYS } from "@/lib/constants";

// Mock signed-up name - replace with API call to userService.getProfile()
const SIGNED_UP_NAME = "John Doe";

export default function VerifiedTickIdentity() {
  return (
    <IdentityForm
      entityStorageKey={VERIFIED_TICK_STORAGE_KEYS.entityType}
      storageKey={VERIFIED_TICK_STORAGE_KEYS.identity}
      nextHref="/verified-tick/address"
      backHref="/verified-tick"
      defaultName={SIGNED_UP_NAME}
    />
  );
}
