"use client";

import ProfileView from "@/components/profile/ProfileView";

export default function ProfilePage() {
  return (
    <main className="min-h-screen pb-8">
      <div className="px-4 sm:px-6 md:px-8 pt-6 md:pt-0">
        <div className="hidden md:block mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Profile
          </h1>
          <p className="text-gray-600 mt-1">
            How your profile looks to the community
          </p>
        </div>
        <ProfileView />
      </div>
    </main>
  );
}
