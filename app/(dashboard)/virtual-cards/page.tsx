"use client";
import React from "react";
import Link from "next/link";
import { EmptyState } from "@/components/cards/CardComponents";
import MobileHeader from "@/components/ui/MobileHeader";
import { CreditCard, Plus } from "lucide-react";
export default function VirtualCardsPage() {
  return (
    <main className="min-h-screen pb-8">
      <MobileHeader
        title="Virtual Cards"
        subtitle="Create and manage virtual payment cards"
        rightSlot={
          <Link href="/virtual-cards/create">
            <button
              className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0"
              aria-label="Create Card"
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
              Virtual Cards
            </h1>
            <p className="text-gray-600 mt-1">
              Create and manage virtual payment cards
            </p>
          </div>
          <Link href="/virtual-cards/create">
            <button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
              + Create Card
            </button>
          </Link>
        </div>
        <EmptyState
          icon={<CreditCard size={48} />}
          title="No Virtual Cards Yet"
          description="Create a virtual card to make secure online payments"
          action={{
            label: "Create Card",
            onClick: () => (window.location.href = "/virtual-cards/create"),
          }}
        />
      </div>
    </main>
  );
}
