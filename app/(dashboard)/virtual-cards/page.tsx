"use client";
import React from "react";
import Link from "next/link";
import { Card, EmptyState } from "@/components/cards/CardComponents";
import { CreditCard } from "lucide-react";
export default function VirtualCardsPage() {
  return (
    <main className="min-h-screen  px-8 pb-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Virtual Cards</h1>
          <p className="text-gray-600 mt-1">
            Create and manage virtual payment cards
          </p>
        </div>
        <Link href="/virtual-cards/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
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
    </main>
  );
}
