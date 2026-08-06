"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Search,
  Plus,
  HeartPulse,
  HandHeart,
  GraduationCap,
  UtensilsCrossed,
  Users,
  ChevronLeft,
  ChevronRight,
  Calendar,
  PawPrint,
  Leaf,
  LifeBuoy,
  Trophy,
  Building2,
} from "lucide-react";
import { EmptyState } from "@/components/cards/CardComponents";
import FundingCard from "@/components/cards/FundingCard";
import ViewToggle, { type ViewMode } from "@/components/ui/ViewToggle";
import CreateEventModal from "@/components/events/CreateEventModal";
import { events } from "@/data/events";

const MOBILE_VISIBLE_CATEGORIES = 5;

const categories = [
  { label: "Medical", icon: HeartPulse, href: "/events?category=medical" },
  { label: "Charity", icon: HandHeart, href: "/events?category=charity" },
  {
    label: "Education",
    icon: GraduationCap,
    href: "/events?category=education",
  },
  { label: "Food", icon: UtensilsCrossed, href: "/events?category=food" },
  { label: "Social", icon: Users, href: "/events?category=social" },
  { label: "Animals", icon: PawPrint, href: "/events?category=animals" },
  {
    label: "Environment",
    icon: Leaf,
    href: "/events?category=environment",
  },
  {
    label: "Disaster Relief",
    icon: LifeBuoy,
    href: "/events?category=disaster-relief",
  },
  { label: "Sports", icon: Trophy, href: "/events?category=sports" },
  {
    label: "Community",
    icon: Building2,
    href: "/events?category=community",
  },
];

const eventFilters: { label: string; value: "mine" | "private" | "public" }[] =
  [
    { label: "My Events", value: "mine" },
    { label: "Private Events", value: "private" },
    { label: "Public Events", value: "public" },
  ];

const eventTabs: {
  label: string;
  value: "in-progress" | "finished" | "upcoming";
}[] = [
  { label: "In Progress", value: "in-progress" },
  { label: "Finished", value: "finished" },
  { label: "Upcoming", value: "upcoming" },
];


const PAGE_SIZE = 6;

export default function EventsPage() {
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

  const filteredEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          event.visibility === activeFilter && event.status === activeTab,
      ),
    [activeFilter, activeTab],
  );

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE));
  const paginatedEvents = filteredEvents.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  // Reset to page 1 whenever the active filter/tab changes.
  useEffect(() => {
    setPage(1);
  }, [activeFilter, activeTab]);

  const goToPage = (nextPage: number) => {
    setDirection(nextPage > page ? 1 : -1);
    setPage(nextPage);
  };

  return (
    <main className="min-h-screen pb-8">
      {/* Desktop-only page title + Create Event, in line */}
      <div className="hidden md:flex md:items-center md:justify-between mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Events</h1>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-3 rounded-full shrink-0 transition-colors shadow-sm"
        >
          <Plus size={16} />
          Create Event
        </button>
      </div>

      <div className="mb-6">
        {/* Header - full bleed on mobile, contained card on desktop */}
        <div className="bg-linear-to-br from-violet-600 to-violet-800 -mt-6 relative left-1/2 -translate-x-1/2 w-screen rounded-b-[32px] md:static md:left-auto md:translate-x-0 md:w-full md:mt-0 md:rounded-2xl px-5 py-6 md:py-6 text-white">
          {/* Top row - mobile only, desktop already has profile/notifications in the fixed header */}
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
              placeholder="Search..."
              className="w-full bg-white rounded-full pl-10 pr-4 py-3 text-sm shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>

          {/* Mobile: visibility filter */}
          <div className="md:hidden">
            <p className="text-[13px] font-semibold text-gray-900 mb-2">Show</p>
            <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none">
              {eventFilters.map((filter) => (
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

          {/* Events heading */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-[15px] md:text-lg">
              Events
            </h3>
            <ViewToggle value={view} onChange={setView} />
          </div>

          {/* Mobile: status tabs */}
          <div className="md:hidden flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
            {eventTabs.map((tab) => (
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
              {eventFilters.map((filter) => (
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
              {eventTabs.map((tab) => (
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

          {/* Event cards */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeFilter}-${activeTab}-${page}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {paginatedEvents.length > 0 ? (
                <div
                  className={
                    view === "grid"
                      ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {paginatedEvents.map((event) => (
                    <FundingCard
                      key={event.id}
                      view={view}
                      item={{
                        id: event.id,
                        name: event.name,
                        verified: event.verified,
                        image: event.image,
                        emoji: "🐾",
                        deadlineLabel: "Deposit deadline",
                        deadline: event.depositDeadline,
                        amountLabel: "Current",
                        amount: event.current,
                        goal: event.goal,
                        daysLeft: event.daysLeft,
                        avatars: event.donors,
                        countText:
                          event.donorCount > 0
                            ? `+${event.donorCount} people donated`
                            : undefined,
                        actionLabel: "Donate",
                        href: `/events/${event.id}`,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Calendar size={48} />}
                  title="No Events Found"
                  description="No events match this filter yet."
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

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </main>
  );
}
