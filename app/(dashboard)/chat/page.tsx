"use client";

import React from "react";
import Link from "next/link";
import { Card, EmptyState } from "@/components/cards/CardComponents";
import { MessageCircle } from "lucide-react";
export default function ChatPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-8 pb-8 flex flex-col">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Messages</h1>
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
    </main>
  );
}
