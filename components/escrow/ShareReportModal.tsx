"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check, Download, ExternalLink, Globe } from "lucide-react";
import Modal from "@/components/ui/modal";
import { FormButton } from "@/components/forms/FormComponents";

interface ShareReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportPath: string;
  onExport?: () => void;
}

export default function ShareReportModal({
  isOpen,
  onClose,
  reportPath,
  onExport,
}: ShareReportModalProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${reportPath}`
      : reportPath;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Report"
      description="Anyone with this link can view the full escrow report"
      maxWidthClassName="max-w-md"
    >
      <div className="grid gap-5">
        <div className="flex items-start gap-3 rounded-xl bg-violet-50 border border-violet-100 p-3">
          <Globe size={18} className="text-violet-600 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-600">
            The online report shows all members, chats, request forms, decider
            forms, payments and pledges — so no one can deny what was agreed or
            paid.
          </p>
        </div>

        {/* Link + copy */}
        <div>
          <label className="text-sm font-medium text-gray-800 mb-2.5 block">
            Shareable link
          </label>
          <div className="flex gap-2">
            <input
              readOnly
              value={fullUrl}
              className="flex-1 min-w-0 rounded-lg border-[1.5px] border-[#7f22fe]/40 bg-white/40 px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
            />
            <button
              type="button"
              onClick={copy}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3.5 text-sm font-semibold transition-colors ${
                copied
                  ? "bg-emerald-500 text-white"
                  : "bg-violet-600 hover:bg-violet-700 text-white"
              }`}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => onExport?.()}
            className="sm:flex-1"
          >
            <span className="inline-flex items-center gap-2">
              <Download size={16} />
              Export records
            </span>
          </FormButton>
          <Link href={reportPath} target="_blank" className="sm:flex-1">
            <FormButton type="button" size="lg" className="w-full">
              <span className="inline-flex items-center gap-2">
                <ExternalLink size={16} />
                Open report
              </span>
            </FormButton>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
