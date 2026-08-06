"use client";

import React from "react";
import Link from "next/link";
import { Clock, CheckCircle2, Plus } from "lucide-react";
import type { ViewMode } from "@/components/ui/ViewToggle";

export interface FundingCardItem {
  id: string;
  name: string;
  verified: boolean;
  image: string;
  emoji?: string;
  deadlineLabel: string;
  deadline: string;
  amountLabel: string;
  amount: number;
  goal: number;
  daysLeft: number;
  avatars: string[];
  countText?: string;
  actionLabel: string;
  href?: string;
}

function formatAmount(amount: number) {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

function ActionButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold pl-3 pr-2 py-1.5 rounded-full transition-colors shrink-0"
    >
      {label}
      <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center">
        <Plus size={10} />
      </span>
    </button>
  );
}

function Parties({ item }: { item: FundingCardItem }) {
  if (item.avatars.length === 0) return null;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex -space-x-2">
        {item.avatars.map((avatar, idx) => (
          <img
            key={idx}
            src={avatar}
            alt=""
            className="w-5 h-5 rounded-full border-2 border-white object-cover"
          />
        ))}
      </div>
      {item.countText && (
        <span className="text-xs text-gray-500">{item.countText}</span>
      )}
    </div>
  );
}

function GridCard({ item }: { item: FundingCardItem }) {
  const progress = Math.round((item.amount / item.goal) * 100);
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full">
      {/* Image with overlay badges */}
      <div className="relative h-32">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute top-3 right-3">
          <ActionButton label={item.actionLabel} />
        </div>
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-[11px]">
          <div className="flex items-center gap-1">
            <Clock size={11} />
            <div>
              <p className="opacity-80 leading-tight">{item.deadlineLabel}</p>
              <p className="font-medium leading-tight">{item.deadline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-3">
          {item.emoji && (
            <span className="text-base leading-none">{item.emoji}</span>
          )}
          <p className="text-sm font-semibold text-gray-900">{item.name}</p>
          {item.verified && (
            <CheckCircle2 size={14} className="text-violet-600" />
          )}
        </div>

        <p className="text-xs text-gray-500 mb-1">{item.amountLabel}</p>
        <p className="text-lg font-bold text-violet-600 mb-3">
          {formatAmount(item.amount)}
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
            {item.daysLeft} days left
          </div>
          <Parties item={item} />
        </div>
      </div>
    </div>
  );
}

function ListCard({ item }: { item: FundingCardItem }) {
  const progress = Math.round((item.amount / item.goal) * 100);
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row">
      {/* Image */}
      <div className="relative h-32 sm:h-auto sm:w-52 shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent sm:bg-linear-to-r" />
        <div className="absolute bottom-2 left-3 right-3 sm:top-3 sm:bottom-auto flex items-center gap-1 text-white text-[11px]">
          <Clock size={11} />
          <div>
            <p className="opacity-80 leading-tight">{item.deadlineLabel}</p>
            <p className="font-medium leading-tight">{item.deadline}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-2">
            {item.emoji && (
              <span className="text-base leading-none">{item.emoji}</span>
            )}
            <p className="text-sm font-semibold text-gray-900 truncate">
              {item.name}
            </p>
            {item.verified && (
              <CheckCircle2 size={14} className="text-violet-600 shrink-0" />
            )}
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xs text-gray-500">{item.amountLabel}</span>
            <span className="text-lg font-bold text-violet-600">
              {formatAmount(item.amount)}
            </span>
          </div>

          <div className="w-full max-w-md h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 sm:gap-2.5 shrink-0">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={12} />
            {item.daysLeft} days left
          </div>
          <Parties item={item} />
          <ActionButton label={item.actionLabel} />
        </div>
      </div>
    </div>
  );
}

interface FundingCardProps {
  item: FundingCardItem;
  view: ViewMode;
}

export default function FundingCard({ item, view }: FundingCardProps) {
  const content =
    view === "grid" ? <GridCard item={item} /> : <ListCard item={item} />;

  if (item.href) {
    return (
      <Link href={item.href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}
