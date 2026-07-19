"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  Plus,
  Home,
  CreditCard,
  Wallet as WalletIcon,
  ShoppingBag,
  Coffee,
  Plane,
  Car,
  Landmark,
} from "lucide-react";

const contacts = [
  { name: "Elijah", avatar: "https://i.pravatar.cc/64?img=13" },
  { name: "Aaron", avatar: "https://i.pravatar.cc/64?img=14" },
  {
    name: "Abraham",
    avatar: "https://i.pravatar.cc/64?img=15",
    badge: CreditCard,
  },
  { name: "Isaac", avatar: "https://i.pravatar.cc/64?img=16" },
  { name: "Ezekiel", avatar: "https://i.pravatar.cc/64?img=17" },
];

const quickActions = [
  { label: "Sent", icon: ArrowUpRight, href: "/wallet/transfer" },
  { label: "Receive", icon: ArrowDownLeft, href: "/wallet" },
  { label: "Exchange", icon: Repeat, href: "/wallet" },
  { label: "Add", icon: Plus, href: "/wallet/topup" },
];

const transactionFilters = [
  "All",
  "Income",
  "Expense",
  "Escrow",
  "Card Payments",
];

const transactions = [
  {
    id: "m1",
    name: "Ezekiel Foster",
    avatar: "https://i.pravatar.cc/64?img=17",
    subtitle: "Transfer",
    time: "Today, 02:32 PM",
    amount: -500,
    tag: "Main Balance",
    tagIcon: WalletIcon,
  },
  {
    id: "m2",
    name: "Abraham Collins",
    avatar: "https://i.pravatar.cc/64?img=15",
    subtitle: "Transfer",
    time: "Today, 02:40 PM",
    amount: -500,
    tag: "Main Balance",
    tagIcon: WalletIcon,
  },
  {
    id: "m3",
    name: "Apple Store",
    icon: ShoppingBag,
    subtitle: "Transfer",
    time: "Today, 10:24 AM",
    amount: -142.5,
    tag: "Japan Trip",
    tagIcon: Plane,
  },
  {
    id: "m4",
    name: "Salary Deposit",
    icon: Landmark,
    subtitle: "Transfer",
    time: "Yesterday, 10:24 AM",
    amount: 4200,
    tag: "Tesla Model S",
    tagIcon: Car,
  },
  {
    id: "m5",
    name: "Blue Bottle Coffee",
    icon: Coffee,
    subtitle: "Transfer",
    time: "Jun 14, 10:24 AM",
    amount: -8.4,
    tag: "New Dream House",
    tagIcon: Home,
  },
];

export default function WalletPage() {
  // Mock data
  const totalBalance = 4300;
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <main className="min-h-screen pb-8">
      <div className="md:px-6 lg:px-8 md:max-w-3xl md:mx-auto">
        {/* Desktop-only page title */}
        <h1 className="hidden md:block text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
          Wallet
        </h1>

        <div className="mb-6">
          {/* Header - full bleed on mobile, contained card on desktop */}
          <div className="bg-linear-to-br from-violet-600 to-violet-800 -mt-6 relative left-1/2 -translate-x-1/2 w-screen rounded-b-[32px] md:static md:left-auto md:translate-x-0 md:w-auto md:mt-0 md:rounded-2xl px-5 py-8 text-white">
            {/* Top row - mobile only, desktop already has profile/notifications in the fixed header */}
            <div className="md:hidden flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/64?img=12"
                  alt="Akbar Hafsyah"
                  className="w-11 h-11 rounded-full border-2 border-white/30 object-cover"
                />
                <div>
                  <p className="text-xs text-violet-200">Welcome back</p>
                  <p className="font-semibold text-sm">Akbar Hafsyah</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                <Bell size={18} />
              </button>
            </div>

            {/* Wallet card */}
            <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <button className="flex items-center gap-1.5 bg-white/15 rounded-full pl-2 pr-2.5 py-1 text-xs font-medium mb-4">
                <span className="text-sm leading-none">🇺🇸</span>
                USD
                <ChevronDown size={12} />
              </button>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs text-violet-200 mb-1">Wallet</p>
                  <p className="text-2xl md:text-3xl font-bold">
                    ${totalBalance.toFixed(2)}
                  </p>
                </div>
                <Link href="/wallet/topup">
                  <button className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold pl-3.5 pr-2 py-2 rounded-full transition-colors">
                    Top Up
                    <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center">
                      <Plus size={10} />
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-4 gap-2 mt-6">
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href}>
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center">
                      <action.icon size={18} />
                    </span>
                    <span className="text-[11px] font-medium text-violet-100">
                      {action.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="relative px-5 md:px-0 pt-6 pb-8">
            {/* Recent Transfer */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 text-[15px]">
                Recent Transfer
              </h3>
              <button className="text-xs text-violet-600 font-medium flex items-center gap-0.5">
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-1 mb-5 scrollbar-none">
              {contacts.map((contact) => (
                <div
                  key={contact.name}
                  className="flex flex-col items-center gap-1.5 shrink-0 w-14"
                >
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {contact.badge && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <contact.badge size={9} className="text-violet-600" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-700 font-medium">
                    {contact.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-5">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white rounded-full pl-10 pr-4 py-3 text-sm shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>

            {/* Transaction Type */}
            <p className="text-[13px] font-semibold text-gray-900 mb-2">
              Transaction Type
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none">
              {transactionFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                    activeFilter === filter
                      ? "bg-violet-600 text-white"
                      : "bg-violet-100/70 text-violet-400"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Recent Transactions */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 text-[15px]">
                Recent Transactions
              </h3>
              <Link
                href="/wallet/history"
                className="text-xs text-violet-600 font-medium"
              >
                All Activity
              </Link>
            </div>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm"
                >
                  {tx.avatar ? (
                    <img
                      src={tx.avatar}
                      alt={tx.name}
                      className="w-11 h-11 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <span className="w-11 h-11 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                      {tx.icon && (
                        <tx.icon size={18} className="text-violet-600" />
                      )}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {tx.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {tx.subtitle} · {tx.time}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className={`text-sm font-bold ${
                        tx.amount < 0 ? "text-red-500" : "text-emerald-500"
                      }`}
                    >
                      {tx.amount < 0 ? "-" : "+"}$
                      {Math.abs(tx.amount).toFixed(2)}
                    </p>
                    <p className="text-[11px] text-gray-400 flex items-center justify-end gap-1 mt-0.5">
                      <tx.tagIcon size={11} />
                      {tx.tag}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
