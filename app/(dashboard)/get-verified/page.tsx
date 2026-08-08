"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  BadgeCheck,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Building2,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import MobileHeader from "@/components/ui/MobileHeader";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import FileUploadField from "@/components/ui/fileUploadField";
import ToggleSwitch from "@/components/ui/toggleSwitch";
import { FormButton } from "@/components/forms/FormComponents";

type EntityType = "individual" | "organisation";
type Status =
  | "intro"
  | "form"
  | "verifying"
  | "pending"
  | "approved"
  | "declined";

interface Check {
  label: string;
  status: "pending" | "running" | "done";
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function GetVerifiedPage() {
  const [type, setType] = useState<EntityType>("individual");
  const [status, setStatus] = useState<Status>("intro");
  const [checks, setChecks] = useState<Check[]>([]);
  const [declineReason, setDeclineReason] = useState("");

  // File uploads
  const [idDoc, setIdDoc] = useState<File | null>(null);
  const [proofDoc, setProofDoc] = useState<File | null>(null);

  const runChecks = async () => {
    const labels =
      type === "individual"
        ? ["Identity verification", "Bank account", "BVN"]
        : ["Business identity", "Bank account"];
    setChecks(labels.map((l) => ({ label: l, status: "pending" })));
    setStatus("verifying");
    for (let i = 0; i < labels.length; i++) {
      setChecks((prev) =>
        prev.map((c, idx) => (idx === i ? { ...c, status: "running" } : c)),
      );
      await sleep(900);
      setChecks((prev) =>
        prev.map((c, idx) => (idx === i ? { ...c, status: "done" } : c)),
      );
    }
    await sleep(500);
    setStatus("pending");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runChecks();
  };

  return (
    <main className="min-h-screen pb-8">
      <MobileHeader
        title="Get Verified"
        subtitle="Verify your identity to unlock all features"
      />

      <div className="px-4 sm:px-6 md:px-8 pt-6 md:pt-0">
        <div className="hidden md:block mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Get Verified
          </h1>
          <p className="text-gray-600 mt-1">
            Verification is separate from signing in — it confirms who you really
            are.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {status === "intro" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mb-4">
                <ShieldCheck size={28} className="text-violet-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Choose what you&apos;re verifying
              </h2>
              <p className="text-sm text-gray-500 mt-1 mb-5">
                This is different from email/password authentication — it
                confirms your real identity so you can raise and receive funds.
              </p>

              <ToggleSwitch
                variant="pill"
                value={type}
                onChange={(v) => setType(v as EntityType)}
                options={[
                  { label: "Individual", value: "individual" },
                  { label: "Organisation", value: "organisation" },
                ]}
              />

              <div className="mt-5 rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-600">
                {type === "individual" ? (
                  <p>
                    We&apos;ll automatically verify your{" "}
                    <b>identity, bank account and BVN</b>, then our team reviews
                    your form and documents.
                  </p>
                ) : (
                  <p>
                    We&apos;ll automatically verify your{" "}
                    <b>business identity and bank account</b>, then our team
                    reviews your form and documents.
                  </p>
                )}
              </div>

              <FormButton
                type="button"
                size="lg"
                onClick={() => setStatus("form")}
                className="w-full mt-6"
              >
                <span className="inline-flex items-center gap-2">
                  {type === "individual" ? (
                    <User size={16} />
                  ) : (
                    <Building2 size={16} />
                  )}
                  Get verified as {type === "individual" ? "an individual" : "an organisation"}
                </span>
              </FormButton>
            </div>
          )}

          {status === "form" && (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 grid gap-5"
            >
              <button
                type="button"
                onClick={() => setStatus("intro")}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 w-fit"
              >
                <ArrowLeft size={15} />
                Back
              </button>

              {declineReason && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">
                  Your previous submission was declined: “{declineReason}”.
                  Please correct and resubmit.
                </div>
              )}

              {type === "individual" ? (
                <>
                  <InputField label="Full legal name" placeholder="As on your ID" required />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Date of birth" type="date" />
                    <SelectField
                      label="ID type"
                      options={[
                        { label: "Passport", value: "passport" },
                        { label: "Driver's License", value: "license" },
                        { label: "National ID", value: "national-id" },
                      ]}
                    />
                  </div>
                  <InputField label="ID number" placeholder="ID document number" />
                  <InputField label="BVN" placeholder="Bank Verification Number" inputMode="numeric" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Bank name" placeholder="e.g., First Bank" />
                    <InputField label="Account number" inputMode="numeric" />
                  </div>
                  <FileUploadField
                    label="Upload government ID"
                    file={idDoc}
                    onFileChange={setIdDoc}
                    accept="image/*,application/pdf"
                    helperText="Passport, driver's license or national ID"
                  />
                  <FileUploadField
                    label="Upload a selfie holding your ID"
                    file={proofDoc}
                    onFileChange={setProofDoc}
                    accept="image/*"
                  />
                </>
              ) : (
                <>
                  <InputField label="Organisation name" placeholder="Registered business name" required />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Registration number" placeholder="RC / CAC number" />
                    <SelectField
                      label="Business type"
                      options={[
                        { label: "Limited Company", value: "ltd" },
                        { label: "NGO / Non-profit", value: "ngo" },
                        { label: "Sole Proprietor", value: "sole" },
                        { label: "Partnership", value: "partnership" },
                      ]}
                    />
                  </div>
                  <InputField label="Contact person" placeholder="Full name of authorised rep" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Bank name" placeholder="Business bank" />
                    <InputField label="Account number" inputMode="numeric" />
                  </div>
                  <FileUploadField
                    label="Certificate of incorporation"
                    file={idDoc}
                    onFileChange={setIdDoc}
                    accept="image/*,application/pdf"
                  />
                  <FileUploadField
                    label="Proof of business address"
                    file={proofDoc}
                    onFileChange={setProofDoc}
                    accept="image/*,application/pdf"
                  />
                </>
              )}

              <FormButton type="submit" size="lg" className="w-full mt-1">
                Submit for verification
              </FormButton>
            </form>
          )}

          {(status === "verifying" || status === "pending") && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                {status === "verifying"
                  ? "Running automatic checks…"
                  : "Submitted for review"}
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Our APIs verify your details automatically, then admins review
                your form and files.
              </p>

              <div className="space-y-2.5">
                {checks.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 p-3"
                  >
                    <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gray-50">
                      {c.status === "done" ? (
                        <CheckCircle2 size={18} className="text-emerald-500" />
                      ) : c.status === "running" ? (
                        <Loader2 size={18} className="text-violet-500 animate-spin" />
                      ) : (
                        <Clock size={16} className="text-gray-300" />
                      )}
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      {c.label}
                    </span>
                    <span className="ml-auto text-xs font-medium text-gray-400">
                      {c.status === "done"
                        ? "Verified"
                        : c.status === "running"
                          ? "Checking…"
                          : "Queued"}
                    </span>
                  </div>
                ))}
              </div>

              {status === "pending" && (
                <div className="mt-5">
                  <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-100 p-3 text-sm text-amber-800">
                    <Clock size={16} className="shrink-0" />
                    Automatic checks passed. An admin is now reviewing your
                    documents — you&apos;ll be notified of the decision.
                  </div>

                  {/* Demo: simulate the admin decision */}
                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-2">
                      Preview admin decision (demo)
                    </p>
                    <div className="flex gap-3">
                      <FormButton
                        type="button"
                        size="md"
                        onClick={() => setStatus("approved")}
                        className="flex-1"
                      >
                        Approve
                      </FormButton>
                      <FormButton
                        type="button"
                        size="md"
                        variant="secondary"
                        onClick={() => {
                          setDeclineReason(
                            "The uploaded ID was blurry and the BVN did not match the name provided.",
                          );
                          setStatus("declined");
                        }}
                        className="flex-1"
                      >
                        Decline
                      </FormButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {status === "approved" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <BadgeCheck size={34} className="text-emerald-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                You&apos;re verified
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Your {type} verification was approved. The verified badge now
                shows on your profile.
              </p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-violet-600">
                <BadgeCheck size={16} />
                Verified account
              </span>
            </div>
          )}

          {status === "declined" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                <XCircle size={34} className="text-rose-500" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Verification declined
              </h2>
              <div className="mt-3 rounded-xl bg-rose-50 border border-rose-200 p-3">
                <p className="text-xs font-semibold text-rose-700 mb-1">
                  Reason from admin
                </p>
                <p className="text-sm text-rose-700">{declineReason}</p>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                You can fix your form and re-upload your files, then submit again.
              </p>
              <FormButton
                type="button"
                size="lg"
                onClick={() => setStatus("form")}
                className="w-full mt-5"
              >
                Edit &amp; resubmit
              </FormButton>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
