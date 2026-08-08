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
import AddMemberModal from "@/components/escrow/AddMemberModal";
import RaiseRequestModal from "@/components/escrow/RaiseRequestModal";
import GroupActivityModal from "@/components/escrow/GroupActivityModal";
import ShareReportModal from "@/components/escrow/ShareReportModal";
import PaymentSuccessModal from "@/components/escrow/PaymentSuccessModal";
import AcceptAppointmentModal from "@/components/escrow/AcceptAppointmentModal";
import type { DeciderPaymentSummary } from "@/components/escrow/DeciderFormModal";
import { getEscrowById } from "@/data/escrows";
import {
  designationStyles,
  escrowMembers,
  escrowRequestForms,
  escrowChat,
  escrowFormRecords,
  escrowUpdates,
  escrowFundDetails as fundDetails,
  fallbackEscrow,
  deciderBeneficiaries,
  type EscrowMember,
  type RequestForm,
} from "@/data/escrowDetail";
import {
  UserPlus,
  MessagesSquare,
  Share2,
  Plus,
  Layers,
  CalendarClock,
} from "lucide-react";

const tabs = [
  { label: "About", value: "about" },
  { label: "Requests", value: "requests" },
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
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isRaiseRequestOpen, setIsRaiseRequestOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const [members, setMembers] = useState<EscrowMember[]>(escrowMembers);
  const [requestForms, setRequestForms] =
    useState<RequestForm[]>(escrowRequestForms);
  const [selfAppointed, setSelfAppointed] = useState(false);
  const [paymentSummary, setPaymentSummary] =
    useState<DeciderPaymentSummary | null>(null);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);
  const [appointmentAccepted, setAppointmentAccepted] = useState(false);

  const addMember = (member: EscrowMember) =>
    setMembers((prev) => [...prev, member]);
  const addRequest = (request: RequestForm) =>
    setRequestForms((prev) => [request, ...prev]);

  const appointSelfAsDecider = () => {
    setMembers((prev) => [
      ...prev,
      {
        id: "self-decider",
        name: "David Mensah (You)",
        role: "Decider",
        avatar: "https://i.pravatar.cc/64?img=21",
        note: "Self-appointed as Decider",
      },
    ]);
    setSelfAppointed(true);
  };

  const progress = Math.round((escrow.inEscrow / escrow.total) * 100);
  const memberAvatars = members.map((m) => m.avatar);
  const reportPath = `/escrow-report/${id}`;
  const totalDeposited = fundDetails.released + fundDetails.held;

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
            {/* Pending Decider appointment */}
            {!appointmentAccepted && (
              <div className="mb-5 flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-amber-900">
                    You&apos;ve been appointed as a Decider
                  </p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Accept to review requests and distribute funds. You can
                    choose to stay anonymous or use an alias.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAcceptOpen(true)}
                  className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  Accept appointment
                </button>
              </div>
            )}

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

            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              {escrow.name}
            </h1>

            {/* Standalone group vs part of an event */}
            <div className="mb-5">
              {escrow.event ? (
                <Link
                  href={`/events/${escrow.event.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium bg-violet-100 text-violet-700 hover:bg-violet-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  <CalendarClock size={13} />
                  Part of event: {escrow.event.name}
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                  <Layers size={13} />
                  Standalone escrow group
                </span>
              )}
            </div>

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
                {members.length} parties involved
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
                    Members &amp; Designations ({members.length})
                  </h3>
                  <div className="flex items-center gap-3">
                    {!selfAppointed && (
                      <button
                        type="button"
                        onClick={appointSelfAsDecider}
                        className="text-sm font-semibold text-gray-500 hover:text-violet-600"
                      >
                        Appoint myself as Decider
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsAddMemberOpen(true)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700"
                    >
                      <UserPlus size={15} />
                      Add member
                    </button>
                  </div>
                </div>
                <div>
                  {members.map((member) => (
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

            {/* Requests */}
            {activeTab === "requests" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Request Forms ({requestForms.length})
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Visible to every member of the group
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsRaiseRequestOpen(true)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700"
                  >
                    <Plus size={15} />
                    Raise request
                  </button>
                </div>

                {requestForms.length === 0 ? (
                  <p className="text-sm text-gray-400 py-10 text-center">
                    No request forms yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {requestForms.map((req) => (
                      <div
                        key={req.id}
                        className="p-4 rounded-xl border border-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={req.avatar}
                            alt={req.name}
                            className="w-10 h-10 rounded-full object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {req.name}
                              </p>
                              <span
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                                  req.status === "paid"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {req.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400">{req.date}</p>
                          </div>
                          <span className="text-lg font-bold text-violet-600 shrink-0">
                            {formatCurrency(req.amount, escrow.currency)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 mt-3">
                          {req.reason}
                        </p>
                        {req.note && (
                          <p className="text-xs text-gray-500 mt-1">
                            {req.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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
                    {members.length}
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
                  {members.length} parties involved
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

              {/* Management actions */}
              <div className="mt-6 pt-6 border-t border-gray-200 grid gap-1">
                <button
                  type="button"
                  onClick={() => setIsAddMemberOpen(true)}
                  className="flex items-center gap-3 -mx-2 px-2 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <UserPlus size={16} className="text-violet-600" />
                  Add / appoint member
                </button>
                <button
                  type="button"
                  onClick={() => setIsActivityOpen(true)}
                  className="flex items-center gap-3 -mx-2 px-2 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <MessagesSquare size={16} className="text-violet-600" />
                  Group chat &amp; history
                </button>
                <button
                  type="button"
                  onClick={() => setIsShareOpen(true)}
                  className="flex items-center gap-3 -mx-2 px-2 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Share2 size={16} className="text-violet-600" />
                  Share report &amp; export
                </button>
              </div>
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
        onSubmitted={(summary) => {
          setPaymentSummary(summary);
          setIsPaymentSuccessOpen(true);
        }}
      />
      <PaymentSuccessModal
        isOpen={isPaymentSuccessOpen}
        onClose={() => setIsPaymentSuccessOpen(false)}
        summary={paymentSummary}
        totalDeposited={totalDeposited}
        remaining={escrow.inEscrow - (paymentSummary?.total ?? 0)}
        requestForms={requestForms}
        groupPath={`/escrow/${id}`}
      />
      <AcceptAppointmentModal
        isOpen={isAcceptOpen}
        onClose={() => setIsAcceptOpen(false)}
        onAccept={() => {
          setAppointmentAccepted(true);
          setIsAcceptOpen(false);
        }}
        appointedBy="David Mensah"
      />
      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAdd={addMember}
      />
      <RaiseRequestModal
        isOpen={isRaiseRequestOpen}
        onClose={() => setIsRaiseRequestOpen(false)}
        onAdd={addRequest}
      />
      <GroupActivityModal
        isOpen={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
        messages={escrowChat}
        forms={escrowFormRecords}
      />
      <ShareReportModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        reportPath={reportPath}
        onExport={() => window.print()}
      />
    </main>
  );
}
