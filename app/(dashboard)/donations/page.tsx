"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Gift, Repeat, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import MobileHeader from "@/components/ui/MobileHeader";
import ViewToggle, { type ViewMode } from "@/components/ui/ViewToggle";
import { formatCurrency } from "@/lib/utils";
import { myDonations, type MyDonation } from "@/data/myDonations";

const filters: { label: string; value: "all" | "one-time" | "recurring" }[] = [
  { label: "All", value: "all" },
  { label: "One-time", value: "one-time" },
  { label: "Recurring", value: "recurring" },
];

const PAGE_SIZE = 6;

export default function DonationsPage() {
  const [filter, setFilter] = useState<"all" | "one-time" | "recurring">("all");
  const [view, setView] = useState<ViewMode>("list");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? myDonations
        : myDonations.filter((d) => d.type === filter),
    [filter],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const totalDonated = myDonations
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + d.amount, 0);
  const campaigns = new Set(myDonations.map((d) => d.eventId)).size;
  const recurringCount = myDonations.filter(
    (d) => d.type === "recurring",
  ).length;

  const stats = [
    { label: "Total Donated", value: formatCurrency(totalDonated, "USD") },
    { label: "Campaigns", value: String(campaigns) },
    { label: "Active Recurring", value: String(recurringCount) },
  ];

  return (
    <main className="min-h-screen pb-8">
      <MobileHeader
        title="Donations"
        subtitle="Everything you've given"
        rightSlot={
          <Link href="/events">
            <button
              className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0"
              aria-label="Browse campaigns"
            >
              <Heart size={18} />
            </button>
          </Link>
        }
      />

      <div className="px-4 sm:px-6 md:px-8 pt-6 md:pt-0">
        {/* Desktop header */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Donations
            </h1>
            <p className="text-gray-600 mt-1">Track everything you&apos;ve given</p>
          </div>
          <Link href="/events">
            <button className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors shadow-sm">
              <Heart size={16} />
              Browse campaigns
            </button>
          </Link>
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
            {paginated.map((d) => (
              <DonationCard key={d.id} item={d} view={view} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Gift size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No donations in this filter.</p>
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
    </main>
  );
}

function TypeBadge({ item }: { item: MyDonation }) {
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

function DonationCard({ item, view }: { item: MyDonation; view: ViewMode }) {
  const amount = (
    <span className="text-base font-bold text-violet-600 whitespace-nowrap">
      {formatCurrency(item.amount, item.currency)}
    </span>
  );

  if (view === "list") {
    return (
      <Link href={`/events/${item.eventId}`} className="block">
        <div className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 bg-white hover:border-violet-200 transition-colors">
          <img
            src={item.image}
            alt={item.eventName}
            className="w-14 h-14 rounded-xl object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {item.eventName}
            </p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <TypeBadge item={item} />
              <span className="text-xs text-gray-400">{item.date}</span>
              {item.anonymous && (
                <span className="text-[11px] text-gray-400">· Anonymous</span>
              )}
            </div>
            {item.note && (
              <p className="text-xs text-gray-500 mt-1 truncate">{item.note}</p>
            )}
          </div>
          <div className="text-right shrink-0">
            {amount}
            <p
              className={`text-[11px] mt-0.5 capitalize ${
                item.status === "scheduled"
                  ? "text-amber-600"
                  : "text-emerald-600"
              }`}
            >
              {item.status}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/events/${item.eventId}`} className="block h-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full hover:border-violet-200 transition-colors">
        <img
          src={item.image}
          alt={item.eventName}
          className="w-full h-28 object-cover"
        />
        <div className="p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <TypeBadge item={item} />
            <span
              className={`text-[11px] font-medium capitalize ${
                item.status === "scheduled"
                  ? "text-amber-600"
                  : "text-emerald-600"
              }`}
            >
              {item.status}
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-900 truncate">
            {item.eventName}
          </p>
          <div className="flex items-center justify-between mt-2">
            {amount}
            <span className="text-xs text-gray-400 inline-flex items-center gap-0.5">
              View
              <ChevronRight size={13} />
            </span>
          </div>
          {item.note && (
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">
              {item.note}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
