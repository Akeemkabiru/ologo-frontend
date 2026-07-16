"use client";

import AddressForm from "@/components/kyc/AddressForm";
import { VERIFIED_TICK_STORAGE_KEYS } from "@/lib/constants";

export default function VerifiedTickAddress() {
  return (
    <AddressForm
      storageKey={VERIFIED_TICK_STORAGE_KEYS.address}
      nextHref="/verified-tick/success"
      backHref="/verified-tick/identity"
      submitLabel="Submit for Review"
    />
  );
}
