"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Handshake,
  Plus,
  Repeat,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import MobileHeader from "@/components/ui/MobileHeader";
import ViewToggle, { type ViewMode } from "@/components/ui/ViewToggle";
import PledgeModal from "@/components/pledges/PledgeModal";
import { myPledges, type MyPledge } from "@/data/myPledges";

const filters: { label: string; value: "all" | "one-time" | "recurring" }[] = [
  { label: "All", value: "all" },
  { label: "One-time", value: "one-time" },
  { label: "Recurring", value: "recurring" },
];

const statusStyles: Record<MyPledge["status"], string> = {
  active: "bg-emerald-100 text-emerald-700",
  fulfilled: "bg-violet-100 text-violet-700",
  upcoming: "bg-amber-100 text-amber-700",
};

const PAGE_SIZE = 6;

export default function PledgesPage() {
  const [pledges, setPledges] = useState<MyPledge[]>(myPledges);
  const [filter, setFilter] = useState<"all" | "one-time" | "recurring">("all");
  const [view, setView] = useState<ViewMode>("list");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = useMemo(
    () =>
      filter === "all" ? pledges : pledges.filter((p) => p.type === filter),
    [filter, pledges],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const activeCount = pledges.filter((p) => p.status === "active").length;
  const recurringCount = pledges.filter((p) => p.type === "recurring").length;

  const stats = [
    { label: "Total Pledges", value: String(pledges.length) },
    { label: "Active", value: String(activeCount) },
    { label: "Recurring", value: String(recurringCount) },
  ];

  return (
    <main className="min-h-screen pb-8">
      <MobileHeader
        title="Pledges"
        subtitle="Commit to causes with performance-based pledges"
        rightSlot={
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0"
            aria-label="Make a pledge"
          >
            <Plus size={18} />
          </button>
        }
      />

      <div className="px-4 sm:px-6 md:px-8 pt-6 md:pt-0">
        {/* Desktop header */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Pledges
            </h1>
            <p className="text-gray-600 mt-1">
              Commit to causes with performance-based pledges
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors shadow-sm"
          >
            <Plus size={16} />
            Make a Pledge
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5"
            >
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters + view toggle */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filter === f.value
                    ? "bg-violet-600 text-white"
                    : "bg-violet-100/70 text-violet-500 hover:bg-violet-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <ViewToggle value={view} onChange={setView} />
        </div>

        {/* List / grid */}
        {paginated.length > 0 ? (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                : "flex flex-col gap-3"
            }
          >
            {paginated.map((p) => (
              <PledgeCard key={p.id} item={p} view={view} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Handshake size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No pledges in this filter.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-violet-600 hover:border-violet-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-200 ${
                  page === num
                    ? "bg-violet-600 text-white shadow-sm scale-105"
                    : "bg-white text-gray-600 border border-gray-100 hover:border-violet-200 hover:text-violet-600"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-violet-600 hover:border-violet-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <PledgeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={(pledge) => setPledges((prev) => [pledge, ...prev])}
      />
    </main>
  );
}

function TypeBadge({ item }: { item: MyPledge }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
        item.type === "recurring"
          ? "bg-amber-100 text-amber-700"
          : "bg-violet-100 text-violet-700"
      }`}
    >
      {item.type === "recurring" && <Repeat size={11} />}
      {item.type === "recurring" ? item.frequency ?? "Recurring" : "One-time"}
    </span>
  );
}

function ViewButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      className={`neon-purple flex items-center gap-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-all shrink-0 active:scale-95 ${className}`}
    >
      View
      <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center">
        <ChevronRight size={10} />
      </span>
    </button>
  );
}

function PledgeCard({ item, view }: { item: MyPledge; view: ViewMode }) {
  const statusChip = (
    <span
      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyles[item.status]}`}
    >
      {item.status}
    </span>
  );

  if (view === "list") {
    return (
      <div className="flex items-start gap-3 p-4 rounded-2xl border border-gray-100 bg-white">
        <span className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
          <Handshake size={18} className="text-violet-600" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <TypeBadge item={item} />
            {statusChip}
            {item.anonymous && (
              <span className="text-[11px] text-gray-400">· Anonymous</span>
            )}
          </div>
          <p className="text-sm text-gray-800">{item.description}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
            <CalendarClock size={13} />
            Performance: {item.performanceDate}
          </div>
        </div>
        <ViewButton className="mt-3 self-end" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
          <Handshake size={18} className="text-violet-600" />
        </span>
        {statusChip}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <TypeBadge item={item} />
        {item.anonymous && (
          <span className="text-[11px] text-gray-400">Anonymous</span>
        )}
      </div>
      <p className="text-sm text-gray-800 flex-1">{item.description}</p>
      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
        <CalendarClock size={13} />
        {item.performanceDate}
      </div>
      <ViewButton className="mt-4 self-end" />
    </div>
  );
}
