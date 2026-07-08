"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  WalletCard,
  TransactionCard,
  StatsCard,
  EmptyState,
} from "@/components/cards/CardComponents";
import { formatCurrency } from "@/lib/utils";
import {
  Download,
  Upload,
  DollarSign,
  Briefcase,
  BarChart3,
  Bell,
  ChevronDown,
  ChevronRight,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  Plus,
  Home,
  Target,
  CreditCard,
  Wallet as WalletIcon,
  User,
  ShoppingBag,
  Coffee,
  Plane,
  Car,
  Landmark,
} from "lucide-react";

const mobileContacts = [
  { name: "Elijah", avatar: "https://i.pravatar.cc/64?img=13" },
  { name: "Aaron", avatar: "https://i.pravatar.cc/64?img=14" },
  { name: "Abraham", avatar: "https://i.pravatar.cc/64?img=15", badge: CreditCard },
  { name: "Isaac", avatar: "https://i.pravatar.cc/64?img=16" },
  { name: "Ezekiel", avatar: "https://i.pravatar.cc/64?img=17" },
];

const mobileActions = [
  { label: "Sent", icon: ArrowUpRight, href: "/wallet/transfer" },
  { label: "Receive", icon: ArrowDownLeft, href: "/wallet" },
  { label: "Exchange", icon: Repeat, href: "/wallet" },
  { label: "Add", icon: Plus, href: "/wallet/topup" },
];

const mobileFilters = ["All", "Income", "Expense", "Escrow", "Card Payments"];

const mobileTransactions = [
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

const mobileNavItems = [
  { label: "Home", icon: Home, href: "/dashboard" },
  { label: "Goals", icon: Target, href: "/pledges" },
  { label: "Card", icon: CreditCard, href: "/virtual-cards" },
  { label: "Pocket", icon: WalletIcon, href: "/wallet" },
  { label: "Profile", icon: User, href: "/profile" },
];

export default function WalletPage() {
  // Mock data - replace with API call to walletService.getWallet() and walletService.getTransactionHistory()
  const mockWallets = [
    {
      id: "1",
      currency: "USD",
      balance: 1500,
      totalDeposits: 5000,
      totalWithdrawals: 3500,
      totalTransfers: 0,
    },
    {
      id: "2",
      currency: "EUR",
      balance: 2000,
      totalDeposits: 3000,
      totalWithdrawals: 1000,
      totalTransfers: 0,
    },
    {
      id: "3",
      currency: "GBP",
      balance: 800,
      totalDeposits: 1000,
      totalWithdrawals: 200,
      totalTransfers: 0,
    },
  ];

  const mockTransactions = [
    {
      id: "1",
      type: "receive",
      amount: 100,
      currency: "USD",
      senderName: "Alice Johnson",
      receiverName: "You",
      date: new Date().toISOString(),
      status: "completed",
      description: "Donation for School Event",
    },
    {
      id: "2",
      type: "send",
      amount: 50,
      currency: "USD",
      senderName: "You",
      receiverName: "Bob Smith",
      date: new Date().toISOString(),
      status: "completed",
      description: "Transfer",
    },
    {
      id: "3",
      type: "receive",
      amount: 200,
      currency: "EUR",
      senderName: "Charlie Brown",
      receiverName: "You",
      date: new Date().toISOString(),
      status: "completed",
      description: "Event Donation",
    },
  ];

  const totalBalance = mockWallets.reduce((sum, w) => sum + w.balance, 0);
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <main className="min-h-screen pb-8">
      {/* Mobile-only wallet screen */}
      <div className="md:hidden -mt-6 -mx-3 sm:-mx-4 mb-6">
        {/* Purple header */}
        <div className="bg-linear-to-br from-violet-600 to-violet-800 rounded-b-[32px] px-5 pt-8 pb-6 text-white">
          {/* Top row */}
          <div className="flex items-center justify-between mb-6">
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
          <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-4">
            <button className="flex items-center gap-1.5 bg-white/15 rounded-full pl-2 pr-2.5 py-1 text-xs font-medium mb-4">
              <span className="text-sm leading-none">🇺🇸</span>
              USD
              <ChevronDown size={12} />
            </button>
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-violet-200 mb-1">Wallet</p>
                <p className="text-2xl font-bold">
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
            {mobileActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <div className="flex flex-col items-center gap-2">
                  <span className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
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

        {/* White content */}
        <div className="bg-gray-50 rounded-t-[28px] -mt-4 relative px-5 pt-6 pb-28">
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
            {mobileContacts.map((contact) => (
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
            {mobileFilters.map((filter) => (
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
            {mobileTransactions.map((tx) => (
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

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-violet-700 rounded-2xl shadow-xl flex items-center justify-between px-2 py-2 z-40">
        {mobileNavItems.map((item) => {
          const isActive = item.label === "Home";
          return (
            <Link key={item.label} href={item.href} className="flex-1">
              <div
                className={`flex flex-col items-center gap-1 py-1.5 rounded-xl mx-0.5 ${
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

      {/* Desktop / tablet wallet view */}
      <div className="hidden md:block px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-5 sm:mb-6 md:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Wallet</h1>
          <p className="text-gray-600 mt-1">
            Manage your funds across multiple currencies
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/wallet/topup">
            <button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              + Top Up
            </button>
          </Link>
          <Link href="/wallet/transfer">
            <button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Transfer
            </button>
          </Link>
        </div>
      </div>

      {/* Overall Balance */}
      <div className="bg-linear-to-br from-violet-600 to-violet-700 text-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 mb-5 sm:mb-6 md:mb-8">
        <p className="text-violet-100 mb-2">Total Balance</p>
        <h2 className="text-2xl font-bold mb-4">${totalBalance.toFixed(2)}</h2>
        <p className="text-violet-100">Across all currencies</p>
      </div>

      {/* My Wallets */}
      <div className="mb-5 sm:mb-6 md:mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">My Wallets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {mockWallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              currency={wallet.currency}
              balance={wallet.balance}
              onClick={() => console.log("View wallet", wallet.id)}
            />
          ))}
        </div>
      </div>

      {/* Wallet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-5 sm:mb-6 md:mb-8">
        <StatsCard
          label="Total Deposited"
          value={formatCurrency(
            mockWallets.reduce((sum, w) => sum + w.totalDeposits, 0),
            "USD",
          )}
          icon={<Download size={32} className="text-violet-600" />}
        />
        <StatsCard
          label="Total Withdrawn"
          value={formatCurrency(
            mockWallets.reduce((sum, w) => sum + w.totalWithdrawals, 0),
            "USD",
          )}
          icon={<Upload size={32} className="text-violet-600" />}
        />
        <StatsCard
          label="Total Transferred"
          value={formatCurrency(
            mockWallets.reduce((sum, w) => sum + w.totalTransfers, 0),
            "USD",
          )}
          icon={<DollarSign size={32} className="text-violet-600" />}
        />
        <StatsCard
          label="Active Wallets"
          value={mockWallets.length}
          icon={<Briefcase size={32} className="text-violet-600" />}
        />
      </div>

      {/* Transaction History */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Transaction History
          </h2>

          <Link href="/wallet/history">
            <button className="text-violet-600 hover:text-violet-700 font-semibold">
              View All
            </button>
          </Link>
        </div>

        <div className="space-y-4">
          {mockTransactions.length > 0 ? (
            mockTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <EmptyState
              icon={<BarChart3 size={48} />}
              title="No Transactions Yet"
              description="Your transactions will appear here"
            />
          )}
        </div>
      </div>
      </div>
    </main>
  );
}
