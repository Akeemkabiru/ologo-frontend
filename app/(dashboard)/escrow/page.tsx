"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Search,
  Plus,
  Briefcase,
  Home,
  Car,
  Wrench,
  Package,
  Laptop,
  Globe,
  Scale,
  Building2,
  Handshake,
  ChevronLeft,
  ChevronRight,
  Lock,
} from "lucide-react";
import { EmptyState } from "@/components/cards/CardComponents";
import FundingCard from "@/components/cards/FundingCard";
import ViewToggle, { type ViewMode } from "@/components/ui/ViewToggle";
import CreateEscrowModal from "@/components/escrow/CreateEscrowModal";
import { escrows } from "@/data/escrows";

const MOBILE_VISIBLE_CATEGORIES = 5;

const categories = [
  { label: "Freelance", icon: Briefcase, href: "/escrow?category=freelance" },
  { label: "Real Estate", icon: Home, href: "/escrow?category=real-estate" },
  { label: "Vehicles", icon: Car, href: "/escrow?category=vehicles" },
  { label: "Services", icon: Wrench, href: "/escrow?category=services" },
  { label: "Goods", icon: Package, href: "/escrow?category=goods" },
  { label: "Digital", icon: Laptop, href: "/escrow?category=digital" },
  { label: "Domains", icon: Globe, href: "/escrow?category=domains" },
  { label: "Legal", icon: Scale, href: "/escrow?category=legal" },
  { label: "Rentals", icon: Building2, href: "/escrow?category=rentals" },
  { label: "Milestone", icon: Handshake, href: "/escrow?category=milestone" },
];

const escrowFilters: {
  label: string;
  value: "mine" | "private" | "public";
}[] = [
  { label: "My Escrows", value: "mine" },
  { label: "Private Escrows", value: "private" },
  { label: "Public Escrows", value: "public" },
];

const escrowTabs: {
  label: string;
  value: "in-progress" | "finished" | "upcoming";
}[] = [
  { label: "In Progress", value: "in-progress" },
  { label: "Finished", value: "finished" },
  { label: "Upcoming", value: "upcoming" },
];

const PAGE_SIZE = 6;

export default function EscrowPage() {
  const [activeFilter, setActiveFilter] = useState<
    "mine" | "private" | "public"
  >("mine");
  const [activeTab, setActiveTab] = useState<
    "in-progress" | "finished" | "upcoming"
  >("in-progress");
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [view, setView] = useState<ViewMode>("grid");

  const filteredEscrows = useMemo(
    () =>
      escrows.filter(
        (escrow) =>
          escrow.visibility === activeFilter && escrow.status === activeTab,
      ),
    [activeFilter, activeTab],
  );

  const totalPages = Math.max(1, Math.ceil(filteredEscrows.length / PAGE_SIZE));
  const paginatedEscrows = filteredEscrows.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [activeFilter, activeTab]);

  const goToPage = (nextPage: number) => {
    setDirection(nextPage > page ? 1 : -1);
    setPage(nextPage);
  };

  return (
    <main className="min-h-screen pb-8">
      {/* Desktop-only page title + Create Escrow, in line */}
      <div className="hidden md:flex md:items-center md:justify-between mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Escrow</h1>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-3 rounded-full shrink-0 transition-colors shadow-sm"
        >
          <Plus size={16} />
          Create Escrow
        </button>
      </div>

      <div className="mb-6">
        {/* Header - full bleed on mobile, contained card on desktop */}
        <div className="bg-linear-to-br from-violet-600 to-violet-800 -mt-6 relative left-1/2 -translate-x-1/2 w-screen rounded-b-[32px] md:static md:left-auto md:translate-x-0 md:w-full md:mt-0 md:rounded-2xl px-5 py-6 md:py-6 text-white">
          {/* Top row - mobile only */}
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

          {/* Categories */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-violet-50">Categories</p>
            <button
              onClick={() => setShowAllCategories((prev) => !prev)}
              className="md:hidden text-xs text-violet-200 font-medium"
            >
              {showAllCategories ? "Show Less" : "See All"}
            </button>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-4 md:justify-items-center">
            {categories.map((category, idx) => (
              <Link
                key={category.label}
                href={category.href}
                className={`${
                  idx >= MOBILE_VISIBLE_CATEGORIES && !showAllCategories
                    ? "hidden"
                    : "block"
                } md:block`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center">
                    <category.icon size={17} />
                  </span>
                  <span className="text-[10px] font-medium text-violet-100 text-center leading-tight">
                    {category.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative px-5 md:px-0 pt-6 pb-8">
          {/* Search */}
          <div className="relative mb-5 md:mb-6">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search escrows..."
              className="w-full bg-white rounded-full pl-10 pr-4 py-3 text-sm shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>

          {/* Mobile: visibility filter */}
          <div className="md:hidden">
            <p className="text-[13px] font-semibold text-gray-900 mb-2">Show</p>
            <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none">
              {escrowFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                    activeFilter === filter.value
                      ? "bg-violet-600 text-white"
                      : "bg-violet-100/70 text-violet-400"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Escrows heading + view toggle */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-[15px] md:text-lg">
              Escrows
            </h3>
            <ViewToggle value={view} onChange={setView} />
          </div>

          {/* Mobile: status tabs */}
          <div className="md:hidden flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
            {escrowTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  activeTab === tab.value
                    ? "bg-white shadow-sm text-gray-900 border border-gray-100"
                    : "text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Desktop: visibility filter + status tabs, in line */}
          <div className="hidden md:flex md:items-center md:justify-between mb-6">
            <div className="flex gap-2">
              {escrowFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                    activeFilter === filter.value
                      ? "bg-violet-600 text-white"
                      : "bg-violet-100/70 text-violet-400"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {escrowTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                    activeTab === tab.value
                      ? "bg-white shadow-sm text-gray-900 border border-gray-100"
                      : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Escrow cards */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeFilter}-${activeTab}-${page}-${view}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {paginatedEscrows.length > 0 ? (
                <div
                  className={
                    view === "grid"
                      ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {paginatedEscrows.map((escrow) => (
                    <FundingCard
                      key={escrow.id}
                      view={view}
                      item={{
                        id: escrow.id,
                        name: escrow.name,
                        verified: escrow.verified,
                        image: escrow.image,
                        emoji: "🔒",
                        deadlineLabel: "Release deadline",
                        deadline: escrow.releaseDeadline,
                        amountLabel: "In Escrow",
                        amount: escrow.inEscrow,
                        goal: escrow.total,
                        daysLeft: escrow.daysLeft,
                        avatars: escrow.parties,
                        countText: `${escrow.partyCount} parties`,
                        actionLabel: "View",
                        href: `/escrow/${escrow.id}`,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Lock size={48} />}
                  title="No Escrows Found"
                  description="No escrow agreements match this filter yet."
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => goToPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-violet-600 hover:border-violet-200 disabled:opacity-40 disabled:hover:text-gray-500 disabled:hover:border-gray-100 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-200 ${
                      page === pageNum
                        ? "bg-violet-600 text-white shadow-sm scale-105"
                        : "bg-white text-gray-600 border border-gray-100 hover:border-violet-200 hover:text-violet-600"
                    }`}
                  >
                    {pageNum}
                  </button>
                ),
              )}

              <button
                onClick={() => goToPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-violet-600 hover:border-violet-200 disabled:opacity-40 disabled:hover:text-gray-500 disabled:hover:border-gray-100 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <CreateEscrowModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </main>
  );
}
