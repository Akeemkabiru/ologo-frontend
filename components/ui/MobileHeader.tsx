"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Bell } from "lucide-react";
import type { ReactNode } from "react";

interface MobileHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
  rightSlot?: ReactNode;
}

export default function MobileHeader({
  title,
  subtitle,
  showBack = false,
  backHref,
  rightSlot,
}: MobileHeaderProps) {
  const router = useRouter();

  return (
    <div className="-mt-6 relative left-1/2 -translate-x-1/2 w-screen md:static md:left-auto md:translate-x-0 md:w-auto md:mt-0 bg-linear-to-br from-violet-600 to-violet-800 rounded-b-[32px] md:rounded-2xl px-5 py-8 md:px-6 md:py-6 text-white">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {showBack ? (
            <button
              onClick={() => (backHref ? router.push(backHref) : router.back())}
              className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft size={18} />
            </button>
          ) : (
            <img
              src="https://i.pravatar.cc/64?img=12"
              alt="Profile"
              className="w-11 h-11 rounded-full border-2 border-white/30 object-cover shrink-0"
            />
          )}
          <div className="min-w-0">
            {subtitle && (
              <p className="text-xs text-violet-200 truncate">{subtitle}</p>
            )}
            <p className="font-semibold text-lg truncate">{title}</p>
          </div>
        </div>

        {rightSlot ?? (
          <button
            className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
