"use client";
import React from "react";
import Link from "next/link";
import { EmptyState } from "@/components/cards/CardComponents";
import MobileHeader from "@/components/ui/MobileHeader";
import { Handshake, Plus } from "lucide-react";
export default function PledgesPage() {
  return (
    <main className="min-h-screen pb-8">
      <MobileHeader
        title="Pledges"
        subtitle="Commit to causes with performance-based pledges"
        rightSlot={
          <Link href="/pledges/create">
            <button
              className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0"
              aria-label="Create Pledge"
            >
              <Plus size={18} />
            </button>
          </Link>
        }
      />

      <div className="px-4 sm:px-6 md:px-8 pt-6">
        <EmptyState
          icon={<Handshake size={48} />}
          title="No Pledges Yet"
          description="Create or join a pledge to commit to a cause"
          action={{
            label: "Create Pledge",
            onClick: () => (window.location.href = "/pledges/create"),
          }}
        />
      </div>
    </main>
  );
}
