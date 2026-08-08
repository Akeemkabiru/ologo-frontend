"use client";

import React from "react";
import { Star, Repeat } from "lucide-react";
import type { ViewMode } from "@/components/ui/ViewToggle";
import type { Contribution, ContributionType } from "@/data/contributions";

const typeBadge: Record<ContributionType, string> = {
  donation: "bg-violet-100 text-violet-700",
  pledge: "bg-amber-100 text-amber-700",
  note: "bg-gray-100 text-gray-600",
  review: "bg-emerald-100 text-emerald-700",
};

const typeLabel: Record<ContributionType, string> = {
  donation: "Donation",
  pledge: "Pledge",
  note: "Note",
  review: "Review",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={13}
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

function Amount({ item }: { item: Contribution }) {
  if (item.amount == null) return null;
  return (
    <span className="text-sm font-bold text-violet-600 whitespace-nowrap inline-flex items-center gap-1">
      {item.recurring && <Repeat size={12} />}${item.amount.toLocaleString()}
    </span>
  );
}

interface ContributionCardProps {
  item: Contribution;
  view: ViewMode;
}

export default function ContributionCard({ item, view }: ContributionCardProps) {
  const meta = (
    <span
      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${typeBadge[item.type]}`}
    >
      {typeLabel[item.type]}
    </span>
  );

  if (view === "list") {
    return (
      <div className="flex items-start gap-3 p-4 rounded-2xl border border-gray-100 bg-white">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-gray-900">{item.name}</p>
            {meta}
            <span className="text-xs text-gray-400">· {item.date}</span>
          </div>
          {item.type === "review" && item.rating != null && (
            <div className="mt-1.5">
              <Stars rating={item.rating} />
            </div>
          )}
          {item.text && (
            <p className="text-sm text-gray-600 mt-1.5">{item.text}</p>
          )}
        </div>
        <div className="shrink-0">
          <Amount item={item} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl border border-gray-100 bg-white h-full flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {item.name}
          </p>
          <p className="text-xs text-gray-400">{item.date}</p>
        </div>
        <Amount item={item} />
      </div>
      <div className="flex items-center gap-2 mb-2">
        {meta}
        {item.type === "review" && item.rating != null && (
          <Stars rating={item.rating} />
        )}
      </div>
      {item.text && <p className="text-sm text-gray-600">{item.text}</p>}
    </div>
  );
}
