"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Target, CreditCard, Wallet, User } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, href: "/dashboard" },
  { label: "Goals", icon: Target, href: "/pledges" },
  { label: "Card", icon: CreditCard, href: "/virtual-cards" },
  { label: "Pocket", icon: Wallet, href: "/wallet" },
  { label: "Profile", icon: User, href: "/profile" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/kyc") || pathname.startsWith("/verified-tick"))
    return null;

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 bg-violet-700 rounded-2xl shadow-xl flex items-center justify-between px-2 py-2 z-40">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link key={item.label} href={item.href} className="flex-1">
            <div
              className={`flex flex-col items-center gap-1 py-1.5 rounded-xl mx-0.5 transition-colors ${
                isActive ? "bg-white/15" : ""
              }`}
            >
              <item.icon size={18} className="text-white" />
              {isActive && (
                <span className="text-[10px] text-white font-medium">
                  {item.label}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
