"use client";
import React from "react";
import Link from "next/link";
import { Card, EmptyState } from "@/components/cards/CardComponents";
import { Handshake } from "lucide-react";
export default function PledgesPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-8 pb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-5 sm:mb-6 md:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Pledges</h1>
          <p className="text-gray-600 mt-1">
            Commit to causes with performance-based pledges
          </p>
        </div>
        <Link href="/pledges/create">
          <button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            + Create Pledge
          </button>
        </Link>
      </div>
      <EmptyState
        icon={<Handshake size={48} />}
        title="No Pledges Yet"
        description="Create or join a pledge to commit to a cause"
        action={{
          label: "Create Pledge",
          onClick: () => (window.location.href = "/pledges/create"),
        }}
      />
    </main>
  );
}
