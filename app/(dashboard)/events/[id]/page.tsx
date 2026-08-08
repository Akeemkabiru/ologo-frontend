"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  User,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  Lock,
} from "lucide-react";
import MobileHeader from "@/components/ui/MobileHeader";
import { formatCurrency } from "@/lib/utils";
import DonateModal from "@/components/events/DonateModal";
import CreateEscrowModal from "@/components/escrow/CreateEscrowModal";
import ViewToggle, { type ViewMode } from "@/components/ui/ViewToggle";
import ContributionCard from "@/components/events/ContributionCard";
import { getEventById } from "@/data/events";
import { contributions, type ContributionType } from "@/data/contributions";

const contributionFilters: { label: string; value: "all" | ContributionType }[] =
  [
    { label: "All", value: "all" },
    { label: "Donations", value: "donation" },
    { label: "Notes", value: "note" },
    { label: "Pledges", value: "pledge" },
    { label: "Reviews", value: "review" },
  ];

const CONTRIB_PAGE_SIZE = 6;

const fallbackEvent = {
  name: "Shelter Support for Homeless in NYC",
  verified: true,
  image:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
  currency: "USD",
  amountRaised: 40000,
  goal: 80000,
  timeLeft: "19h left",
  donorCount: 120,
  totalDonations: 12,
  donorAvatars: [
    "https://i.pravatar.cc/64?img=11",
    "https://i.pravatar.cc/64?img=12",
    "https://i.pravatar.cc/64?img=13",
  ],
  description:
    "This campaign aims to provide warm clothing, food, and shelter assistance to the homeless population in New York City as winter approaches. Funds will go toward temporary housing solutions, essential supplies, and outreach programs to connect individuals with long-term support services.",
};

const mockDonations = [
  {
    id: "1",
    donorName: "Anonymous",
    amount: 100,
    timeAgo: new Date().getDate(),
    note: "Wishing you all the best with the shelter drive, keep up the great work!",
  },
  {
    id: "2",
    donorName: "Anonymous",
    amount: 250,
    timeAgo: new Date().getDate(),
    note: "Glad to help however I can this winter.",
  },
  {
    id: "3",
    donorName: "Michael Owens",
    amount: 100,
    timeAgo: new Date().getDate(),
    note: "Every bit counts. Stay strong, New York.",
  },
];

const developmentUpdates = [
  {
    id: "1",
    date: "December 20, 2024",
    title: "Winter Coat Distribution",
    description:
      "Thanks to your generous donations, we've distributed over 300 winter coats and thermal blankets across three outreach sites. The response from the community has been overwhelming, and we're on track to reach our full distribution goal by mid-January.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop",
  },
  {
    id: "2",
    date: "November 8, 2024",
    title: "Shelter Capacity Expansion",
    description:
      "We've secured an additional 40 beds at our partner shelter, allowing us to house more individuals during the coldest months. Funds raised have also covered essential kitchen upgrades to serve hot meals daily.",
    image:
      "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&h=500&fit=crop",
  },
];

const fundDetails = {
  disbursed: 28000,
  pending: 12000,
  breakdown: [
    {
      date: "December 20, 2024",
      purpose: "Winter supplies and outreach",
      withdraw: 24000,
      platformFee: 480,
    },
    {
      date: "November 8, 2024",
      purpose: "Shelter bed expansion",
      withdraw: 4000,
      platformFee: 80,
    },
  ],
};

const tabs = [
  { label: "About", value: "about" },
  { label: "Donations", value: "donations" },
  { label: "Updates", value: "development" },
  { label: "Fund Details", value: "fund-details" },
] as const;

type TabValue = (typeof tabs)[number]["value"];

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const listEvent = getEventById(id);

  const event = {
    ...fallbackEvent,
    ...(listEvent && {
      name: listEvent.name,
      verified: listEvent.verified,
      image: listEvent.image,
      amountRaised: listEvent.current,
      goal: listEvent.goal,
      timeLeft: `${listEvent.daysLeft} days left`,
      donorCount: listEvent.donorCount,
      donorAvatars:
        listEvent.donors.length > 0
          ? listEvent.donors
          : fallbackEvent.donorAvatars,
    }),
  };

  const [activeTab, setActiveTab] = useState<TabValue>("about");
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState(false);

  const [contribFilter, setContribFilter] = useState<"all" | ContributionType>(
    "all",
  );
  const [contribView, setContribView] = useState<ViewMode>("list");
  const [contribPage, setContribPage] = useState(1);

  const filteredContributions = useMemo(
    () =>
      contribFilter === "all"
        ? contributions
        : contributions.filter((c) => c.type === contribFilter),
    [contribFilter],
  );
  const contribTotalPages = Math.max(
    1,
    Math.ceil(filteredContributions.length / CONTRIB_PAGE_SIZE),
  );
  const paginatedContributions = filteredContributions.slice(
    (contribPage - 1) * CONTRIB_PAGE_SIZE,
    contribPage * CONTRIB_PAGE_SIZE,
  );

  useEffect(() => {
    setContribPage(1);
  }, [contribFilter]);

  const progress = Math.round((event.amountRaised / event.goal) * 100);

  return (
    <main className="min-h-screen pb-32 md:pb-8">
      <MobileHeader
        title="Fundraising"
        showBack
        backHref="/events"
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
            href="/events"
            className="text-violet-600 hover:text-violet-700 font-semibold flex items-center gap-2 w-fit"
          >
            <ArrowLeft size={18} />
            Back to Events
          </Link>
        </div>

        <div className="md:grid md:grid-cols-3 md:gap-8 md:items-start">
          {/* Main column */}
          <div className="md:col-span-2">
            {/* Hero image */}
            <div className="mb-5 md:mb-6 rounded-2xl overflow-hidden">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-56 md:h-80 object-cover"
              />
            </div>

            {event.verified && (
              <div className="flex items-center gap-1.5 mb-3">
                <CheckCircle2 size={16} className="text-violet-600" />
                <span className="text-sm font-medium text-violet-600">
                  This campaign is verified
                </span>
              </div>
            )}

            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
              {event.name}
            </h1>

            {/* Raised / Target */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Raised</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(event.amountRaised, event.currency)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-0.5">Target</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(event.goal, event.currency)}
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
                {progress}% target reached
              </span>
              <span className="text-xs text-gray-500">
                {event.timeLeft}
              </span>
            </div>

            {/* Donor avatars */}
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200">
              <div className="flex -space-x-2">
                {event.donorAvatars.map((avatar, idx) => (
                  <img
                    key={idx}
                    src={avatar}
                    alt=""
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {event.donorCount}+ People Donated
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

            {/* Tab content */}
            {activeTab === "about" && (
              <div>
                <p className="text-gray-700 leading-relaxed mb-8">
                  {event.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">
                    Donators ({event.totalDonations})
                  </h3>
                  <button className="text-xs text-violet-600 font-medium">
                    See All
                  </button>
                </div>
                <div>
                  {mockDonations.map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                        <User size={18} className="text-violet-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900">
                            {donation.donorName}
                          </p>
                          <span className="text-xs text-gray-400 shrink-0">
                            {donation.timeAgo}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-violet-600 mt-0.5">
                          ${donation.amount} donation
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {donation.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "donations" && (
              <div>
                {/* Filter + view toggle */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {contributionFilters.map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => setContribFilter(filter.value)}
                        className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          contribFilter === filter.value
                            ? "bg-violet-600 text-white"
                            : "bg-violet-100/70 text-violet-500 hover:bg-violet-100"
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  <ViewToggle value={contribView} onChange={setContribView} />
                </div>

                {paginatedContributions.length > 0 ? (
                  <div
                    className={
                      contribView === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
                        : "flex flex-col gap-3"
                    }
                  >
                    {paginatedContributions.map((item) => (
                      <ContributionCard
                        key={item.id}
                        item={item}
                        view={contribView}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-sm text-gray-400 py-10">
                    Nothing here yet.
                  </p>
                )}

                {/* Pagination */}
                {contribTotalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                      onClick={() =>
                        setContribPage((p) => Math.max(1, p - 1))
                      }
                      disabled={contribPage === 1}
                      className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-violet-600 hover:border-violet-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {Array.from(
                      { length: contribTotalPages },
                      (_, i) => i + 1,
                    ).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setContribPage(pageNum)}
                        className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-200 ${
                          contribPage === pageNum
                            ? "bg-violet-600 text-white shadow-sm scale-105"
                            : "bg-white text-gray-600 border border-gray-100 hover:border-violet-200 hover:text-violet-600"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setContribPage((p) =>
                          Math.min(contribTotalPages, p + 1),
                        )
                      }
                      disabled={contribPage === contribTotalPages}
                      className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-violet-600 hover:border-violet-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "development" && (
              <div className="space-y-8">
                {developmentUpdates.map((update) => (
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

            {activeTab === "fund-details" && (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-violet-50 rounded-xl p-4">
                    <p className="text-xs text-violet-600 font-medium mb-1 flex items-center gap-1">
                      <ArrowDownRight size={14} />
                      Has been disbursed
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(
                        fundDetails.disbursed,
                        event.currency,
                      )}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                      <ArrowUpRight size={14} />
                      Not yet disbursed
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(fundDetails.pending, event.currency)}
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
                          <span className="text-gray-500">Withdraw</span>
                          <span className="text-gray-900 font-medium">
                            {formatCurrency(entry.withdraw, event.currency)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Platform fee</span>
                          <span className="text-gray-900 font-medium">
                            {formatCurrency(
                              entry.platformFee,
                              event.currency,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-gray-100 pt-1 mt-1">
                          <span className="text-gray-700 font-semibold">
                            Total
                          </span>
                          <span className="text-violet-600 font-bold">
                            {formatCurrency(
                              entry.withdraw + entry.platformFee,
                              event.currency,
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
                    Progress
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
                  <span className="text-gray-600">Raised</span>
                  <span className="font-bold text-violet-600">
                    {formatCurrency(event.amountRaised, event.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target</span>
                  <span className="font-bold text-gray-900">
                    {formatCurrency(event.goal, event.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Donors</span>
                  <span className="font-bold text-gray-900">
                    {event.donorCount}+
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Left</span>
                  <span className="font-bold text-gray-900">
                    {event.timeLeft}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex -space-x-2">
                  {event.donorAvatars.map((avatar, idx) => (
                    <img
                      key={idx}
                      src={avatar}
                      alt=""
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {event.donorCount}+ People Donated
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsDonateModalOpen(true)}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-full py-3.5 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 mb-3"
              >
                Donate Now
              </button>
              <button
                type="button"
                onClick={() => setIsEscrowModalOpen(true)}
                className="w-full bg-white border border-violet-200 text-violet-600 hover:bg-violet-50 font-semibold rounded-full py-3.5 transition-all duration-200 active:scale-95 inline-flex items-center justify-center gap-2"
              >
                <Lock size={16} />
                Set up Escrow
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky Donate Now */}
      <div className="md:hidden fixed bottom-24 inset-x-0 px-5 z-30">
        <button
          type="button"
          onClick={() => setIsDonateModalOpen(true)}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-full py-4 shadow-lg transition-all duration-200 active:scale-95"
        >
          Donate Now
        </button>
      </div>

      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        eventName={event.name}
        hostCurrency={event.currency}
      />
      <CreateEscrowModal
        isOpen={isEscrowModalOpen}
        onClose={() => setIsEscrowModalOpen(false)}
        presetEventId={id}
      />
    </main>
  );
}
