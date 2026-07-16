"use client";

import AddressForm from "@/components/kyc/AddressForm";
import { KYC_STORAGE_KEYS } from "@/lib/constants";

export default function KYCAddress() {
  return (
    <AddressForm
      storageKey={KYC_STORAGE_KEYS.address}
      nextHref="/kyc/success"
      backHref="/kyc/bvn"
      submitLabel="Submit for Review"
    />
  );
}
