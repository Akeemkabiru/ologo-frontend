"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CashFlowChart } from "@/components/wallet/WalletCharts";
import SendMoneyModal from "@/components/wallet/SendMoneyModal";
import TopUpModal from "@/components/wallet/TopUpModal";
import ExchangeModal from "@/components/wallet/ExchangeModal";
import {
  MobileMenuButton,
  MobileHeaderActions,
} from "@/components/ui/MobileNav";
import {
  ChevronDown,
  ChevronLeft,
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
  TrendingUp,
  TrendingDown,
  Send,
  MoreHorizontal,
} from "lucide-react";

// Balance is held in USD; other currencies are display-only conversions.
const CURRENCIES = [
  { code: "USD", flag: "🇺🇸", symbol: "$", rate: 1 },
  { code: "EUR", flag: "🇪🇺", symbol: "€", rate: 0.92 },
  { code: "GBP", flag: "🇬🇧", symbol: "£", rate: 0.79 },
  { code: "NGN", flag: "🇳🇬", symbol: "₦", rate: 1550 },
];

function formatBalance(amountUsd: number, code: string) {
  const currency = CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
  const converted = amountUsd * currency.rate;
  return `${currency.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function CurrencyMenu({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const active = CURRENCIES.find((c) => c.code === value) ?? CURRENCIES[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 rounded-full pl-2 pr-2.5 py-1 text-xs font-medium transition-colors"
      >
        <span className="text-sm leading-none">{active.flag}</span>
        {active.code}
        <ChevronDown
          size={12}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              role="listbox"
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top left" }}
              className="absolute left-0 top-full mt-1.5 z-20 w-36 rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden py-1"
            >
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  role="option"
                  aria-selected={c.code === value}
                  onClick={() => {
                    onChange(c.code);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-left transition-colors ${
                    c.code === value
                      ? "bg-violet-50 text-violet-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm leading-none">{c.flag}</span>
                  {c.code}
                  <span className="ml-auto text-gray-400">{c.symbol}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

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
  { label: "Send", icon: ArrowUpRight, action: "send" as const },
  { label: "Request", icon: ArrowDownLeft, action: "request" as const },
  { label: "Convert", icon: Repeat, action: "exchange" as const },
  { label: "Add", icon: Plus, action: "topup" as const },
];

const transactionFilters = [
  "All",
  "Income",
  "Expense",
  "Escrow",
  "Card Payments",
  "Future Funds",
];

const transactions = [
  {
    id: "m1",
    name: "Ezekiel Foster",
    avatar: "https://i.pravatar.cc/64?img=17",
    subtitle: "Transfer",
    time: "August 6 2026, 02:32 PM",
    amount: -500,
    tag: "Main Balance",
    tagIcon: WalletIcon,
    type: "Expense",
  },
  {
    id: "m2",
    name: "Abraham Collins",
    avatar: "https://i.pravatar.cc/64?img=15",
    subtitle: "Transfer",
    time: "August 6 2026, 02:40 PM",
    amount: -500,
    tag: "Main Balance",
    tagIcon: WalletIcon,
    type: "Expense",
  },
  {
    id: "m3",
    name: "Apple Store",
    icon: ShoppingBag,
    subtitle: "Card Payment",
    time: "August 6 2026, 10:24 AM",
    amount: -142.5,
    tag: "Japan Trip",
    tagIcon: Plane,
    type: "Card Payments",
  },
  {
    id: "m4",
    name: "Salary Deposit",
    icon: Landmark,
    subtitle: "Bank Transfer",
    time: "August 5 2026, 10:24 AM",
    amount: 4200,
    tag: "Tesla Model S",
    tagIcon: Car,
    type: "Income",
  },
  {
    id: "m5",
    name: "Blue Bottle Coffee",
    icon: Coffee,
    subtitle: "Card Payment",
    time: "June 14 2026, 10:24 AM",
    amount: -8.4,
    tag: "New Dream House",
    tagIcon: Home,
    type: "Card Payments",
  },
  {
    id: "m6",
    name: "Isaac Nwosu",
    avatar: "https://i.pravatar.cc/64?img=16",
    subtitle: "Transfer",
    time: "June 13 2026, 09:15 AM",
    amount: -250,
    tag: "Main Balance",
    tagIcon: WalletIcon,
    type: "Expense",
  },
  {
    id: "m7",
    name: "Freelance Payment",
    icon: Landmark,
    subtitle: "Bank Transfer",
    time: "June 12 2026, 03:00 PM",
    amount: 800,
    tag: "Main Balance",
    tagIcon: WalletIcon,
    type: "Income",
  },
  {
    id: "m8",
    name: "Elijah Mensah",
    avatar: "https://i.pravatar.cc/64?img=13",
    subtitle: "Transfer",
    time: "June 11 2026, 11:00 AM",
    amount: -100,
    tag: "Main Balance",
    tagIcon: WalletIcon,
    type: "Expense",
  },
  {
    id: "m9",
    name: "Airbnb",
    icon: Home,
    subtitle: "Card Payment",
    time: "June 10 2026, 08:40 AM",
    amount: -320,
    tag: "Japan Trip",
    tagIcon: Plane,
    type: "Card Payments",
  },
  {
    id: "m10",
    name: "Dividend Income",
    icon: Landmark,
    subtitle: "Bank Transfer",
    time: "June 8 2026, 01:00 PM",
    amount: 150,
    tag: "Main Balance",
    tagIcon: WalletIcon,
    type: "Income",
  },
  {
    id: "m11",
    name: "Aaron Bello",
    avatar: "https://i.pravatar.cc/64?img=14",
    subtitle: "Transfer",
    time: "June 7 2026, 04:20 PM",
    amount: -75,
    tag: "Main Balance",
    tagIcon: WalletIcon,
    type: "Expense",
  },
  {
    id: "m12",
    name: "Stripe Escrow",
    icon: CreditCard,
    subtitle: "Escrow Release",
    time: "June 6 2026, 12:00 PM",
    amount: 600,
    tag: "Main Balance",
    tagIcon: WalletIcon,
    type: "Escrow",
  },
  {
    id: "m13",
    name: "Scheduled Payout Release",
    icon: Landmark,
    subtitle: "Pending Escrow",
    time: "August 20 2026, 12:00 PM",
    amount: 1200,
    tag: "Main Balance",
    tagIcon: WalletIcon,
    type: "Future Funds",
  },
  {
    id: "m14",
    name: "Recurring Pledge — Grace O.",
    icon: CreditCard,
    subtitle: "Monthly Pledge",
    time: "September 1 2026, 09:00 AM",
    amount: 500,
    tag: "Main Balance",
    tagIcon: WalletIcon,
    type: "Future Funds",
  },
  {
    id: "m15",
    name: "Payment Request — Logo Design",
    icon: Repeat,
    subtitle: "Payment Request · Unpaid",
    time: "August 20 2026, 12:00 PM",
    amount: 450,
    tag: "Services",
    tagIcon: Repeat,
    type: "Future Funds",
  },
  {
    id: "m15b",
    name: "Payment Request — August Rent",
    icon: Repeat,
    subtitle: "Payment Request · Unpaid",
    time: "September 1 2026, 05:00 PM",
    amount: 1200,
    tag: "Rent",
    tagIcon: Repeat,
    type: "Future Funds",
  },
  {
    id: "m16",
    name: "Monthly Pledge to Charity",
    icon: TrendingUp,
    subtitle: "Pledge · Unpaid",
    time: "July 1 2026, 09:00 AM",
    amount: 50,
    tag: "Charity",
    tagIcon: TrendingUp,
    type: "Future Funds",
  },
  {
    id: "m16b",
    name: "Community Build Pledge",
    icon: TrendingUp,
    subtitle: "Pledge · Unpaid",
    time: "June 18 2026, 09:00 AM",
    amount: 120,
    tag: "Community Fund",
    tagIcon: TrendingUp,
    type: "Future Funds",
  },
];

export default function WalletPage() {
  // Mock data
  const router = useRouter();
  const totalBalance = 4300;
  const [currency, setCurrency] = useState("USD");
  const [sendOpen, setSendOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [exchangeOpen, setExchangeOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const handleQuickAction = (
    action: "send" | "topup" | "request" | "exchange" | "none",
  ) => {
    if (action === "send") setSendOpen(true);
    else if (action === "topup") setTopUpOpen(true);
    else if (action === "request") router.push("/wallet/payment-links");
    else if (action === "exchange") setExchangeOpen(true);
  };
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const income = transactions
    .filter((t) => t.amount > 0 && t.type !== "Future Funds")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const filteredTransactions = useMemo(
    () =>
      activeFilter === "All"
        ? transactions
        : transactions.filter((t) => t.type === activeFilter),
    [activeFilter],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / PAGE_SIZE),
  );
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  const rangeStart =
    filteredTransactions.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, filteredTransactions.length);

  // Reset to first page whenever the active filter changes
  useEffect(() => {
    setPage(1);
  }, [activeFilter]);

  return (
    <main className="min-h-screen pb-8">
      {/* Mobile header - full bleed purple card */}
      <div className="md:hidden bg-linear-to-br from-violet-600 to-violet-800 relative left-1/2 -translate-x-1/2 w-screen rounded-b-[32px] px-5 pt-8 pb-8 text-white mb-6">
        {/* Top row */}
        <div className="flex items-center justify-between mb-6">
          <MobileMenuButton className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center text-white shrink-0" />
          <MobileHeaderActions variant="violet" />
        </div>

        {/* Wallet card */}
        <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-4">
          <CurrencyMenu value={currency} onChange={setCurrency} />
          <div className="flex items-end justify-between gap-3 mt-4">
            <div>
              <p className="text-xs text-violet-200 mb-1">Wallet</p>
              <p className="text-2xl font-bold">
                {formatBalance(totalBalance, currency)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTopUpOpen(true)}
              className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold pl-3.5 pr-2 py-2 rounded-full transition-colors"
            >
              Top Up
              <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center">
                <Plus size={10} />
              </span>
            </button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => handleQuickAction(action.action)}
              className="flex flex-col items-center gap-2"
            >
              <span className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center">
                <action.icon size={18} />
              </span>
              <span className="text-[11px] font-medium text-violet-100">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ===================== MOBILE BODY ===================== */}
      <div className="md:hidden px-5 pb-8">
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
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 5).map((tx) => (
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
                  {tx.icon && <tx.icon size={18} className="text-violet-600" />}
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
                  {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
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

      {/* ===================== DESKTOP DASHBOARD ===================== */}
      <div className="hidden md:block px-8 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Wallet
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your balance, transfers and transactions
            </p>
          </div>
          <div className="relative w-72">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full bg-white rounded-full pl-10 pr-4 py-2.5 text-sm shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Balance */}
          <div className="bg-linear-to-br from-violet-600 to-violet-800 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <CurrencyMenu value={currency} onChange={setCurrency} />
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <WalletIcon size={16} />
              </span>
            </div>
            <p className="text-xs text-violet-200 mb-1">Total Balance</p>
            <p className="text-3xl font-bold mb-5">
              {formatBalance(totalBalance, currency)}
            </p>
            <button
              type="button"
              onClick={() => setTopUpOpen(true)}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              Top Up
              <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center">
                <Plus size={10} />
              </span>
            </button>
          </div>

          {/* Income */}
          <div className="bg-linear-to-br from-emerald-50 to-emerald-100/60 rounded-2xl p-6 border border-emerald-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-emerald-700">Income</p>
              <span className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm shadow-emerald-500/30">
                <TrendingUp size={16} className="text-white" />
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-900 mt-4">
                ${income.toFixed(2)}
              </p>
              <p className="text-xs text-emerald-600 font-medium mt-1">
                +12.5% vs last month
              </p>
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-linear-to-br from-rose-50 to-rose-100/60 rounded-2xl p-6 border border-rose-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-rose-700">Expenses</p>
              <span className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center shadow-sm shadow-rose-500/30">
                <TrendingDown size={16} className="text-white" />
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-rose-900 mt-4">
                ${expenses.toFixed(2)}
              </p>
              <p className="text-xs text-rose-600 font-medium mt-1">
                -3.2% vs last month
              </p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => handleQuickAction(action.action)}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-100 shadow-sm rounded-xl py-3.5 text-sm font-semibold text-gray-700 hover:border-violet-200 hover:text-violet-600 transition-colors"
            >
              <action.icon size={16} />
              {action.label}
            </button>
          ))}
        </div>

        {/* Transactions table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900">Transactions</h3>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-5 flex-wrap">
              {transactionFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeFilter === filter
                      ? "bg-violet-600 text-white"
                      : "bg-violet-100/70 text-violet-500 hover:bg-violet-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-gray-100">
                  <th className="font-medium pb-3 pl-1">Transaction</th>
                  <th className="font-medium pb-3">Date</th>
                  <th className="font-medium pb-3">Category</th>
                  <th className="font-medium pb-3 text-right pr-1">Amount</th>
                </tr>
              </thead>
              <AnimatePresence mode="wait">
                <motion.tbody
                  key={`${activeFilter}-${page}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                >
                  {paginatedTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="py-3.5 pl-1">
                        <div className="flex items-center gap-3">
                          {tx.avatar ? (
                            <img
                              src={tx.avatar}
                              alt={tx.name}
                              className="w-10 h-10 rounded-full object-cover shrink-0"
                            />
                          ) : (
                            <span className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                              {tx.icon && (
                                <tx.icon
                                  size={16}
                                  className="text-violet-600"
                                />
                              )}
                            </span>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {tx.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {tx.subtitle}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-sm text-gray-500 whitespace-nowrap pr-4">
                        {tx.time}
                      </td>
                      <td>
                        <span className="inline-flex items-center gap-1.5 bg-gray-100 rounded-full px-2.5 py-1 text-xs text-gray-600 whitespace-nowrap">
                          <tx.tagIcon size={12} />
                          {tx.tag}
                        </span>
                      </td>
                      <td className="text-right pr-1">
                        <span
                          className={`text-sm font-bold whitespace-nowrap ${
                            tx.amount < 0 ? "text-red-500" : "text-emerald-500"
                          }`}
                        >
                          {tx.amount < 0 ? "-" : "+"}$
                          {Math.abs(tx.amount).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </motion.tbody>
              </AnimatePresence>
            </table>

            {filteredTransactions.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-10">
                No transactions in this category.
              </p>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {rangeStart}–{rangeEnd}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                  {filteredTransactions.length}
                </span>
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      aria-current={page === pageNumber ? "page" : undefined}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        page === pageNumber
                          ? "bg-violet-600 text-white shadow-sm"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

        {/* Analytics + Send Again */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <CashFlowChart />
          </div>

          {/* Send Again */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Send Again</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-3">
              {contacts.map((contact) => (
                <div
                  key={contact.name}
                  className="flex items-center gap-3 -mx-2 px-2 py-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-400">Recent</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSendOpen(true)}
                    className="w-8 h-8 rounded-full bg-violet-50 hover:bg-violet-100 flex items-center justify-center text-violet-600 transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SendMoneyModal isOpen={sendOpen} onClose={() => setSendOpen(false)} />
      <TopUpModal isOpen={topUpOpen} onClose={() => setTopUpOpen(false)} />
      <ExchangeModal
        isOpen={exchangeOpen}
        onClose={() => setExchangeOpen(false)}
      />
    </main>
  );
}
