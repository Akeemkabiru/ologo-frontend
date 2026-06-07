"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
} from "lucide-react";

export default function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedMonth, setSelectedMonth] = useState(new Date(2026, 4)); // May 2026

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
      date: "2026-05-31 10:30 AM",
      status: "completed",
      commission: ((500 * commissionRate) / 100).toFixed(2),
    },
    {
      id: "2",
      type: "donation",
      description: "Donated to School Fundraiser",
      amount: 100,
      currency: "USD",
      date: "2026-05-30 02:15 PM",
      status: "completed",
      commission: "0.00",
    },
    {
      id: "3",
      type: "transfer",
      description: "Transfer to John Doe",
      amount: 250,
      currency: "USD",
      date: "2026-05-29 09:45 AM",
      status: "completed",
      commission: ((250 * commissionRate) / 100).toFixed(2),
    },
    {
      id: "4",
      type: "receive",
      description: "Transfer from Jane Smith",
      amount: 150,
      currency: "USD",
      date: "2026-05-28 03:20 PM",
      status: "completed",
      commission: "0.00",
    },
  ];

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
    return transactions.filter((tx) => tx.date.startsWith(dateStr));
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
    <main className="min-h-screen px-8 pb-16">
      {/* Welcome Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600 font-medium">
          Here&apos;s an overview of your wallet and transactions
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
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
            className="bg-white rounded-2xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="text-gray-400">{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Wallet Card */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-violet-600 w-fit rounded-2xl text-white p-8 shadow-lg">
          <p className="text-violet-100 text-sm font-medium mb-2">
            Wallet Balance
          </p>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-1">
                ${walletBalance.toFixed(2)}
              </h2>
              <p className="text-violet-100">{walletCurrency}</p>
            </div>
            <Link href="/wallet/topup" className="ml-6">
              <button className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                + Top Up
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Transactions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-10"
      >
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              Transaction History
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === "list"
                    ? "bg-violet-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === "calendar"
                    ? "bg-violet-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Calendar
              </button>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-4 mb-6">
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
            <button className="px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg hover: flex items-center gap-2 font-medium text-gray-700">
              <Filter size={18} />
              Filter
            </button>
            <button
              onClick={() => handleExport("csv")}
              className="px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg hover: flex items-center gap-2 font-medium text-gray-700"
            >
              <Download size={18} />
              Export
            </button>
          </div>

          {/* Tabs */}
          {viewMode === "list" && (
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              {["all", "income", "expense"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium capitalize border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-violet-600 text-violet-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* List View */}
        {viewMode === "list" && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden text-sm">
            {filteredTransactions.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredTransactions.map((tx) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 hover: transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {tx.description}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {tx.date}
                          </p>
                          {parseFloat(tx.commission) > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              Commission: {tx.commission} {tx.currency}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          -{tx.amount} {tx.currency}
                        </p>
                        <p className="text-xs text-violet-600 font-medium mt-1">
                          {tx.status}
                        </p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 ml-2">
                        <MoreVertical size={18} className="text-gray-400" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <Wallet size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 font-medium text-base">
                  No transactions yet
                </p>
              </div>
            )}
          </div>
        )}

        {/* Calendar View */}
        {viewMode === "calendar" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
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
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-gray-600 py-2"
                >
                  {day}
                </div>
              ))}
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
          </div>
        )}
      </motion.div>

      {/* Future Transactions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Upcoming Transactions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {futureTransactions.length > 0 ? (
            futureTransactions.map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl text-sm border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <Link href={`/groups/${tx.groupId}`}>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-medium mb-1">
                        {tx.type === "membership"
                          ? "Membership"
                          : tx.type === "escrow"
                            ? "Escrow"
                            : "Recurring Payment"}
                      </p>
                      <p className="font-semibold text-gray-900 hover:text-violet-600">
                        {tx.description}
                      </p>
                    </div>
                  </Link>
                  <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {tx.frequency}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-bold text-gray-900">
                      {tx.amount} {tx.currency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-600 flex items-center gap-2">
                      Date
                    </span>
                    <span className="font-semibold text-gray-900">
                      {tx.nextDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-600">Group</span>
                    <span className="font-semibold text-violet-600">
                      {tx.groupName}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 font-medium">
                No upcoming transactions
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Your Groups Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Your Groups</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userGroups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
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
        className="mt-12"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Analytics & Metrics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Spending Chart */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
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
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
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
    </main>
  );
}
