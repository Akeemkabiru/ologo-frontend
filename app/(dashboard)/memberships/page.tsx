"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/cards/CardComponents";
import { formatCurrency } from "@/lib/utils";
import { FormInput, FormSelect } from "@/components/forms/FormComponents";
import MobileHeader from "@/components/ui/MobileHeader";
import { Plus, Share2 } from "lucide-react";
import JoinMembershipModal, {
  type JoinMembershipTarget,
} from "@/components/memberships/JoinMembershipModal";
import CreateMembershipModal from "@/components/memberships/CreateMembershipModal";
import InviteMembershipModal from "@/components/memberships/InviteMembershipModal";
import { mockMemberships, type Membership } from "@/data/memberships";

export default function MembershipsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFrequency, setFilterFrequency] = useState("all");
  const [memberships, setMemberships] = useState<Membership[]>(mockMemberships);
  const [joinTarget, setJoinTarget] = useState<JoinMembershipTarget | null>(
    null,
  );
  const [createOpen, setCreateOpen] = useState(false);
  const [inviteTarget, setInviteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [joinedIds, setJoinedIds] = useState<string[]>([]);

  const filteredMemberships = memberships.filter((membership) => {
    const matchesSearch = membership.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFrequency =
      filterFrequency === "all" || membership.frequency === filterFrequency;
    return matchesSearch && matchesFrequency;
  });

  return (
    <main className="min-h-screen pb-8">
      <MobileHeader
        title="Memberships"
        subtitle="Browse and join membership programs"
        rightSlot={
          <button
            onClick={() => setCreateOpen(true)}
            className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0"
            aria-label="Create Membership"
          >
            <Plus size={18} />
          </button>
        }
      />

      <div className="px-4 sm:px-6 md:px-8 pt-6">
        <div className="hidden md:flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Memberships
            </h1>
            <p className="text-gray-600 mt-1">
              Browse and join membership programs
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <Plus size={16} />
            Create Membership
          </button>
        </div>
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-5 sm:mb-6 md:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              placeholder="Search memberships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
            />
            <FormSelect
              options={[
                { label: "All Frequencies", value: "all" },
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
                { label: "Yearly", value: "yearly" },
              ]}
              value={filterFrequency}
              onChange={(e) => setFilterFrequency(e.target.value)}
            />
          </div>
        </div>

        {/* Memberships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {filteredMemberships.map((membership) => (
            <Link key={membership.id} href={`/memberships/${membership.id}`}>
              <Card hoverable>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {membership.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {membership.description}
                </p>

                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-violet-600">
                      {formatCurrency(
                        membership.membershipAmount,
                        membership.currency,
                      )}
                    </span>
                    <span className="text-gray-600">
                      per {membership.frequency}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>{membership.memberCount} members</span>
                  <span className="text-violet-600 font-semibold">
                    {membership.status}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  By {membership.createdBy}
                </p>

                <div className="flex gap-2">
                  {joinedIds.includes(membership.id) ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setJoinedIds((p) =>
                          p.filter((id) => id !== membership.id),
                        );
                      }}
                      className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      Leave
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setJoinTarget({
                          id: membership.id,
                          name: membership.name,
                          membershipAmount: membership.membershipAmount,
                          frequency: membership.frequency,
                          currency: membership.currency,
                        });
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      Join Membership
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setInviteTarget({
                        id: membership.id,
                        name: membership.name,
                      });
                    }}
                    aria-label="Invite people"
                    className="shrink-0 w-10 rounded-lg border border-violet-200 text-violet-600 hover:bg-violet-50 flex items-center justify-center transition-colors"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredMemberships.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No memberships found</p>
          </div>
        )}
      </div>

      <JoinMembershipModal
        isOpen={joinTarget !== null}
        onClose={() => setJoinTarget(null)}
        membership={joinTarget}
        onJoined={(id) => setJoinedIds((p) => [...p, id])}
      />
      <CreateMembershipModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(m) => setMemberships((prev) => [m, ...prev])}
      />
      <InviteMembershipModal
        isOpen={inviteTarget !== null}
        onClose={() => setInviteTarget(null)}
        membership={inviteTarget}
      />
    </main>
  );
}
