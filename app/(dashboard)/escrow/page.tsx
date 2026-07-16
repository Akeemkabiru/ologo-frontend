"use client";
import React from "react";
import Link from "next/link";
import { EmptyState } from "@/components/cards/CardComponents";
import MobileHeader from "@/components/ui/MobileHeader";
import { Lock, Plus } from "lucide-react";
export default function EscrowPage() {
  return (
    <main className="min-h-screen pb-8">
      <MobileHeader
        title="Escrow"
        subtitle="Secure fund management with multiple decision-makers"
        rightSlot={
          <Link href="/escrow/create">
            <button
              className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0"
              aria-label="Create Escrow"
            >
              <Plus size={18} />
            </button>
          </Link>
        }
      />

      <div className="px-4 sm:px-6 md:px-8 pt-6">
        <EmptyState
          icon={<Lock size={48} />}
          title="No Escrow Accounts Yet"
          description="Create an escrow account to securely manage funds with multiple parties"
          action={{
            label: "Create Escrow",
            onClick: () => (window.location.href = "/escrow/create"),
          }}
        />
      </div>
    </main>
  );
}
