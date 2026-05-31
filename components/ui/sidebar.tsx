"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  Calendar,
  Wallet,
  Gift,
  Handshake,
  Users,
  Lock,
  CreditCard,
  MessageCircle,
  User,
  Settings,
  BarChart3,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [kycCompleted, setKycCompleted] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Calendar, label: "Events", href: "/events" },
    { icon: Wallet, label: "Wallet", href: "/wallet" },
    { icon: Gift, label: "Donations", href: "/donations" },
    { icon: Handshake, label: "Pledges", href: "/pledges" },
    { icon: Users, label: "Memberships", href: "/memberships" },
    { icon: Lock, label: "Escrow", href: "/escrow" },
    { icon: CreditCard, label: "Virtual Cards", href: "/virtual-cards" },
    { icon: MessageCircle, label: "Messages", href: "/chat" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    { icon: BarChart3, label: "Admin", href: "/admin" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            O
          </div>
          <span className="text-xl font-bold text-gray-900">Ologo</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-8 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-600 hover:"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* KYC Verification Banner */}
      {!kycCompleted && (
        <div className="m-4 mt-auto border-t border-gray-200 pt-4">
          <Link href="/kyc">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-bold text-blue-900 text-sm">
                  Verify Account
                </span>
              </div>
              <p className="text-xs text-blue-700 mb-3">
                Complete your KYC verification to unlock all features
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 rounded-lg transition-colors">
                Start Verification
              </button>
            </div>
          </Link>
        </div>
      )}
    </aside>
  );
}
