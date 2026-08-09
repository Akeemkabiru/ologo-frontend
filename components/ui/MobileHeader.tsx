"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import {
  MobileMenuButton,
  MobileHeaderActions,
} from "@/components/ui/MobileNav";

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
    <div className="md:hidden bg-linear-to-br from-violet-600 to-violet-800 rounded-b-[32px] px-5 pt-8 pb-6 text-white">
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
            <MobileMenuButton className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white shrink-0" />
          )}
          <div className="min-w-0">
            {subtitle && (
              <p className="text-xs text-violet-200 truncate">{subtitle}</p>
            )}
            <p className="font-semibold text-lg truncate">{title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {rightSlot}
          <MobileHeaderActions variant="violet" />
        </div>
      </div>
    </div>
  );
}
