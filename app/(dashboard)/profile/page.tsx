"use client";

import ProfileView from "@/components/profile/ProfileView";
import { MobileMenuButton } from "@/components/ui/MobileNav";

export default function ProfilePage() {
  return (
    <main className="min-h-screen pb-8">
      <div className="px-4 sm:px-6 md:px-8 pt-6 md:pt-0">
        <div className="md:hidden flex items-center gap-3 mb-5">
          <MobileMenuButton className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 shrink-0" />
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </div>
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
