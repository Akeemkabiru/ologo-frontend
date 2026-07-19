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
        <div className="hidden md:flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Escrow
            </h1>
            <p className="text-gray-600 mt-1">
              Secure fund management with multiple decision-makers
            </p>
          </div>
          <Link href="/escrow/create">
            <button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
              + Create Escrow
            </button>
          </Link>
        </div>
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
