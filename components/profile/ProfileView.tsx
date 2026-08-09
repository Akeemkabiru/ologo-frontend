"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Copy,
  Check,
  Pencil,
  Star,
  Users,
} from "lucide-react";
import FundingCard from "@/components/cards/FundingCard";
import { formatCurrency } from "@/lib/utils";
import { profileUser, profileEvents, profileReviews } from "@/data/profile";
import { escrows } from "@/data/escrows";
import { mockMemberships } from "@/data/memberships";

type Tab = "events" | "memberships" | "escrows" | "reviews";
type EventFilter = "all" | "public" | "private" | "recurring" | "one-time";

const publicEscrows = escrows
  .filter((e) => e.visibility === "public")
  .slice(0, 4);

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "text-amber-400 fill-amber-400"
              : "text-gray-200 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

export default function ProfileView({
  publicView = false,
}: {
  publicView?: boolean;
}) {
  const [tab, setTab] = useState<Tab>("events");
  const [eventFilter, setEventFilter] = useState<EventFilter>("all");
  const [copied, setCopied] = useState(false);

  const baseEvents = useMemo(
    () =>
      publicView
        ? profileEvents.filter((e) => e.visibility === "public")
        : profileEvents,
    [publicView],
  );

  const filteredEvents = useMemo(() => {
    switch (eventFilter) {
      case "public":
        return baseEvents.filter((e) => e.visibility === "public");
      case "private":
        return baseEvents.filter((e) => e.visibility === "private");
      case "recurring":
        return baseEvents.filter((e) => e.recurring);
      case "one-time":
        return baseEvents.filter((e) => !e.recurring);
      default:
        return baseEvents;
    }
  }, [baseEvents, eventFilter]);

  const avgRating =
    profileReviews.reduce((s, r) => s + r.rating, 0) / profileReviews.length;

  const eventFilters: { label: string; value: EventFilter }[] = [
    { label: "All", value: "all" },
    { label: "Public", value: "public" },
    ...(publicView
      ? []
      : [{ label: "Private", value: "private" as EventFilter }]),
    { label: "Recurring", value: "recurring" },
    { label: "One-time", value: "one-time" },
  ];

  const tabs: { label: string; value: Tab; count: number }[] = [
    { label: "Events", value: "events", count: baseEvents.length },
    {
      label: "Memberships",
      value: "memberships",
      count: mockMemberships.length,
    },
    { label: "Escrows", value: "escrows", count: publicEscrows.length },
    { label: "Reviews", value: "reviews", count: profileReviews.length },
  ];

  const share = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/u/${profileUser.username}`
        : `/u/${profileUser.username}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div>
      {/* Cover + identity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 sm:h-40 relative">
          <img
            src={profileUser.cover}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-5 sm:px-6 pb-5">
          <div className="flex items-end justify-between -mt-14 mb-3">
            <img
              src={profileUser.avatar}
              alt={profileUser.fullName}
              className="relative z-10 w-28 h-28 rounded-2xl border-4 border-white object-cover shadow-md"
            />
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={share}
                className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                  copied
                    ? "bg-emerald-500 text-white"
                    : "bg-violet-600 hover:bg-violet-700 text-white"
                }`}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Link copied" : "Share profile"}
              </button>
              {!publicView && (
                <Link href="/profile/edit">
                  <button className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                    <Pencil size={14} />
                    Edit
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold text-gray-900">
              {profileUser.fullName}
            </h1>
            {profileUser.verified && (
              <BadgeCheck
                size={20}
                className="fill-violet-600 text-white shrink-0"
                aria-label="Verified"
              />
            )}
          </div>
          <p className="text-sm text-gray-500">@{profileUser.username}</p>

          {/* ID + contact */}
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5 font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
              ID: {profileUser.id}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail size={13} />
              {profileUser.email}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone size={13} />
              {profileUser.phone}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} />
              {profileUser.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} />
              Joined {profileUser.joined}
            </span>
          </div>

          {/* About */}
          <p className="text-sm text-gray-700 leading-relaxed mt-4">
            {profileUser.about}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {profileUser.tags.map((t) => (
              <span
                key={t}
                className="text-xs font-medium bg-violet-50 text-violet-700 px-3 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mt-6 mb-5 overflow-x-auto scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`shrink-0 pb-3 text-sm font-semibold border-b-2 transition-colors ${
              tab === t.value
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label} <span className="text-xs text-gray-400">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Events */}
      {tab === "events" && (
        <div>
          <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none">
            {eventFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setEventFilter(f.value)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  eventFilter === f.value
                    ? "bg-violet-600 text-white"
                    : "bg-violet-100/70 text-violet-500 hover:bg-violet-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredEvents.map((e) => (
                <FundingCard
                  key={e.id}
                  view="grid"
                  item={{
                    id: e.id,
                    name: e.name,
                    verified: false,
                    image: e.image,
                    emoji: e.recurring ? "🔁" : "🎯",
                    deadlineLabel:
                      e.visibility === "private" ? "Private" : "Public",
                    deadline: e.recurring ? "Recurring" : "One-time",
                    amountLabel: "Raised",
                    amount: e.current,
                    goal: e.goal,
                    daysLeft: e.daysLeft,
                    avatars: [],
                    actionLabel: "View",
                    href: `/events/${e.id}`,
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-400 py-10">
              No events in this filter.
            </p>
          )}
        </div>
      )}

      {/* Memberships */}
      {tab === "memberships" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockMemberships.map((m) => (
            <Link key={m.id} href={`/memberships/${m.id}`} className="block">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-full hover:border-violet-200 transition-colors">
                <h3 className="text-base font-bold text-gray-900">{m.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1 mb-3">
                  {m.description}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-violet-600">
                    {formatCurrency(m.membershipAmount, m.currency)}
                  </span>
                  <span className="text-sm text-gray-500">/ {m.frequency}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500">
                  <Users size={13} />
                  {m.memberCount} members
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Escrows */}
      {tab === "escrows" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {publicEscrows.map((e) => (
            <FundingCard
              key={e.id}
              view="grid"
              item={{
                id: e.id,
                name: e.name,
                verified: e.verified,
                image: e.image,
                emoji: "🔒",
                deadlineLabel: "Release deadline",
                deadline: e.releaseDeadline,
                amountLabel: "In Escrow",
                amount: e.inEscrow,
                goal: e.total,
                daysLeft: e.daysLeft,
                avatars: e.parties,
                countText: `${e.partyCount} parties`,
                actionLabel: "View",
                href: `/escrow/${e.id}`,
              }}
            />
          ))}
        </div>
      )}

      {/* Reviews */}
      {tab === "reviews" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              {avgRating.toFixed(1)}
            </span>
            <Stars rating={Math.round(avgRating)} />
            <span className="text-sm text-gray-500">
              ({profileReviews.length} reviews)
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {profileReviews.map((r) => (
              <div
                key={r.id}
                className="flex items-start gap-3 p-4 rounded-2xl border border-gray-100 bg-white"
              >
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {r.name}
                    </p>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <div className="my-1">
                    <Stars rating={r.rating} />
                  </div>
                  <p className="text-sm text-gray-600">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
