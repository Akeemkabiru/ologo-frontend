"use client";

import React from "react";
import { EmptyState } from "@/components/cards/CardComponents";
import MobileHeader from "@/components/ui/MobileHeader";
import { MessageCircle } from "lucide-react";
export default function ChatPage() {
  return (
    <main className="min-h-screen pb-8 flex flex-col">
      <MobileHeader
        title="Messages"
        subtitle="Connect with event creators and members"
      />

      <div className="px-4 sm:px-6 md:px-8 pt-6 flex-1 flex flex-col">
        <EmptyState
          icon={<MessageCircle size={48} />}
          title="No Messages Yet"
          description="Start a conversation with someone from the community"
        />
      </div>
    </main>
  );
}
