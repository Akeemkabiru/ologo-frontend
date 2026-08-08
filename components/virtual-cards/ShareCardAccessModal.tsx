"use client";

import React, { useMemo, useState } from "react";
import { Search, Plus, X } from "lucide-react";
import Modal from "@/components/ui/modal";
import { FormButton } from "@/components/forms/FormComponents";
import { searchUsers } from "@/data/users";
import type { VirtualCard, CardMember } from "@/data/virtualCards";

interface ShareCardAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: VirtualCard | null;
  onUpdate: (members: CardMember[]) => void;
}

export default function ShareCardAccessModal({
  isOpen,
  onClose,
  card,
  onUpdate,
}: ShareCardAccessModalProps) {
  const [members, setMembers] = useState<CardMember[]>([]);
  const [query, setQuery] = useState("");
  const [lastCard, setLastCard] = useState<string | null>(null);

  // Sync local list when a different card is opened.
  if (card && card.id !== lastCard) {
    setLastCard(card.id);
    setMembers(card.sharedWith);
    setQuery("");
  }

  const results = useMemo(
    () =>
      searchUsers(
        query,
        members.map((m) => m.id),
      ),
    [query, members],
  );

  if (!card) return null;

  const save = () => {
    onUpdate(members);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Card Access"
      description={`Let others spend from “${card.label}” — every transaction shows on both dashboards`}
      maxWidthClassName="max-w-md"
    >
      <div className="grid gap-5">
        {/* Current access */}
        <div>
          <p className="text-sm font-medium text-gray-800 mb-2.5">
            People with access
          </p>
          {members.length === 0 ? (
            <p className="text-xs text-gray-400">Only you can spend from this card.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2"
                >
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="flex-1 text-sm font-medium text-gray-900 truncate">
                    {m.name}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setMembers((p) => p.filter((x) => x.id !== m.id))
                    }
                    className="text-xs font-medium text-red-500 hover:text-red-600 inline-flex items-center gap-1"
                  >
                    <X size={13} />
                    Revoke
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add */}
        <div>
          <p className="text-sm font-medium text-gray-800 mb-2.5">Give access</p>
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
                      setMembers((p) => [
                        ...p,
                        { id: u.id, name: u.fullName, avatar: u.avatar },
                      ]);
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
                        @{u.username}
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

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-1">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={onClose}
            className="sm:flex-1"
          >
            Cancel
          </FormButton>
          <FormButton
            type="button"
            size="lg"
            onClick={save}
            className="sm:flex-1"
          >
            Save Access
          </FormButton>
        </div>
      </div>
    </Modal>
  );
}
