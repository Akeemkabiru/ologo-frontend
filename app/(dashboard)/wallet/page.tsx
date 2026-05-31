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
} from "lucide-react";

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

  return (
    <main className="min-h-screen  px-8 pb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
          <p className="text-gray-600 mt-1">
            Manage your funds across multiple currencies
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/wallet/topup">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              + Top Up
            </button>
          </Link>
          <Link href="/wallet/transfer">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Transfer
            </button>
          </Link>
        </div>
      </div>

      {/* Overall Balance */}
      <div className="bg-linear-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg p-8 mb-8">
        <p className="text-blue-100 mb-2">Total Balance</p>
        <h2 className="text-2xl font-bold mb-4">${totalBalance.toFixed(2)}</h2>
        <p className="text-blue-100">Across all currencies</p>
      </div>

      {/* My Wallets */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">My Wallets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          label="Total Deposited"
          value={formatCurrency(
            mockWallets.reduce((sum, w) => sum + w.totalDeposits, 0),
            "USD",
          )}
          icon={<Download size={32} className="text-blue-600" />}
        />
        <StatsCard
          label="Total Withdrawn"
          value={formatCurrency(
            mockWallets.reduce((sum, w) => sum + w.totalWithdrawals, 0),
            "USD",
          )}
          icon={<Upload size={32} className="text-blue-600" />}
        />
        <StatsCard
          label="Total Transferred"
          value={formatCurrency(
            mockWallets.reduce((sum, w) => sum + w.totalTransfers, 0),
            "USD",
          )}
          icon={<DollarSign size={32} className="text-blue-600" />}
        />
        <StatsCard
          label="Active Wallets"
          value={mockWallets.length}
          icon={<Briefcase size={32} className="text-blue-600" />}
        />
      </div>

      {/* Transaction History */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Transaction History
          </h2>
          <Link href="/wallet/history">
            <button className="text-blue-600 hover:text-blue-700 font-semibold">
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
    </main>
  );
}
