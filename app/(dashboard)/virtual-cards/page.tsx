"use client";

import React, { useState } from "react";
import {
  Plus,
  Copy,
  Check,
  Snowflake,
  Trash2,
  Users,
  ArrowDownLeft,
  ArrowUpRight,
  RotateCcw,
  XCircle,
  Percent,
  CreditCard,
  Play,
} from "lucide-react";
import MobileHeader from "@/components/ui/MobileHeader";
import { formatCurrency } from "@/lib/utils";
import { getCurrency } from "@/lib/currency";
import CreateCardModal from "@/components/virtual-cards/CreateCardModal";
import LoadCardModal from "@/components/virtual-cards/LoadCardModal";
import ReturnToWalletModal from "@/components/virtual-cards/ReturnToWalletModal";
import ShareCardAccessModal from "@/components/virtual-cards/ShareCardAccessModal";
import {
  virtualCards,
  cardTheme,
  CARD_FEES,
  type VirtualCard,
  type CardMember,
  type CardTransaction,
} from "@/data/virtualCards";

const now = () =>
  new Date().toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function VirtualCardsPage() {
  const [cards, setCards] = useState<VirtualCard[]>(virtualCards);
  const [selectedId, setSelectedId] = useState(virtualCards[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [loadOpen, setLoadOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const selected = cards.find((c) => c.id === selectedId) ?? cards[0];

  const patchSelected = (
    updater: (c: VirtualCard) => VirtualCard,
  ) =>
    setCards((prev) =>
      prev.map((c) => (c.id === selected.id ? updater(c) : c)),
    );

  const addTxn = (c: VirtualCard, txn: CardTransaction): VirtualCard => ({
    ...c,
    transactions: [txn, ...c.transactions],
  });

  const loadCard = (amount: number) =>
    patchSelected((c) =>
      addTxn({ ...c, balance: c.balance + amount }, {
        id: `t-${Date.now()}`,
        type: "load",
        merchant: `Loaded from ${c.currency} wallet`,
        amount,
        date: now(),
        identity: "You",
      }),
    );

  const returnToWallet = (amount: number) =>
    patchSelected((c) =>
      addTxn({ ...c, balance: c.balance - amount }, {
        id: `t-${Date.now()}`,
        type: "return",
        merchant: `Returned to ${c.currency} wallet`,
        amount: -amount,
        date: now(),
        identity: "You",
      }),
    );

  const toggleFreeze = () =>
    patchSelected((c) => ({
      ...c,
      status: c.status === "frozen" ? "active" : "frozen",
    }));

  const updateShared = (members: CardMember[]) =>
    patchSelected((c) => ({ ...c, sharedWith: members }));

  const deleteCard = () => {
    const remaining = cards.filter((c) => c.id !== selected.id);
    setCards(remaining);
    setSelectedId(remaining[0]?.id ?? "");
  };

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(selected.number.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <main className="min-h-screen pb-8">
      <MobileHeader
        title="Virtual Cards"
        subtitle="Multi-currency cards for any online payment"
        rightSlot={
          <button
            onClick={() => setCreateOpen(true)}
            className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0"
            aria-label="Create Card"
          >
            <Plus size={18} />
          </button>
        }
      />

      <div className="px-4 sm:px-6 md:px-8 pt-6 md:pt-0">
        {/* Desktop header */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Virtual Cards
            </h1>
            <p className="text-gray-600 mt-1">
              Multi-currency cards you fund from your wallets
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors shadow-sm"
          >
            <Plus size={16} />
            Create Card
          </button>
        </div>

        {/* Fees */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500 bg-white border border-gray-100 rounded-xl px-4 py-3 mb-6">
          <span>
            Creation:{" "}
            <b className="text-gray-700">
              {formatCurrency(CARD_FEES.creation, "USD")}
            </b>
          </span>
          <span>
            Maintenance:{" "}
            <b className="text-gray-700">
              {formatCurrency(CARD_FEES.maintenance, "USD")}/mo
            </b>
          </span>
          <span>
            Failed transaction:{" "}
            <b className="text-gray-700">
              {formatCurrency(CARD_FEES.failedTransaction, "USD")}
            </b>
          </span>
          <span className="text-gray-400">Fees set by admin</span>
        </div>

        {cards.length === 0 ? (
          <div className="text-center py-16">
            <CreditCard size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400 mb-4">No virtual cards yet.</p>
            <button
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              <Plus size={16} />
              Create your first card
            </button>
          </div>
        ) : (
          <>
            {/* Card selector */}
            <div className="flex gap-4 overflow-x-auto pb-2 mb-6 scrollbar-none">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setSelectedId(card.id)}
                  className={`shrink-0 transition-all ${
                    card.id === selected.id
                      ? "ring-2 ring-violet-500 ring-offset-2 rounded-2xl"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <MiniCard card={card} />
                </button>
              ))}
              <button
                onClick={() => setCreateOpen(true)}
                className="shrink-0 w-40 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-violet-300 hover:text-violet-500 transition-colors"
              >
                <Plus size={20} />
                <span className="text-xs font-medium mt-1">New card</span>
              </button>
            </div>

            {/* Selected card detail */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Card + actions */}
              <div className="space-y-4">
                <BigCard card={selected} />

                <div className="flex gap-2">
                  <button
                    onClick={copyNumber}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={15} className="text-emerald-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={15} />
                        Copy number
                      </>
                    )}
                  </button>
                  <button
                    onClick={toggleFreeze}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-xl border transition-colors ${
                      selected.status === "frozen"
                        ? "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                        : "border-sky-200 text-sky-600 hover:bg-sky-50"
                    }`}
                  >
                    {selected.status === "frozen" ? (
                      <>
                        <Play size={15} />
                        Unfreeze
                      </>
                    ) : (
                      <>
                        <Snowflake size={15} />
                        Freeze
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <ActionBtn
                    icon={<ArrowDownLeft size={16} />}
                    label="Load"
                    onClick={() => setLoadOpen(true)}
                  />
                  <ActionBtn
                    icon={<RotateCcw size={16} />}
                    label="Return"
                    onClick={() => setReturnOpen(true)}
                  />
                  <ActionBtn
                    icon={<Users size={16} />}
                    label="Share"
                    onClick={() => setShareOpen(true)}
                  />
                </div>

                {/* Shared access */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-900">
                      Shared access
                    </p>
                    <button
                      onClick={() => setShareOpen(true)}
                      className="text-xs font-medium text-violet-600 hover:text-violet-700"
                    >
                      Manage
                    </button>
                  </div>
                  {selected.sharedWith.length === 0 ? (
                    <p className="text-xs text-gray-400">
                      Only you can spend from this card.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {selected.sharedWith.map((m) => (
                        <div key={m.id} className="flex items-center gap-2">
                          <img
                            src={m.avatar}
                            alt={m.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <span className="text-sm text-gray-700">
                            {m.name}
                          </span>
                          <span className="text-[11px] text-gray-400 ml-auto">
                            can spend
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={deleteCard}
                  className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 size={15} />
                  Delete card
                </button>
                <p className="text-[11px] text-gray-400 text-center -mt-2">
                  Deleting returns the loaded balance to your {selected.currency}{" "}
                  wallet.
                </p>
              </div>

              {/* Transactions */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">
                    Transaction History
                  </h3>
                  <span className="text-xs text-gray-400">
                    {selected.transactions.length} transactions
                  </span>
                </div>
                <div className="flex flex-col divide-y divide-gray-50">
                  {selected.transactions.map((t) => (
                    <TxnRow
                      key={t.id}
                      txn={t}
                      currency={selected.currency}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <CreateCardModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(card) => {
          setCards((prev) => [card, ...prev]);
          setSelectedId(card.id);
        }}
      />
      <LoadCardModal
        isOpen={loadOpen}
        onClose={() => setLoadOpen(false)}
        card={selected ?? null}
        onLoad={loadCard}
      />
      <ReturnToWalletModal
        isOpen={returnOpen}
        onClose={() => setReturnOpen(false)}
        card={selected ?? null}
        onReturn={returnToWallet}
      />
      <ShareCardAccessModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        card={selected ?? null}
        onUpdate={updateShared}
      />
    </main>
  );
}

function maskNumber(number: string) {
  const last4 = number.replace(/\s/g, "").slice(-4);
  return `•••• •••• •••• ${last4}`;
}

function MiniCard({ card }: { card: VirtualCard }) {
  return (
    <div
      className={`relative w-40 h-24 rounded-2xl bg-linear-to-br ${cardTheme[card.currency] ?? "from-gray-700 to-gray-900"} text-white p-3 flex flex-col justify-between overflow-hidden`}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg leading-none">
          {getCurrency(card.currency).flag}
        </span>
        <span className="text-[10px] font-semibold uppercase">
          {card.currency}
        </span>
      </div>
      <div>
        <p className="text-[11px] font-medium truncate">{card.label}</p>
        <p className="text-xs font-bold">
          {formatCurrency(card.balance, card.currency)}
        </p>
      </div>
      {card.status === "frozen" && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
          <Snowflake size={18} />
        </div>
      )}
    </div>
  );
}

function BigCard({ card }: { card: VirtualCard }) {
  return (
    <div
      className={`relative rounded-2xl bg-linear-to-br ${cardTheme[card.currency] ?? "from-gray-700 to-gray-900"} text-white p-5 h-52 flex flex-col justify-between overflow-hidden shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-white/70">{card.label}</p>
          <p className="text-2xl font-bold mt-1">
            {formatCurrency(card.balance, card.currency)}
          </p>
        </div>
        <span className="text-2xl leading-none">
          {getCurrency(card.currency).flag}
        </span>
      </div>
      <div>
        <p className="font-mono tracking-widest text-lg">
          {maskNumber(card.number)}
        </p>
        <div className="flex items-center gap-5 mt-2 text-xs text-white/80">
          <span>EXP {card.expiry}</span>
          <span>CVV •••</span>
          {card.anonymous && (
            <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full">
              {card.alias ? `Alias: ${card.alias}` : "Anonymous"}
            </span>
          )}
        </div>
      </div>
      {card.status === "frozen" && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center gap-2 font-semibold">
          <Snowflake size={20} />
          Frozen
        </div>
      )}
    </div>
  );
}

const txnMeta: Record<
  CardTransaction["type"],
  { icon: React.ReactNode; tone: string }
> = {
  load: { icon: <ArrowDownLeft size={15} />, tone: "bg-emerald-100 text-emerald-600" },
  spend: { icon: <ArrowUpRight size={15} />, tone: "bg-gray-100 text-gray-600" },
  return: { icon: <RotateCcw size={15} />, tone: "bg-violet-100 text-violet-600" },
  fee: { icon: <Percent size={15} />, tone: "bg-amber-100 text-amber-600" },
  failed: { icon: <XCircle size={15} />, tone: "bg-rose-100 text-rose-600" },
};

function TxnRow({
  txn,
  currency,
}: {
  txn: CardTransaction;
  currency: string;
}) {
  const meta = txnMeta[txn.type];
  const positive = txn.amount > 0;
  return (
    <div className="flex items-center gap-3 py-3">
      <span
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${meta.tone}`}
      >
        {meta.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {txn.merchant}
        </p>
        <p className="text-xs text-gray-400">
          {txn.date}
          {txn.identity !== "You" && ` · as ${txn.identity}`}
          {txn.by && txn.by !== "You" && ` · by ${txn.by}`}
        </p>
      </div>
      <span
        className={`text-sm font-bold whitespace-nowrap ${
          positive ? "text-emerald-600" : "text-gray-900"
        }`}
      >
        {positive ? "+" : "-"}
        {formatCurrency(Math.abs(txn.amount), currency)}
      </span>
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:border-violet-200 hover:text-violet-600 transition-colors"
    >
      {icon}
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
