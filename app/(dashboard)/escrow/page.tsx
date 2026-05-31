"use client";
import React from "react";
import Link from "next/link";
import { Card, EmptyState } from "@/components/cards/CardComponents";
import { Lock } from "lucide-react";
export default function EscrowPage() {
  return (
    <main className="min-h-screen  px-8 pb-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Escrow</h1>
          <p className="text-gray-600 mt-1">
            Secure fund management with multiple decision-makers
          </p>
        </div>
        <Link href="/escrow/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
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
    </main>
  );
}
