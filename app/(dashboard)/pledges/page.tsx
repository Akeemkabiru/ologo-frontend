"use client";
import React from "react";
import Link from "next/link";
import { Card, EmptyState } from "@/components/cards/CardComponents";
import { Handshake } from "lucide-react";
export default function PledgesPage() {
  return (
    <main className="min-h-screen  px-8 pb-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pledges</h1>
          <p className="text-gray-600 mt-1">
            Commit to causes with performance-based pledges
          </p>
        </div>
        <Link href="/pledges/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
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
