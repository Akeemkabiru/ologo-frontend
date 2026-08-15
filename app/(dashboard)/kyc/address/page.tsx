"use client";

import AddressForm from "@/components/kyc/AddressForm";
import { KYC_STORAGE_KEYS, KYC_VERIFICATION_FEE } from "@/lib/constants";

export default function KYCAddress() {
  return (
    <AddressForm
      storageKey={KYC_STORAGE_KEYS.address}
      nextHref="/kyc/success"
      backHref="/kyc/bvn"
      submitLabel="Submit for Review"
      chargeFee={KYC_VERIFICATION_FEE}
      chargeLabel="KYC verification fee"
    />
  );
}
