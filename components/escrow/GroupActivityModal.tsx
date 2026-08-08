"use client";

import React, { useState } from "react";
import { Paperclip, Link2, Send, FileText, ExternalLink } from "lucide-react";
import Modal from "@/components/ui/modal";
import {
  money,
  type ChatMessage,
  type FormRecord,
} from "@/data/escrowDetail";

interface GroupActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  forms: FormRecord[];
}

const formBadge: Record<FormRecord["type"], string> = {
  Deposit: "bg-violet-100 text-violet-700",
  Request: "bg-amber-100 text-amber-700",
  Decider: "bg-emerald-100 text-emerald-700",
};

export default function GroupActivityModal({
  isOpen,
  onClose,
  messages,
  forms,
}: GroupActivityModalProps) {
  const [tab, setTab] = useState<"chat" | "forms">("chat");
  const [chat, setChat] = useState<ChatMessage[]>(messages);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setChat((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        name: "You",
        avatar: "https://i.pravatar.cc/64?img=21",
        time: new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: draft.trim(),
      },
    ]);
    setDraft("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Group Activity"
      description="Chat history and all forms filled by every member"
      maxWidthClassName="max-w-xl"
    >
      {/* Inner tabs */}
      <div className="flex gap-2 mb-4">
        {(["chat", "forms"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              tab === t
                ? "bg-violet-600 text-white"
                : "bg-violet-100/70 text-violet-500 hover:bg-violet-100"
            }`}
          >
            {t === "chat" ? "Group Chat" : `All Forms (${forms.length})`}
          </button>
        ))}
      </div>

      {tab === "chat" ? (
        <div>
          <div className="max-h-80 overflow-y-auto flex flex-col gap-4 pr-1">
            {chat.map((m) => (
              <div key={m.id} className="flex gap-3">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {m.name}
                    </span>
                    <span className="text-[11px] text-gray-400">{m.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-0.5">{m.text}</p>
                  {m.attachment && (
                    <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600">
                      {m.attachment.kind === "file" ? (
                        <FileText size={13} className="text-violet-600" />
                      ) : (
                        <ExternalLink size={13} className="text-violet-600" />
                      )}
                      {m.attachment.label}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              aria-label="Attach file"
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
            >
              <Paperclip size={16} />
            </button>
            <button
              type="button"
              aria-label="Add link"
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
            >
              <Link2 size={16} />
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Message the group…"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
            <button
              type="button"
              onClick={send}
              aria-label="Send"
              className="w-9 h-9 rounded-full bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center transition-colors"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto flex flex-col gap-3 pr-1">
          {forms.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100"
            >
              <img
                src={f.avatar}
                alt={f.by}
                className="w-9 h-9 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${formBadge[f.type]}`}
                  >
                    {f.type} Form
                  </span>
                  <span className="text-xs text-gray-400">{f.date}</span>
                </div>
                <p className="text-sm text-gray-900 font-medium truncate mt-1">
                  {f.summary}
                </p>
                <p className="text-xs text-gray-500">by {f.by}</p>
              </div>
              <span className="text-sm font-bold text-violet-600 shrink-0">
                {money(f.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
