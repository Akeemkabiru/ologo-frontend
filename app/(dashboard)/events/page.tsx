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
  Clock,
  CheckCircle2,
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
import CreateEventModal from "@/components/events/CreateEventModal";

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

interface EventItem {
  id: string;
  name: string;
  verified: boolean;
  image: string;
  depositDeadline: string;
  requestTime: string;
  current: number;
  goal: number;
  daysLeft: number;
  donorCount: number;
  donors: string[];
  visibility: "mine" | "private" | "public";
  status: "in-progress" | "finished" | "upcoming";
}

const events: EventItem[] = [
  {
    id: "1",
    name: "Ohayo Animal Shelter",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=400&fit=crop",
    depositDeadline: "12 Dec 2026, 01:00am",
    requestTime: "02 Dec 2026, 01:00am",
    current: 24991.6,
    goal: 35000,
    daysLeft: 142,
    donorCount: 139,
    donors: [
      "https://i.pravatar.cc/64?img=21",
      "https://i.pravatar.cc/64?img=22",
      "https://i.pravatar.cc/64?img=23",
    ],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "2",
    name: "Bright Future Foundation",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    depositDeadline: "18 Jan 2027, 09:00am",
    requestTime: "05 Jan 2027, 09:00am",
    current: 12480,
    goal: 20000,
    daysLeft: 63,
    donorCount: 82,
    donors: [
      "https://i.pravatar.cc/64?img=31",
      "https://i.pravatar.cc/64?img=32",
      "https://i.pravatar.cc/64?img=33",
    ],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "3",
    name: "Green Earth Initiative",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    depositDeadline: "30 Nov 2026, 06:00pm",
    requestTime: "15 Nov 2026, 06:00pm",
    current: 5230.5,
    goal: 15000,
    daysLeft: 28,
    donorCount: 47,
    donors: [
      "https://i.pravatar.cc/64?img=41",
      "https://i.pravatar.cc/64?img=42",
    ],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "3b",
    name: "Riverside Cleanup Crew",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&h=400&fit=crop",
    depositDeadline: "08 Jan 2027, 04:00pm",
    requestTime: "22 Dec 2026, 04:00pm",
    current: 9800,
    goal: 16000,
    daysLeft: 74,
    donorCount: 61,
    donors: [
      "https://i.pravatar.cc/64?img=43",
      "https://i.pravatar.cc/64?img=44",
    ],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "3c",
    name: "Paws & Claws Rescue",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop",
    depositDeadline: "21 Feb 2027, 10:00am",
    requestTime: "05 Feb 2027, 10:00am",
    current: 3100,
    goal: 9000,
    daysLeft: 118,
    donorCount: 22,
    donors: ["https://i.pravatar.cc/64?img=45"],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "3d",
    name: "Hope Housing Project",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    depositDeadline: "16 Mar 2027, 09:00am",
    requestTime: "01 Mar 2027, 09:00am",
    current: 15400,
    goal: 30000,
    daysLeft: 156,
    donorCount: 97,
    donors: [
      "https://i.pravatar.cc/64?img=46",
      "https://i.pravatar.cc/64?img=47",
    ],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "3e",
    name: "Little Sprouts Nursery Fund",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
    depositDeadline: "29 Apr 2027, 12:00pm",
    requestTime: "12 Apr 2027, 12:00pm",
    current: 2200,
    goal: 7000,
    daysLeft: 199,
    donorCount: 14,
    donors: ["https://i.pravatar.cc/64?img=48"],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "4",
    name: "Clean Water Project",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&h=400&fit=crop",
    depositDeadline: "04 Jun 2026, 10:00am",
    requestTime: "20 May 2026, 10:00am",
    current: 18000,
    goal: 18000,
    daysLeft: 0,
    donorCount: 210,
    donors: [
      "https://i.pravatar.cc/64?img=51",
      "https://i.pravatar.cc/64?img=52",
    ],
    visibility: "mine",
    status: "finished",
  },
  {
    id: "5",
    name: "Winter Coat Drive",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1608889175638-9e0d7e5e9e0c?w=600&h=400&fit=crop",
    depositDeadline: "10 Feb 2027, 08:00am",
    requestTime: "01 Feb 2027, 08:00am",
    current: 0,
    goal: 8000,
    daysLeft: 210,
    donorCount: 0,
    donors: [],
    visibility: "mine",
    status: "upcoming",
  },
  {
    id: "6",
    name: "Downtown Food Bank",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=600&h=400&fit=crop",
    depositDeadline: "22 Dec 2026, 02:00pm",
    requestTime: "10 Dec 2026, 02:00pm",
    current: 9420,
    goal: 12000,
    daysLeft: 55,
    donorCount: 64,
    donors: [
      "https://i.pravatar.cc/64?img=61",
      "https://i.pravatar.cc/64?img=62",
    ],
    visibility: "private",
    status: "in-progress",
  },
  {
    id: "7",
    name: "Neighborhood Watch Fund",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
    depositDeadline: "05 Sep 2026, 11:00am",
    requestTime: "20 Aug 2026, 11:00am",
    current: 4000,
    goal: 4000,
    daysLeft: 0,
    donorCount: 31,
    donors: ["https://i.pravatar.cc/64?img=63"],
    visibility: "private",
    status: "finished",
  },
  {
    id: "8",
    name: "School Renovation",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
    depositDeadline: "14 Mar 2027, 09:00am",
    requestTime: "01 Mar 2027, 09:00am",
    current: 0,
    goal: 25000,
    daysLeft: 240,
    donorCount: 0,
    donors: [],
    visibility: "private",
    status: "upcoming",
  },
  {
    id: "9",
    name: "City Marathon Charity",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&h=400&fit=crop",
    depositDeadline: "19 Dec 2026, 07:00am",
    requestTime: "01 Dec 2026, 07:00am",
    current: 31200,
    goal: 40000,
    daysLeft: 98,
    donorCount: 305,
    donors: [
      "https://i.pravatar.cc/64?img=71",
      "https://i.pravatar.cc/64?img=72",
      "https://i.pravatar.cc/64?img=73",
    ],
    visibility: "public",
    status: "in-progress",
  },
  {
    id: "10",
    name: "Senior Care Support",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=600&h=400&fit=crop",
    depositDeadline: "27 Jan 2027, 03:00pm",
    requestTime: "15 Jan 2027, 03:00pm",
    current: 7600,
    goal: 10000,
    daysLeft: 71,
    donorCount: 58,
    donors: [
      "https://i.pravatar.cc/64?img=74",
      "https://i.pravatar.cc/64?img=75",
    ],
    visibility: "public",
    status: "in-progress",
  },
  {
    id: "11",
    name: "Community Garden",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=600&h=400&fit=crop",
    depositDeadline: "11 Aug 2026, 05:00pm",
    requestTime: "30 Jul 2026, 05:00pm",
    current: 6000,
    goal: 6000,
    daysLeft: 0,
    donorCount: 88,
    donors: ["https://i.pravatar.cc/64?img=76"],
    visibility: "public",
    status: "finished",
  },
  {
    id: "12",
    name: "Tech for Teens",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
    depositDeadline: "02 Apr 2027, 01:00pm",
    requestTime: "20 Mar 2027, 01:00pm",
    current: 0,
    goal: 22000,
    daysLeft: 270,
    donorCount: 0,
    donors: [],
    visibility: "public",
    status: "upcoming",
  },
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
          <h3 className="font-semibold text-gray-900 text-[15px] md:text-lg mb-3">
            Events
          </h3>

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
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {paginatedEvents.map((event) => {
                    const progress = Math.round(
                      (event.current / event.goal) * 100,
                    );
                    return (
                      <Link key={event.id} href={`/events/${event.id}`}>
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                          {/* Image with overlay badges */}
                          <div className="relative h-32">
                            <img
                              src={event.image}
                              alt={event.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                            <button className="absolute top-3 right-3 flex items-center gap-1 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold pl-3 pr-2 py-1.5 rounded-full transition-colors">
                              Donate
                              <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center">
                                <Plus size={10} />
                              </span>
                            </button>
                            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                              <div className="flex items-center gap-1">
                                <Clock size={11} />
                                <div>
                                  <p className="opacity-80 leading-tight">
                                    Deposit deadline
                                  </p>
                                  <p className="font-medium leading-tight">
                                    {event.depositDeadline}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-4">
                            <div className="flex items-center gap-1.5 mb-3">
                              <span className="text-base leading-none">🐾</span>
                              <p className="text-sm font-semibold text-gray-900">
                                {event.name}
                              </p>
                              {event.verified && (
                                <CheckCircle2
                                  size={14}
                                  className="text-violet-600"
                                />
                              )}
                            </div>

                            <p className="text-xs text-gray-500 mb-1">
                              Current
                            </p>
                            <p className="text-lg font-bold text-violet-600 mb-3">
                              $
                              {event.current.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })}
                            </p>

                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                              <div
                                className="h-full bg-violet-500 transition-all"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock size={12} />
                                {event.daysLeft} days left
                              </div>
                              {event.donorCount > 0 && (
                                <div className="flex items-center gap-1.5">
                                  <div className="flex -space-x-2">
                                    {event.donors.map((avatar, idx) => (
                                      <img
                                        key={idx}
                                        src={avatar}
                                        alt=""
                                        className="w-5 h-5 rounded-full border-2 border-white object-cover"
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    +{event.donorCount} people donated
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
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
