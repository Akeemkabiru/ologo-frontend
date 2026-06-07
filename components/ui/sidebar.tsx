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
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [kycCompleted, setKycCompleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 hover:bg-gray-100 rounded-lg bg-white"
      >
        {isOpen ? (
          <X size={24} className="text-gray-900" />
        ) : (
          <Menu size={24} className="text-gray-900" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed w-64 border-white/10 bg-white/20 backdrop-blur-xl shadow-2xl scrollbar-none h-screen overflow-y-auto transition-transform duration-300 z-40 left-0 top-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              O
            </div>
            <span className="text-xl font-bold text-gray-900">Ologo</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8 px-4  ">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-violet-50 text-violet-600 border-l-4 border-violet-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsOpen(false)}
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
          <div className="m-4 mt-auto border-t border-gray-200 pt-4 whitespace-break-spaces">
            <Link href="/kyc">
              <div className="bg-violet-50 border-2 border-violet-300 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-violet-600"
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
                  <span className="font-bold text-violet-900 text-sm">
                    Verify Account
                  </span>
                </div>
                <p className="text-xs text-violet-700 mb-3">
                  Complete your KYC verification to unlock all features
                </p>
                <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs py-2 rounded-lg transition-colors">
                  Start Verification
                </button>
              </div>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
