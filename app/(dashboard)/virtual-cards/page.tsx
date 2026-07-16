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
