"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  MoreHorizontal,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import MobileHeader from "@/components/ui/MobileHeader";
import { formatCurrency } from "@/lib/utils";
import DepositModal from "@/components/escrow/DepositModal";
import RequestReleaseModal from "@/components/escrow/RequestReleaseModal";
import DeciderFormModal from "@/components/escrow/DeciderFormModal";
import { getEscrowById } from "@/data/escrows";

type Designation = "Host" | "Decider" | "Beneficiary" | "Witness";

const designationStyles: Record<Designation, string> = {
  Host: "bg-violet-100 text-violet-700",
  Decider: "bg-amber-100 text-amber-700",
  Beneficiary: "bg-emerald-100 text-emerald-700",
  Witness: "bg-gray-100 text-gray-600",
};

const fallbackEscrow = {
  name: "Website Redesign Project",
  secured: true,
  image:
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
  currency: "USD",
  inEscrow: 4200,
  total: 6000,
  timeLeft: "142 days left",
  partyCount: 5,
  description:
    "Funds are held in escrow and released to the beneficiaries only when a Decider approves. The Host deposits money and appoints a Decider (or themselves) to distribute it, invites Witnesses to observe and verify, and beneficiaries can raise Request Forms that every member can see. A neutral Decider can step in before any funds move.",
  members: [
    {
      id: "1",
      name: "David Mensah",
      role: "Host" as Designation,
      avatar: "https://i.pravatar.cc/64?img=21",
      note: "Created the escrow & deposits funds",
    },
    {
      id: "2",
      name: "Frank Adeyemi",
      role: "Decider" as Designation,
      avatar: "https://i.pravatar.cc/64?img=23",
      note: "Appointed to approve & distribute funds",
    },
    {
      id: "3",
      name: "Paulo Santos",
      role: "Beneficiary" as Designation,
      avatar: "https://i.pravatar.cc/64?img=25",
      note: "Receives approved payments",
    },
    {
      id: "4",
      name: "Shaggy Bello",
      role: "Beneficiary" as Designation,
      avatar: "https://i.pravatar.cc/64?img=26",
      note: "Receives approved payments",
    },
    {
      id: "5",
      name: "Grace Okafor",
      role: "Witness" as Designation,
      avatar: "https://i.pravatar.cc/64?img=24",
      note: "Invited to observe & verify",
    },
  ],
};

const deciderBeneficiaries = [
  {
    id: "b1",
    name: "Paulo Santos",
    avatar: "https://i.pravatar.cc/64?img=25",
    requestedAmount: 1000,
  },
  {
    id: "b2",
    name: "Shaggy Bello",
    avatar: "https://i.pravatar.cc/64?img=26",
    requestedAmount: 1500,
  },
];

const escrowUpdates = [
  {
    id: "1",
    date: "December 20, 2026",
    title: "Milestone 1 Approved — Design Sign-off",
    description:
      "The buyer approved the final design mockups. $1,500 was released from escrow to the developer for the completed design phase.",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=500&fit=crop",
  },
  {
    id: "2",
    date: "November 8, 2026",
    title: "Escrow Funded",
    description:
      "The depositor secured $4,200 in escrow to cover the first two project milestones. Work has officially begun on the front-end build.",
    image:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&h=500&fit=crop",
  },
];

const fundDetails = {
  released: 1500,
  held: 4200,
  breakdown: [
    {
      date: "December 20, 2026",
      purpose: "Milestone 1 — Design sign-off",
      release: 1500,
      platformFee: 30,
    },
    {
      date: "November 8, 2026",
      purpose: "Initial deposit into escrow",
      release: 0,
      platformFee: 84,
    },
  ],
};

const tabs = [
  { label: "About", value: "about" },
  { label: "Updates", value: "updates" },
  { label: "Fund Details", value: "fund-details" },
] as const;

type TabValue = (typeof tabs)[number]["value"];

export default function EscrowDetailPage() {
  const { id } = useParams<{ id: string }>();
  const listEscrow = getEscrowById(id);

  const escrow = {
    ...fallbackEscrow,
    ...(listEscrow && {
      name: listEscrow.name,
      secured: listEscrow.verified,
      image: listEscrow.image,
      inEscrow: listEscrow.inEscrow,
      total: listEscrow.total,
      timeLeft: `${listEscrow.daysLeft} days left`,
    }),
  };

  const [activeTab, setActiveTab] = useState<TabValue>("about");
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isReleaseOpen, setIsReleaseOpen] = useState(false);
  const [isDeciderOpen, setIsDeciderOpen] = useState(false);

  const progress = Math.round((escrow.inEscrow / escrow.total) * 100);
  const memberAvatars = escrow.members.map((m) => m.avatar);

  return (
    <main className="min-h-screen pb-40 md:pb-8">
      <MobileHeader
        title="Escrow"
        showBack
        backHref="/escrow"
        rightSlot={
          <button
            className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0"
            aria-label="More options"
          >
            <MoreHorizontal size={18} />
          </button>
        }
      />

      <div className="px-4 sm:px-6 md:px-8 pt-6 md:pt-0">
        {/* Desktop back link */}
        <div className="hidden md:block mb-6">
          <Link
            href="/escrow"
            className="text-violet-600 hover:text-violet-700 font-semibold flex items-center gap-2 w-fit"
          >
            <ArrowLeft size={18} />
            Back to Escrow
          </Link>
        </div>

        <div className="md:grid md:grid-cols-3 md:gap-8 md:items-start">
          {/* Main column */}
          <div className="md:col-span-2">
            {/* Hero image */}
            <div className="mb-5 md:mb-6 rounded-2xl overflow-hidden">
              <img
                src={escrow.image}
                alt={escrow.name}
                className="w-full h-56 md:h-80 object-cover"
              />
            </div>

            {escrow.secured && (
              <div className="flex items-center gap-1.5 mb-3">
                <ShieldCheck size={16} className="text-violet-600" />
                <span className="text-sm font-medium text-violet-600">
                  This escrow is secured
                </span>
              </div>
            )}

            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
              {escrow.name}
            </h1>

            {/* In Escrow / Total */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">In Escrow</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(escrow.inEscrow, escrow.currency)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-0.5">Total Value</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(escrow.total, escrow.currency)}
                </p>
              </div>
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-violet-500 transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold text-violet-600">
                {progress}% funded
              </span>
              <span className="text-xs text-gray-500">
                {escrow.timeLeft}
              </span>
            </div>

            {/* Member avatars */}
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200">
              <div className="flex -space-x-2">
                {memberAvatars.map((avatar, idx) => (
                  <img
                    key={idx}
                    src={avatar}
                    alt=""
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {escrow.partyCount} parties involved
              </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`shrink-0 pb-3 text-sm font-semibold border-b-2 transition-colors ${
                    activeTab === tab.value
                      ? "border-violet-600 text-violet-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* About */}
            {activeTab === "about" && (
              <div>
                <p className="text-gray-700 leading-relaxed mb-8">
                  {escrow.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">
                    Members & Designations ({escrow.members.length})
                  </h3>
                </div>
                <div>
                  {escrow.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-0"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-gray-900">
                            {member.name}
                          </p>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${designationStyles[member.role]}`}
                          >
                            {member.role}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {member.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Updates */}
            {activeTab === "updates" && (
              <div className="space-y-8">
                {escrowUpdates.map((update) => (
                  <div key={update.id}>
                    <p className="text-xs text-gray-400 mb-2">{update.date}</p>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {update.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {update.description}
                    </p>
                    <img
                      src={update.image}
                      alt={update.title}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Fund Details */}
            {activeTab === "fund-details" && (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-violet-50 rounded-xl p-4">
                    <p className="text-xs text-violet-600 font-medium mb-1 flex items-center gap-1">
                      <ArrowUpRight size={14} />
                      Released
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(fundDetails.released, escrow.currency)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                      <ArrowDownRight size={14} />
                      Held in escrow
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(fundDetails.held, escrow.currency)}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {fundDetails.breakdown.map((entry, idx) => (
                    <div key={idx}>
                      <p className="text-xs text-gray-400 mb-2">{entry.date}</p>
                      <p className="text-sm font-semibold text-gray-900 mb-2">
                        {entry.purpose}
                      </p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Released</span>
                          <span className="text-gray-900 font-medium">
                            {formatCurrency(entry.release, escrow.currency)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Platform fee</span>
                          <span className="text-gray-900 font-medium">
                            {formatCurrency(
                              entry.platformFee,
                              escrow.currency,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-gray-100 pt-1 mt-1">
                          <span className="text-gray-700 font-semibold">
                            Total
                          </span>
                          <span className="text-violet-600 font-bold">
                            {formatCurrency(
                              entry.release + entry.platformFee,
                              escrow.currency,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop sidebar */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">
                    Funded
                  </span>
                  <span className="text-sm font-semibold text-violet-600">
                    {progress}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">In Escrow</span>
                  <span className="font-bold text-violet-600">
                    {formatCurrency(escrow.inEscrow, escrow.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Value</span>
                  <span className="font-bold text-gray-900">
                    {formatCurrency(escrow.total, escrow.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Parties</span>
                  <span className="font-bold text-gray-900">
                    {escrow.partyCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    <Clock size={14} className="inline mr-1 -mt-0.5" />
                    Time Left
                  </span>
                  <span className="font-bold text-gray-900">
                    {escrow.timeLeft}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex -space-x-2">
                  {memberAvatars.map((avatar, idx) => (
                    <img
                      key={idx}
                      src={avatar}
                      alt=""
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {escrow.partyCount} parties involved
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsDeciderOpen(true)}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-full py-3.5 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 mb-3"
              >
                Fill Decider Form
              </button>
              <button
                type="button"
                onClick={() => setIsDepositOpen(true)}
                className="w-full bg-white border border-violet-200 text-violet-600 hover:bg-violet-50 font-semibold rounded-full py-3.5 transition-all duration-200 active:scale-95 mb-3"
              >
                Deposit Funds
              </button>
              <button
                type="button"
                onClick={() => setIsReleaseOpen(true)}
                className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded-full py-3.5 transition-all duration-200 active:scale-95"
              >
                Request Release
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky actions */}
      <div className="md:hidden fixed bottom-24 inset-x-0 px-5 z-30 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setIsDeciderOpen(true)}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-full py-3.5 shadow-lg transition-all duration-200 active:scale-95"
        >
          Fill Decider Form
        </button>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsReleaseOpen(true)}
            className="flex-1 bg-white border border-gray-200 text-gray-700 font-semibold rounded-full py-3 shadow-lg transition-all duration-200 active:scale-95"
          >
            Request
          </button>
          <button
            type="button"
            onClick={() => setIsDepositOpen(true)}
            className="flex-1 bg-white border border-violet-200 text-violet-600 font-semibold rounded-full py-3 shadow-lg transition-all duration-200 active:scale-95"
          >
            Deposit
          </button>
        </div>
      </div>

      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        escrowName={escrow.name}
      />
      <RequestReleaseModal
        isOpen={isReleaseOpen}
        onClose={() => setIsReleaseOpen(false)}
        escrowName={escrow.name}
      />
      <DeciderFormModal
        isOpen={isDeciderOpen}
        onClose={() => setIsDeciderOpen(false)}
        escrowName={escrow.name}
        available={escrow.inEscrow}
        beneficiaries={deciderBeneficiaries}
      />
    </main>
  );
}
