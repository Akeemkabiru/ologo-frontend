"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  DASHBOARD_BALANCE_PREF_KEY,
  type DashboardBalanceKey,
} from "@/lib/constants";
import {
  Wallet,
  TrendingUp,
  Download,
  Search,
  Filter,
  Calendar,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Send,
  TrendingDown,
  Plus,
  Home,
  CreditCard,
  ShoppingBag,
  Coffee,
  Plane,
  Car,
  Landmark,
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  MoreHorizontal,
  Eye,
  EyeOff,
  type LucideIcon,
} from "lucide-react";
import MobileHeader from "@/components/ui/MobileHeader";

// Color-coded transaction status pills.
const statusStyles: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  failed: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-500",
  refunded: "bg-violet-100 text-violet-700",
};

export default function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [historyTab, setHistoryTab] = useState<"history" | "future">("history");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedMonth, setSelectedMonth] = useState(new Date(2026, 4)); // May 2026

  // Which balance cards to show — controlled from Settings.
  const [balancePrefs, setBalancePrefs] = useState<
    Record<DashboardBalanceKey, boolean>
  >({ wallet: true, escrow: true, future: true });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DASHBOARD_BALANCE_PREF_KEY);
      if (raw) {
        setBalancePrefs((prev) => ({ ...prev, ...JSON.parse(raw) }));
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Toggle a balance's visibility and persist it to localStorage.
  const toggleBalance = (key: DashboardBalanceKey) => {
    setBalancePrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(DASHBOARD_BALANCE_PREF_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  type TxTypeEntry = {
    icon: LucideIcon;
    subtitle: string;
    tagIcon: LucideIcon;
  };

  const transactionTypeMap: Record<string, TxTypeEntry> = {
    topup: {
      icon: Wallet,
      subtitle: "Top-up",
      tagIcon: Wallet,
    },
    donation: {
      icon: TrendingUp,
      subtitle: "Donation",
      tagIcon: TrendingUp,
    },
    transfer: {
      icon: Send,
      subtitle: "Transfer",
      tagIcon: Send,
    },
    receive: {
      icon: Download,
      subtitle: "Receive",
      tagIcon: Download,
    },
  };

  const futureTransactionTypeMap: Record<string, TxTypeEntry> = {
    recurring: {
      icon: Repeat,
      subtitle: "Recurring",
      tagIcon: Repeat,
    },
    escrow: {
      icon: Landmark,
      subtitle: "Escrow",
      tagIcon: Landmark,
    },
    "payment-request": {
      icon: Repeat,
      subtitle: "Payment Request",
      tagIcon: Repeat,
    },
    pledge: {
      icon: TrendingUp,
      subtitle: "Pledge",
      tagIcon: TrendingUp,
    },
  };

  // Mock data
  const walletBalance = 2500.0;
  const walletCurrency = "USD";
  const commissionRate = 2.5; // 2.5% commission

  const transactions = [
    {
      id: "1",
      type: "topup",
      description: "Wallet Top-up",
      amount: 500,
      currency: "USD",
      date: "May 31 2026, 10:30 AM",
      isoDate: "2026-05-31",
      category: "Main Balance",
      status: "completed",
      commission: ((500 * commissionRate) / 100).toFixed(2),
    },
    {
      id: "2",
      type: "donation",
      description: "Donated to School Fundraiser",
      amount: 100,
      currency: "USD",
      date: "May 30 2026, 02:15 PM",
      isoDate: "2026-05-30",
      category: "Donations",
      status: "completed",
      commission: "0.00",
    },
    {
      id: "3",
      type: "transfer",
      description: "Transfer to John Doe",
      amount: 250,
      currency: "USD",
      date: "May 29 2026, 09:45 AM",
      isoDate: "2026-05-29",
      category: "Main Balance",
      status: "pending",
      commission: ((250 * commissionRate) / 100).toFixed(2),
    },
    {
      id: "4",
      type: "receive",
      description: "Transfer from Jane Smith",
      amount: 150,
      currency: "USD",
      date: "May 28 2026, 03:20 PM",
      isoDate: "2026-05-28",
      category: "Main Balance",
      status: "completed",
      commission: "0.00",
    },
  ];

  // Future Funds includes upcoming/recurring items plus payment requests and
  // pledges that have not been paid yet.
  const futureTransactions = [
    {
      id: "f2",
      type: "recurring",
      description: "Recurring Donation",
      amount: 25,
      currency: "USD",
      nextDate: "2026-06-02",
      frequency: "Weekly",
      groupId: "grp-002",
      groupName: "Community Fund",
    },
    {
      id: "f3",
      type: "escrow",
      description: "Event Escrow - Tech Conference",
      amount: 200,
      currency: "USD",
      nextDate: "2026-07-15",
      frequency: "One-time",
      groupId: "grp-003",
      groupName: "Tech Conference 2026",
    },
    {
      id: "f4",
      type: "payment-request",
      description: "Payment Request — Logo Design (Unpaid)",
      amount: 450,
      currency: "USD",
      nextDate: "2026-08-20",
      frequency: "Unpaid",
      groupId: "grp-004",
      groupName: "Services",
    },
    {
      id: "f4b",
      type: "payment-request",
      description: "Payment Request — August Rent (Unpaid)",
      amount: 1200,
      currency: "USD",
      nextDate: "2026-09-01",
      frequency: "Unpaid",
      groupId: "grp-006",
      groupName: "Rent",
    },
    {
      id: "f5",
      type: "pledge",
      description: "Monthly Pledge to Charity (Unpaid)",
      amount: 50,
      currency: "USD",
      nextDate: "2026-06-01",
      frequency: "Unpaid",
      groupId: "grp-005",
      groupName: "Charity Fund",
    },
    {
      id: "f5b",
      type: "pledge",
      description: "Community Build Pledge (Unpaid)",
      amount: 120,
      currency: "USD",
      nextDate: "2026-06-18",
      frequency: "Unpaid",
      groupId: "grp-007",
      groupName: "Community Fund",
    },
  ];

  const stats = [
    { label: "Total Spent", value: "$1,850", icon: <TrendingUp size={20} /> },
    { label: "Active Events", value: "3", icon: <Calendar size={20} /> },
    { label: "Memberships", value: "2", icon: <Wallet size={20} /> },
  ];

  const userGroups = [
    { id: "grp-001", name: "Premium Club", members: 12, type: "Membership" },
    { id: "grp-002", name: "Community Fund", members: 45, type: "Group Money" },
    { id: "grp-003", name: "Tech Conference 2026", members: 8, type: "Event" },
  ];

  // Filter transactions based on search and tab
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "income" &&
          (tx.type === "receive" || tx.type === "deposit")) ||
        (activeTab === "expense" &&
          tx.type !== "receive" &&
          tx.type !== "deposit");
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  // Calendar generation
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getTransactionsByDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return transactions.filter((tx) => tx.isoDate === dateStr);
  };

  const handleExport = (format: "pdf" | "csv") => {
    // Mock export functionality
    const data = filteredTransactions.map((tx) => ({
      Date: tx.date,
      Description: tx.description,
      Amount: `${tx.amount} ${tx.currency}`,
      Commission: `${tx.commission} ${tx.currency}`,
      Status: tx.status,
    }));

    const csvContent = [
      ["Date", "Description", "Amount", "Commission", "Status"],
      ...data.map((row) => [
        row.Date,
        row.Description,
        row.Amount,
        row.Commission,
        row.Status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions.${format === "csv" ? "csv" : "txt"}`;
    a.click();
  };

  const handleDeleteGroup = (groupId: string) => {
    // Mock delete functionality
    console.log(`Deleted group: ${groupId}`);
  };

  return (
    <main className="min-h-screen pb-16">
      <MobileHeader title="Dashboard" />

      <div className="px-4 sm:px-6 md:px-8 pt-6">
        <div className="hidden md:block mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Welcome back!
          </h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s an overview of your wallet and transaction
          </p>
        </div>
        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, staggerChildren: 0.05 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
              className=" rounded-2xl bg-white shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="text-gray-400">{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Wallet Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full">
          <motion.div
            className="mb-6 sm:mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-violet-600 w-full rounded-2xl text-white p-5 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-violet-100 text-sm font-medium">
                  Wallet Balance
                </p>
                <button
                  type="button"
                  onClick={() => toggleBalance("wallet")}
                  aria-label={
                    balancePrefs.wallet ? "Hide balance" : "Show balance"
                  }
                  className="text-violet-100 hover:text-white transition-colors"
                >
                  {balancePrefs.wallet ? (
                    <Eye size={16} />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {balancePrefs.wallet
                      ? `$${walletBalance.toFixed(2)}`
                      : "••••••"}
                  </h2>
                  <p className="text-violet-100">{walletCurrency}</p>
                </div>

                <button className="bg-white/20 hover:bg-white/30 text-sm text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                  + Top Up
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mb-6 sm:mb-8 md:mb-10 hidden md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-violet-600 w-full rounded-2xl text-white p-5 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-violet-100 text-sm font-medium">Escrow</p>
                <button
                  type="button"
                  onClick={() => toggleBalance("escrow")}
                  aria-label={
                    balancePrefs.escrow ? "Hide balance" : "Show balance"
                  }
                  className="text-violet-100 hover:text-white transition-colors"
                >
                  {balancePrefs.escrow ? (
                    <Eye size={16} />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {balancePrefs.escrow
                      ? `$${walletBalance.toFixed(2)}`
                      : "••••••"}
                  </h2>
                  <p className="text-violet-100">{walletCurrency}</p>
                </div>

                <button className="bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  + Create Escrow
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mb-6 sm:mb-8 md:mb-10 hidden md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-violet-600 w-full rounded-2xl text-white p-5 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-violet-100 text-sm font-medium">
                  Future Fund
                </p>
                <button
                  type="button"
                  onClick={() => toggleBalance("future")}
                  aria-label={
                    balancePrefs.future ? "Hide balance" : "Show balance"
                  }
                  className="text-violet-100 hover:text-white transition-colors"
                >
                  {balancePrefs.future ? (
                    <Eye size={16} />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {balancePrefs.future
                      ? `$${walletBalance.toFixed(2)}`
                      : "••••••"}
                  </h2>
                  <p className="text-violet-100">{walletCurrency}</p>
                </div>

                <button className="bg-white/20 hover:bg-white/30 w-fit text-sm text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                  + Create Escrow
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Transactions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 sm:mb-8 md:mb-10"
        >
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div className="flex items-center gap-x-6">
                <button
                  onClick={() => setHistoryTab("history")}
                  className={`text-lg font-semibold pb-1 border-b-2 transition-colors ${
                    historyTab === "history"
                      ? "text-violet-600 border-violet-600"
                      : "text-black border-transparent hover:text-gray-600"
                  }`}
                >
                  Transaction History
                </button>
                <button
                  onClick={() => setHistoryTab("future")}
                  className={`text-lg font-semibold pb-1 border-b-2 transition-colors ${
                    historyTab === "future"
                      ? "text-violet-600 border-violet-600"
                      : "text-black border-transparent hover:text-gray-600"
                  }`}
                >
                  Future
                </button>
              </div>
              {historyTab === "history" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === "list"
                        ? "bg-violet-600 text-white"
                        : "rounded-lg bg-white shadow-sm border border-gray-100 text-gray-700"
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setViewMode("calendar")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === "calendar"
                        ? "bg-violet-600 text-white"
                        : "rounded-lg bg-white shadow-sm border border-gray-100 text-gray-700 "
                    }`}
                  >
                    Calendar
                  </button>
                </div>
              )}
            </div>

            {/* Search & Filter */}
            {historyTab === "history" && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search transactions, groups, users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-violet-500 focus:border-transparent text-sm"
                  />
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 sm:flex-none justify-center px-4 py-2.5 text-sm rounded-lg bg-white shadow-sm border border-gray-100 hover: flex items-center gap-2 font-medium text-gray-700">
                    <Filter size={18} />
                    Filter
                  </button>
                  <button
                    onClick={() => handleExport("csv")}
                    className="flex-1 sm:flex-none justify-center px-4 py-2.5 text-sm rounded-lg bg-white shadow-sm border border-gray-100 hover: flex items-center gap-2 font-medium text-gray-700"
                  >
                    <Download size={18} />
                    Export
                  </button>
                </div>
              </div>
            )}

            {/* Tabs */}
            {historyTab === "history" && viewMode === "list" && (
              <div className="flex gap-2 mb-6 border-b border-gray-200">
                {["all", "income", "expense"].map((tab) => {
                  const isActive = activeTab === tab;
                  const activeColor =
                    tab === "expense"
                      ? "border-red-500 text-red-500"
                      : tab === "income"
                        ? "border-emerald-500 text-emerald-600"
                        : "border-violet-600 text-violet-600";
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 font-medium capitalize border-b-2 transition-colors ${
                        isActive
                          ? activeColor
                          : "border-transparent text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
          {/* List View — matches the Wallet transactions design */}
          {historyTab === "history" && viewMode === "list" && (
            <motion.div
              key="history-list"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 overflow-x-auto"
            >
              {filteredTransactions.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs text-gray-400 border-b border-gray-100">
                      <th className="font-medium pb-3 pl-1">Transaction</th>
                      <th className="font-medium pb-3">Date</th>
                      <th className="font-medium pb-3">Category</th>
                      <th className="font-medium pb-3">Status</th>
                      <th className="font-medium pb-3 text-right pr-1">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <AnimatePresence mode="wait">
                    <motion.tbody
                      key={`${activeTab}-${searchTerm}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18, ease: "easeInOut" }}
                    >
                      {filteredTransactions.map((tx) => {
                        const typeMap = transactionTypeMap[tx.type] || {
                          icon: MoreVertical,
                          subtitle: tx.type,
                          tagIcon: MoreVertical,
                        };
                        // Expenses (anything that isn't money coming in) are
                        // shown in red with a minus, since they are spent.
                        const isExpense =
                          tx.amount < 0 ||
                          (tx.type !== "receive" && tx.type !== "topup");
                        return (
                          <tr
                            key={tx.id}
                            className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                          >
                            <td className="py-3.5 pl-1">
                              <div className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                                  {typeMap.icon && (
                                    <typeMap.icon
                                      size={16}
                                      className="text-violet-600"
                                    />
                                  )}
                                </span>
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-gray-900 truncate">
                                    {tx.description}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {typeMap.subtitle}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="text-sm text-gray-500 whitespace-nowrap pr-4">
                              {tx.date}
                            </td>
                            <td>
                              <span className="inline-flex items-center gap-1.5 bg-gray-100 rounded-full px-2.5 py-1 text-xs text-gray-600 whitespace-nowrap">
                                {typeMap.tagIcon && (
                                  <typeMap.tagIcon
                                    size={12}
                                    className="text-violet-600"
                                  />
                                )}
                                {tx.category}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap capitalize ${statusStyles[tx.status] ?? "bg-gray-100 text-gray-600"}`}
                              >
                                {tx.status}
                              </span>
                            </td>
                            <td className="text-right pr-1">
                              <span
                                className={`text-sm font-bold whitespace-nowrap ${
                                  isExpense ? "text-red-500" : "text-emerald-500"
                                }`}
                              >
                                {isExpense ? "-" : "+"}$
                                {Math.abs(tx.amount).toFixed(2)} {tx.currency}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </motion.tbody>
                  </AnimatePresence>
                </table>
              ) : (
                <div className="p-12 text-center">
                  <Wallet size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600 font-medium text-base">
                    No transactions yet
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Calendar View */}
          {historyTab === "history" && viewMode === "calendar" && (
            <motion.div
              key="history-calendar"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-gray-900">
                  {selectedMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setSelectedMonth(
                        new Date(
                          selectedMonth.getFullYear(),
                          selectedMonth.getMonth() - 1,
                        ),
                      )
                    }
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedMonth(
                        new Date(
                          selectedMonth.getFullYear(),
                          selectedMonth.getMonth() + 1,
                        ),
                      )
                    }
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-semibold text-gray-600 py-2"
                    >
                      {day}
                    </div>
                  ),
                )}
                {Array.from({
                  length: new Date(
                    selectedMonth.getFullYear(),
                    selectedMonth.getMonth(),
                    1,
                  ).getDay(),
                }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="p-2" />
                ))}
                {Array.from({ length: getDaysInMonth(selectedMonth) }).map(
                  (_, idx) => {
                    const date = new Date(
                      selectedMonth.getFullYear(),
                      selectedMonth.getMonth(),
                      idx + 1,
                    );
                    const dayTransactions = getTransactionsByDate(date);
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg border ${
                          dayTransactions.length > 0
                            ? "border-violet-200 bg-violet-50"
                            : "border-gray-200 "
                        }`}
                      >
                        <p className="text-sm font-semibold text-gray-900">
                          {idx + 1}
                        </p>
                        {dayTransactions.length > 0 && (
                          <p className="text-xs text-violet-600 font-medium">
                            {dayTransactions.length} transaction
                            {dayTransactions.length > 1 ? "s" : ""}
                          </p>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </motion.div>
          )}

          {/* Future table */}
          {historyTab === "future" && (
            <motion.div
              key="future-table"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 overflow-x-auto"
            >
              {futureTransactions.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs text-gray-400 border-b border-gray-100">
                      <th className="font-medium pb-3 pl-1">Transaction</th>
                      <th className="font-medium pb-3">Date</th>
                      <th className="font-medium pb-3">Category</th>
                      <th className="font-medium pb-3 text-right pr-1">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {futureTransactions.map((tx) => {
                      const typeMap = futureTransactionTypeMap[tx.type] || {
                        icon: MoreVertical,
                        subtitle: tx.type,
                        tagIcon: MoreVertical,
                      };
                      const isAmountNegative = tx.amount < 0;
                      return (
                        <tr
                          key={tx.id}
                          className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                        >
                          <td className="py-3.5 pl-1">
                            <div className="flex items-center gap-3">
                              <span className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                                {typeMap.icon && (
                                  <typeMap.icon
                                    size={16}
                                    className="text-violet-600"
                                  />
                                )}
                              </span>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                  {tx.description}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {typeMap.subtitle}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-sm text-gray-500 whitespace-nowrap pr-4">
                            {tx.nextDate}
                          </td>
                          <td>
                            <span className="inline-flex items-center gap-1.5 bg-gray-100 rounded-full px-2.5 py-1 text-xs text-gray-600 whitespace-nowrap">
                              {typeMap.tagIcon && (
                                <typeMap.tagIcon
                                  size={12}
                                  className="text-violet-600"
                                />
                              )}
                              <span className="ml-1">{tx.frequency}</span>
                            </span>
                          </td>
                          <td className="text-right pr-1">
                            <span
                              className={`text-sm font-bold whitespace-nowrap ${
                                isAmountNegative
                                  ? "text-red-500"
                                  : "text-emerald-500"
                              }`}
                            >
                              {isAmountNegative ? "-" : "+"}$
                              {Math.abs(tx.amount).toFixed(2)} {tx.currency}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center">
                  <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600 font-medium text-base">
                    No upcoming transactions
                  </p>
                </div>
              )}
            </motion.div>
          )}
          </AnimatePresence>
        </motion.div>

        {/* Your Groups Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 sm:mt-10 md:mt-12"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Your Groups</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {userGroups.map((group) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <Link href={`/groups/${group.id}`}>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-medium mb-1">
                        {group.type}
                      </p>
                      <p className="font-semibold text-gray-900 hover:text-violet-600">
                        {group.name}
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleDeleteGroup(group.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {group.members}
                    </span>{" "}
                    members
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 sm:mt-10 md:mt-12"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Analytics & Metrics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {/* Spending Chart */}
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
              <h4 className="font-semibold text-gray-900 mb-4">
                Spending by Category
              </h4>
              <div className="space-y-4">
                {[
                  { name: "Top-ups", amount: 500, percentage: 27 },
                  { name: "Donations", amount: 350, percentage: 19 },
                  { name: "Transfers", amount: 400, percentage: 22 },
                  { name: "Memberships", amount: 600, percentage: 32 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {item.name}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        ${item.amount}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-violet-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Stats */}
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
              <h4 className="font-semibold text-gray-900 mb-4">
                Activity Summary
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Transactions</span>
                  <span className=" font-semibold text-gray-900">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">This Month Spent</span>
                  <span className=" font-semibold text-gray-900">$1,850</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Commission Paid</span>
                  <span className="font-semibold text-gray-900">
                    ${((750 * 2.5) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Avg Transaction</span>
                  <span className="font-bold text-gray-900">
                    ${(1850 / 24).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
