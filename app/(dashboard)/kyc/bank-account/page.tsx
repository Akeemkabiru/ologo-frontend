"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import {
  Form,
  FormInput,
  FormSelect,
  FormButton,
} from "@/components/forms/FormComponents";
import { useForm } from "@/hooks";
import { NIGERIAN_BANKS, KYC_STORAGE_KEYS } from "@/lib/constants";

interface BankAccountValues {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

const initialValues: BankAccountValues = {
  bankName: "",
  accountNumber: "",
  accountName: "",
};

export default function KYCBankAccount() {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { values, handleChange, handleSubmit, isSubmitting, setValues } =
    useForm<BankAccountValues>({
      initialValues,
      onSubmit: async (values) => {
        sessionStorage.setItem(
          KYC_STORAGE_KEYS.bankAccount,
          JSON.stringify(values),
        );
        router.push("/kyc/bvn");
      },
      validate: (values) => {
        const errors: Partial<BankAccountValues> = {};
        if (!values.bankName) errors.bankName = "Required";
        if (!values.accountNumber || values.accountNumber.length !== 10)
          errors.accountNumber = "Enter a valid 10-digit account number";
        if (!values.accountName) errors.accountName = "Required";
        return errors;
      },
    });

  const handleVerify = async () => {
    if (!values.bankName || values.accountNumber.length !== 10) return;
    setIsVerifying(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setValues((prev) => ({ ...prev, accountName: "John Doe" }));
    setIsVerified(true);
    setIsVerifying(false);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold text-gray-900 mb-2">Bank Account</h1>
      <p className="text-gray-600 text-sm mb-8 leading-relaxed">
        Add the bank account you&apos;ll use to receive and send funds
      </p>

      <Form onSubmit={handleSubmit} loading={isSubmitting}>
        <FormSelect
          label="Bank Name"
          name="bankName"
          required
          options={NIGERIAN_BANKS.map((bank) => ({
            label: bank,
            value: bank,
          }))}
          value={values.bankName}
          onChange={(e) => {
            handleChange(e);
            setIsVerified(false);
          }}
        />

        <div className="flex items-end gap-2">
          <FormInput
            label="Account Number"
            name="accountNumber"
            required
            placeholder="0123456789"
            maxLength={10}
            value={values.accountNumber}
            onChange={(e) => {
              handleChange(e);
              setIsVerified(false);
            }}
            className="flex-1"
          />
          <FormButton
            type="button"
            variant="secondary"
            size="md"
            loading={isVerifying}
            disabled={!values.bankName || values.accountNumber.length !== 10}
            onClick={handleVerify}
          >
            Verify
          </FormButton>
        </div>

        <FormInput
          label="Account Name"
          name="accountName"
          required
          placeholder="Resolved automatically after verifying"
          value={values.accountName}
          onChange={handleChange}
          readOnly={isVerified}
          icon={
            isVerified ? (
              <CheckCircle2 size={18} className="text-emerald-600" />
            ) : undefined
          }
        />

        <div className="flex gap-4 mt-8 sm:mt-10 md:mt-12">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => router.push("/kyc/identity")}
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
