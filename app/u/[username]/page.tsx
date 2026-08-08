"use client";

import ProfileView from "@/components/profile/ProfileView";

export default function PublicProfilePage() {
  return (
    <main className="min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Brand bar */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-8 h-8 rounded-lg bg-violet-600 text-white font-bold flex items-center justify-center">
            O
          </span>
          <span className="font-bold text-gray-900">Ologo</span>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500">Public profile</span>
        </div>
        <ProfileView publicView />
      </div>
    </main>
  );
}
