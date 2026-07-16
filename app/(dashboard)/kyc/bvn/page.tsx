"use client";

import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Form, FormInput, FormButton } from "@/components/forms/FormComponents";
import { useForm } from "@/hooks";
import { KYC_STORAGE_KEYS } from "@/lib/constants";

interface BvnValues {
  bvn: string;
}

const initialValues: BvnValues = { bvn: "" };

export default function KYCBvn() {
  const router = useRouter();

  const { values, handleChange, handleSubmit, isSubmitting } =
    useForm<BvnValues>({
      initialValues,
      onSubmit: async (values) => {
        sessionStorage.setItem(KYC_STORAGE_KEYS.bvn, JSON.stringify(values));
        router.push("/kyc/address");
      },
      validate: (values) => {
        const errors: Partial<BvnValues> = {};
        if (!/^\d{11}$/.test(values.bvn)) {
          errors.bvn = "BVN must be exactly 11 digits";
        }
        return errors;
      },
    });

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold text-gray-900 mb-2">
        Bank Verification Number
      </h1>
      <p className="text-gray-600 text-sm mb-8 leading-relaxed">
        Your BVN is used to automatically verify your identity with your bank
      </p>

      <div className="flex items-start gap-3 bg-violet-50 border border-violet-200 rounded-lg p-4 mb-8">
        <ShieldCheck size={18} className="text-violet-600 shrink-0 mt-0.5" />
        <p className="text-xs text-violet-800 leading-relaxed">
          Your BVN is encrypted and only used for identity verification. We
          never store or share your BVN details.
        </p>
      </div>

      <Form onSubmit={handleSubmit} loading={isSubmitting}>
        <FormInput
          label="BVN"
          name="bvn"
          required
          type="text"
          inputMode="numeric"
          maxLength={11}
          placeholder="12345678901"
          value={values.bvn}
          onChange={handleChange}
          helperText="11-digit number sent to you via *565*0# or your bank's app"
        />

        <div className="flex gap-4 mt-8 sm:mt-10 md:mt-12">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => router.push("/kyc/bank-account")}
            className="flex-1"
          >
            Back
          </FormButton>
          <FormButton
            type="submit"
            size="lg"
            loading={isSubmitting}
            className="flex-1"
          >
            Continue
          </FormButton>
        </div>
      </Form>
    </div>
  );
}
