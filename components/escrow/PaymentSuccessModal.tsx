"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Bell, Mail, MessageCircle, ArrowRight } from "lucide-react";
import Modal from "@/components/ui/modal";
import { FormButton } from "@/components/forms/FormComponents";
import { money, type RequestForm } from "@/data/escrowDetail";

export interface PaymentSummary {
  recipients: { name: string; amount: number }[];
  total: number;
  description: string;
  recurring: boolean;
}

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: PaymentSummary | null;
  totalDeposited: number;
  remaining: number;
  requestForms: RequestForm[];
  groupPath: string;
}

const channels = [
  { icon: Bell, label: "In-app" },
  { icon: Mail, label: "Email" },
  { icon: MessageCircle, label: "WhatsApp" },
];

export default function PaymentSuccessModal({
  isOpen,
  onClose,
  summary,
  totalDeposited,
  remaining,
  requestForms,
  groupPath,
}: PaymentSuccessModalProps) {
  if (!summary) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidthClassName="max-w-md">
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={30} className="text-emerald-600" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">Payment Successful</h2>
        <p className="text-sm text-gray-500 mt-1">
          {summary.recurring
            ? "The recurring payment schedule has been set up."
            : `${money(summary.total)} released from escrow.`}
        </p>
      </div>

      {/* Notification channels */}
      <div className="mt-5 rounded-xl bg-violet-50 border border-violet-100 p-3">
        <p className="text-xs text-gray-600 mb-2.5">
          Every group member was automatically notified:
        </p>
        <div className="flex items-center justify-center gap-2">
          {channels.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 border border-violet-100"
            >
              <c.icon size={13} className="text-violet-600" />
              {c.label}
              <CheckCircle2 size={12} className="text-emerald-500" />
            </span>
          ))}
        </div>
      </div>

      {/* Decider form summary */}
      <div className="mt-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Decider Form
        </p>
        <div className="rounded-xl border border-gray-100 divide-y divide-gray-100">
          {summary.recipients.map((r) => (
            <div
              key={r.name}
              className="flex items-center justify-between px-3 py-2.5"
            >
              <span className="text-sm text-gray-800">{r.name}</span>
              <span className="text-sm font-bold text-violet-600">
                {money(r.amount)}
              </span>
            </div>
          ))}
        </div>
        {summary.description && (
          <p className="text-xs text-gray-500 mt-2">“{summary.description}”</p>
        )}
      </div>

      {/* Totals */}
      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-gray-50 border border-gray-100 p-2.5">
          <p className="text-[10px] text-gray-500">Deposited</p>
          <p className="text-sm font-bold text-gray-900">
            {money(totalDeposited)}
          </p>
        </div>
        <div className="rounded-xl bg-violet-50 border border-violet-100 p-2.5">
          <p className="text-[10px] text-violet-600">This payment</p>
          <p className="text-sm font-bold text-violet-700">
            {money(summary.total)}
          </p>
        </div>
        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-2.5">
          <p className="text-[10px] text-emerald-600">Remaining</p>
          <p className="text-sm font-bold text-emerald-700">
            {money(remaining)}
          </p>
        </div>
      </div>

      {/* Request forms recap */}
      {requestForms.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Request Forms ({requestForms.length})
          </p>
          <div className="space-y-1.5">
            {requestForms.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-600 truncate">
                  {r.name} — {r.reason}
                </span>
                <span className="text-gray-900 font-medium shrink-0 ml-2">
                  {money(r.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
        <Link href={groupPath} className="sm:flex-1">
          <FormButton type="button" variant="secondary" size="lg" className="w-full">
            <span className="inline-flex items-center gap-1.5">
              View group
              <ArrowRight size={15} />
            </span>
          </FormButton>
        </Link>
        <FormButton
          type="button"
          size="lg"
          onClick={onClose}
          className="sm:flex-1"
        >
          Done
        </FormButton>
      </div>
    </Modal>
  );
}
