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

      <div className="px-4 sm:px-6 md:px-8 pt-6 md:pt-0 flex-1 flex flex-col">
        <div className="hidden md:block">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Messages
          </h1>
          <p className="text-gray-600 mt-1">
            Connect and communicate with event creators and members
          </p>
        </div>

        <div className="mt-5 sm:mt-6 md:mt-8">
          <EmptyState
            icon={<MessageCircle size={48} />}
            title="No Messages Yet"
            description="Start a conversation with someone from the community"
          />
        </div>
      </div>
    </main>
  );
}
