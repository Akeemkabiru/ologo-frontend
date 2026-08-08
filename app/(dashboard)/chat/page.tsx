"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Paperclip,
  Link2,
  Send,
  FileText,
  ExternalLink,
  Download,
  ArrowLeft,
  X,
  Users,
} from "lucide-react";
import {
  conversations,
  chatTypeLabel,
  chatTypeStyles,
  type Message,
} from "@/data/messages";
import LinkText from "@/components/ui/LinkText";
import { MobileMenuButton } from "@/components/ui/MobileNav";

function domainOf(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

type ChatTab = "chat" | "files" | "links";

export default function ChatPage() {
  const [messagesByConv, setMessagesByConv] = useState<
    Record<string, Message[]>
  >(() =>
    Object.fromEntries(conversations.map((c) => [c.id, c.messages])),
  );
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [tab, setTab] = useState<ChatTab>("chat");
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const bottomRef = useRef<HTMLDivElement>(null);
  const activeConv = conversations.find((c) => c.id === activeId)!;
  const messages = messagesByConv[activeId] ?? [];

  const files = useMemo(
    () => messages.filter((m) => m.attachment?.kind === "file"),
    [messages],
  );
  const links = useMemo(
    () => messages.filter((m) => m.attachment?.kind === "link"),
    [messages],
  );

  const q = search.trim().toLowerCase();
  const visibleMessages = useMemo(
    () =>
      q
        ? messages.filter(
            (m) =>
              m.text?.toLowerCase().includes(q) ||
              m.attachment?.label.toLowerCase().includes(q),
          )
        : messages,
    [messages, q],
  );

  useEffect(() => {
    if (tab === "chat" && !q) {
      bottomRef.current?.scrollIntoView({ block: "end" });
    }
  }, [activeId, tab, q, messages.length]);

  const appendMessage = (msg: Omit<Message, "id" | "time">) => {
    const full: Message = {
      ...msg,
      id: `x-${Date.now()}`,
      time: new Date().toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessagesByConv((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), full],
    }));
  };

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    const isUrl = /^https?:\/\/\S+$/i.test(t);
    appendMessage({
      senderId: "me",
      senderName: "You",
      senderAvatar: "https://i.pravatar.cc/64?img=21",
      self: true,
      text: isUrl ? undefined : t,
      attachment: isUrl
        ? { kind: "link", label: t, url: t, meta: domainOf(t) }
        : undefined,
    });
    setDraft("");
  };

  const shareFile = () => {
    appendMessage({
      senderId: "me",
      senderName: "You",
      senderAvatar: "https://i.pravatar.cc/64?img=21",
      self: true,
      text: "Shared a file",
      attachment: { kind: "file", label: "document.pdf", meta: "128 KB" },
    });
  };

  const openConversation = (id: string) => {
    setActiveId(id);
    setTab("chat");
    setSearch("");
    setShowSearch(false);
    setMobileView("chat");
  };

  return (
    <main className="md:h-[calc(100vh-8rem)]">
      <div className="md:flex md:gap-6 md:h-full">
        {/* Conversation list */}
        <aside
          className={`${
            mobileView === "chat" ? "hidden" : "flex"
          } md:flex flex-col md:w-80 shrink-0 bg-white md:rounded-2xl md:border border-gray-100 md:shadow-sm overflow-hidden h-[calc(100vh-11rem)] md:h-full`}
        >
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <MobileMenuButton className="md:hidden w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 shrink-0" />
              <h1 className="font-bold text-gray-900 text-lg">Messages</h1>
            </div>
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                placeholder="Search chats"
                className="w-full bg-gray-50 rounded-full pl-9 pr-4 py-2 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => openConversation(c.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 transition-colors ${
                  c.id === activeId ? "bg-violet-50/60" : "hover:bg-gray-50"
                }`}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {c.name}
                    </p>
                    <span className="text-[11px] text-gray-400 shrink-0">
                      {c.lastTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <p className="text-xs text-gray-500 truncate">
                      {c.lastMessage}
                    </p>
                    {c.unread > 0 && (
                      <span className="shrink-0 min-w-5 h-5 px-1.5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {c.unread}
                      </span>
                    )}
                  </div>
                  <span
                    className={`inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${chatTypeStyles[c.type]}`}
                  >
                    {chatTypeLabel[c.type]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Active chat */}
        <section
          className={`${
            mobileView === "list" ? "hidden" : "flex"
          } md:flex flex-col flex-1 bg-white md:rounded-2xl md:border border-gray-100 md:shadow-sm overflow-hidden h-[calc(100vh-11rem)] md:h-full`}
        >
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileView("list")}
                className="md:hidden w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 shrink-0"
                aria-label="Back"
              >
                <ArrowLeft size={18} />
              </button>
              <img
                src={activeConv.image}
                alt={activeConv.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {activeConv.name}
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Users size={11} />
                  {activeConv.members} members
                </p>
              </div>
              <button
                onClick={() => {
                  setShowSearch((s) => !s);
                  setSearch("");
                }}
                className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 shrink-0"
                aria-label="Search in chat"
              >
                {showSearch ? <X size={18} /> : <Search size={18} />}
              </button>
            </div>

            {showSearch && (
              <div className="relative mt-3">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search in this chat"
                  className="w-full bg-gray-50 rounded-full pl-9 pr-4 py-2 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-200"
                />
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 mt-3">
              {(["chat", "files", "links"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                    tab === t
                      ? "bg-violet-600 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {t === "files"
                    ? `Files (${files.length})`
                    : t === "links"
                      ? `Links (${links.length})`
                      : "Chat"}
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            {tab === "chat" && (
              <>
                {q && visibleMessages.length === 0 && (
                  <p className="text-center text-sm text-gray-400 py-8">
                    No messages match “{search}”.
                  </p>
                )}
                <div className="flex flex-col gap-3">
                  {visibleMessages.map((m) =>
                    m.senderId === "sys" ? (
                      <div key={m.id} className="flex items-center gap-3 my-2">
                        <span className="flex-1 h-px bg-gray-100" />
                        <span className="text-[11px] text-gray-400 whitespace-nowrap">
                          {m.text} · {m.time}
                        </span>
                        <span className="flex-1 h-px bg-gray-100" />
                      </div>
                    ) : (
                      <MessageBubble key={m.id} m={m} />
                    ),
                  )}
                  <div ref={bottomRef} />
                </div>
              </>
            )}

            {tab === "files" && (
              <TimelineList
                items={files}
                empty="No files shared yet."
                renderMeta={(m) => m.attachment?.meta}
                icon={<FileText size={16} className="text-violet-600" />}
              />
            )}

            {tab === "links" && (
              <TimelineList
                items={links}
                empty="No links shared yet."
                renderMeta={(m) => m.attachment?.meta}
                icon={<ExternalLink size={16} className="text-violet-600" />}
                asLink
              />
            )}
          </div>

          {/* Composer */}
          {tab === "chat" && (
            <div className="p-3 border-t border-gray-100 flex items-center gap-2">
              <button
                onClick={shareFile}
                aria-label="Share file"
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors shrink-0"
              >
                <Paperclip size={17} />
              </button>
              <button
                onClick={() => setDraft((d) => (d ? d : "https://"))}
                aria-label="Add link"
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors shrink-0"
              >
                <Link2 size={17} />
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
                placeholder="Type a message or paste a link…"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
              <button
                onClick={send}
                aria-label="Send"
                className="w-10 h-10 rounded-full bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center transition-colors shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function MessageBubble({ m }: { m: Message }) {
  const self = m.self;
  return (
    <div className={`flex gap-2.5 ${self ? "flex-row-reverse" : ""}`}>
      {!self && (
        <img
          src={m.senderAvatar}
          alt={m.senderName}
          className="w-8 h-8 rounded-full object-cover shrink-0"
        />
      )}
      <div className={`max-w-[78%] ${self ? "items-end" : ""} flex flex-col`}>
        {!self && (
          <span className="text-[11px] font-medium text-gray-500 mb-1">
            {m.senderName}
          </span>
        )}
        <div
          className={`rounded-2xl px-3.5 py-2 ${
            self
              ? "bg-violet-600 text-white rounded-tr-sm"
              : "bg-gray-100 text-gray-800 rounded-tl-sm"
          }`}
        >
          {m.text && (
            <p className="text-sm whitespace-pre-wrap">
              <LinkText
                text={m.text}
                className={self ? "text-white" : "text-violet-600"}
              />
            </p>
          )}
          {m.attachment?.kind === "file" && (
            <div
              className={`mt-2 flex items-center gap-2 rounded-lg px-2.5 py-2 ${
                self ? "bg-white/15" : "bg-white border border-gray-200"
              }`}
            >
              <FileText
                size={15}
                className={self ? "text-white" : "text-violet-600"}
              />
              <div className="min-w-0">
                <p className="text-xs font-medium truncate">
                  {m.attachment.label}
                </p>
                {m.attachment.meta && (
                  <p
                    className={`text-[10px] ${self ? "text-white/70" : "text-gray-400"}`}
                  >
                    {m.attachment.meta}
                  </p>
                )}
              </div>
              <Download
                size={14}
                className={`ml-1 shrink-0 ${self ? "text-white/80" : "text-gray-400"}`}
              />
            </div>
          )}
          {m.attachment?.kind === "link" && (
            <a
              href={m.attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-2 flex items-center gap-2 rounded-lg px-2.5 py-2 ${
                self
                  ? "bg-white/15 hover:bg-white/25"
                  : "bg-white border border-gray-200 hover:border-violet-200"
              } transition-colors`}
            >
              <ExternalLink
                size={15}
                className={self ? "text-white" : "text-violet-600"}
              />
              <span className="text-xs font-medium underline break-all">
                {m.attachment.label}
              </span>
            </a>
          )}
        </div>
        <span
          className={`text-[10px] text-gray-400 mt-1 ${self ? "text-right" : ""}`}
        >
          {m.time}
        </span>
      </div>
    </div>
  );
}

function TimelineList({
  items,
  empty,
  renderMeta,
  icon,
  asLink,
}: {
  items: Message[];
  empty: string;
  renderMeta: (m: Message) => string | undefined;
  icon: React.ReactNode;
  asLink?: boolean;
}) {
  if (items.length === 0) {
    return <p className="text-center text-sm text-gray-400 py-10">{empty}</p>;
  }
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((m) => {
        const inner = (
          <>
            <span className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
              {icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {m.attachment?.label}
              </p>
              <p className="text-xs text-gray-400">
                {m.senderName} · {m.time}
                {renderMeta(m) ? ` · ${renderMeta(m)}` : ""}
              </p>
            </div>
          </>
        );
        return asLink ? (
          <a
            key={m.id}
            href={m.attachment?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-violet-200 transition-colors"
          >
            {inner}
          </a>
        ) : (
          <div
            key={m.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100"
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}
