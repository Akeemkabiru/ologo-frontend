"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Copy,
  Check,
  ExternalLink,
  Link2,
  ArrowLeft,
} from "lucide-react";
import MobileHeader from "@/components/ui/MobileHeader";
import CreatePaymentLinkModal from "@/components/payments/CreatePaymentLinkModal";
import { formatCurrency } from "@/lib/utils";
import { paymentLinks, type PaymentLink } from "@/data/paymentLinks";

const statusStyles: Record<PaymentLink["status"], string> = {
  active: "bg-emerald-100 text-emerald-700",
  paid: "bg-violet-100 text-violet-700",
  expired: "bg-gray-100 text-gray-500",
};

export default function PaymentLinksPage() {
  const [links, setLinks] = useState<PaymentLink[]>(paymentLinks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = async (id: string) => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/pay/${id}`
        : `/pay/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <main className="min-h-screen pb-8">
      <MobileHeader
        title="Payment Requests"
        subtitle="Request money with a shareable link, QR code, in-app"
        showBack
        backHref="/wallet"
        rightSlot={
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0"
            aria-label="Create payment request"
          >
            <Plus size={18} />
          </button>
        }
      />

      <div className="px-4 sm:px-6 md:px-8 pt-6 md:pt-0">
        {/* Desktop header */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <div>
            <Link
              href="/wallet"
              className="text-violet-600 hover:text-violet-700 font-semibold flex items-center gap-2 w-fit mb-2"
            >
              <ArrowLeft size={18} />
              Back to Wallet
            </Link>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Payment Requests
            </h1>
            <p className="text-gray-600 mt-1">
              Request money with a shareable link, QR code, in-app
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors shadow-sm"
          >
            <Plus size={16} />
            Create Payment Request
          </button>
        </div>

        {links.length === 0 ? (
          <div className="text-center py-16">
            <Link2 size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No payment requests yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {links.map((link) => (
              <div
                key={link.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
              >
                <div className="flex gap-4 p-4">
                  <img
                    src={link.image}
                    alt={link.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {link.name}
                      </p>
                      <span
                        className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyles[link.status]}`}
                      >
                        {link.status}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-violet-600 mt-0.5">
                      {formatCurrency(link.amount, link.currency)}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Due {link.dueAt}
                    </p>
                    {link.hostStatus === "co-host" && link.onBehalfOf && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        On behalf of {link.onBehalfOf}
                      </p>
                    )}
                    {link.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {link.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex border-t border-gray-100 mt-auto">
                  <button
                    onClick={() => copy(link.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {copiedId === link.id ? (
                      <>
                        <Check size={15} className="text-emerald-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={15} />
                        Copy link
                      </>
                    )}
                  </button>
                  <Link
                    href={`/pay/${link.id}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold text-violet-600 hover:bg-violet-50 border-l border-gray-100 transition-colors"
                  >
                    <ExternalLink size={15} />
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreatePaymentLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={(link) => setLinks((prev) => [link, ...prev])}
      />
    </main>
  );
}
