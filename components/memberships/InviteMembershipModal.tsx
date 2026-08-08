"use client";

import React, { useMemo, useState } from "react";
import { Copy, Check, Search, Plus, X, Send } from "lucide-react";
import Modal from "@/components/ui/modal";
import { FormButton } from "@/components/forms/FormComponents";
import { searchUsers, type MockUser } from "@/data/users";

interface InviteMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  membership: { id: string; name: string } | null;
}

export default function InviteMembershipModal({
  isOpen,
  onClose,
  membership,
}: InviteMembershipModalProps) {
  const [copied, setCopied] = useState(false);
  const [query, setQuery] = useState("");
  const [invited, setInvited] = useState<MockUser[]>([]);

  const results = useMemo(
    () =>
      searchUsers(
        query,
        invited.map((u) => u.id),
      ),
    [query, invited],
  );

  if (!membership) return null;

  const inviteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/memberships/${membership.id}`
      : `/memberships/${membership.id}`;

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    inviteUrl,
  )}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite to Membership"
      description={`Anyone who joins pays for “${membership.name}”`}
      maxWidthClassName="max-w-md"
    >
      <div className="grid gap-5">
        {/* Link */}
        <div>
          <label className="text-sm font-medium text-gray-800 mb-2.5 block">
            Invite link
          </label>
          <div className="flex gap-2">
            <input
              readOnly
              value={inviteUrl}
              className="flex-1 min-w-0 rounded-lg border-[1.5px] border-[#7f22fe]/40 bg-white/40 px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
            />
            <button
              type="button"
              onClick={copy}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3.5 text-sm font-semibold transition-colors ${
                copied
                  ? "bg-emerald-500 text-white"
                  : "bg-violet-600 hover:bg-violet-700 text-white"
              }`}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* QR */}
        <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <img
            src={qrSrc}
            alt="Membership invite QR code"
            className="w-40 h-40 rounded-lg bg-white p-2"
          />
          <p className="text-xs text-gray-500">Scan to join outside the app</p>
        </div>

        {/* Invite by search */}
        <div>
          <label className="text-sm font-medium text-gray-800 mb-2.5 block">
            Invite people
          </label>
          {invited.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2.5">
              {invited.map((u) => (
                <span
                  key={u.id}
                  className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 text-xs font-medium pl-2.5 pr-2 py-1 rounded-full"
                >
                  {u.fullName}
                  <button
                    type="button"
                    onClick={() =>
                      setInvited((p) => p.filter((x) => x.id !== u.id))
                    }
                    aria-label={`Remove ${u.fullName}`}
                    className="w-4 h-4 rounded-full bg-violet-200 hover:bg-violet-300 flex items-center justify-center"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, username, ID, email or phone"
              className="w-full bg-white rounded-lg pl-9 pr-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>
          {query.trim() && (
            <div className="mt-2 border border-gray-200 bg-white rounded-lg divide-y divide-gray-100 max-h-40 overflow-y-auto">
              {results.length > 0 ? (
                results.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      setInvited((p) => [...p, u]);
                      setQuery("");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-violet-50 text-left transition-colors"
                  >
                    <img
                      src={u.avatar}
                      alt={u.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {u.fullName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        @{u.username} · {u.email}
                      </p>
                    </div>
                    <Plus size={14} className="text-violet-600 shrink-0" />
                  </button>
                ))
              ) : (
                <p className="text-xs text-gray-400 px-3 py-2.5">
                  No matching users found
                </p>
              )}
            </div>
          )}
        </div>

        <FormButton
          type="button"
          size="lg"
          onClick={onClose}
          disabled={invited.length === 0}
          className="w-full"
        >
          <span className="inline-flex items-center gap-2">
            <Send size={16} />
            {invited.length > 0
              ? `Send ${invited.length} invite${invited.length > 1 ? "s" : ""}`
              : "Send invites"}
          </span>
        </FormButton>
      </div>
    </Modal>
  );
}
