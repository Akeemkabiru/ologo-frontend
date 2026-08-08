"use client";

import { useParams } from "next/navigation";
import { ShieldCheck, Download, Lock } from "lucide-react";
import { getEscrowById } from "@/data/escrows";
import {
  designationStyles,
  escrowMembers,
  escrowRequestForms,
  escrowFormRecords,
  escrowChat,
  escrowFundDetails,
  fallbackEscrow,
  money,
} from "@/data/escrowDetail";

const formBadge: Record<string, string> = {
  Deposit: "bg-violet-100 text-violet-700",
  Request: "bg-amber-100 text-amber-700",
  Decider: "bg-emerald-100 text-emerald-700",
};

export default function EscrowReportPage() {
  const { id } = useParams<{ id: string }>();
  const listEscrow = getEscrowById(id);

  const name = listEscrow?.name ?? fallbackEscrow.name;
  const image = listEscrow?.image ?? fallbackEscrow.image;
  const held = escrowFundDetails.held;
  const released = escrowFundDetails.released;
  const totalDeposited = held + released;

  const generatedAt = new Date().toLocaleString(undefined, {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-violet-600 text-white font-bold flex items-center justify-center">
              O
            </span>
            <span className="font-bold text-gray-900">Ologo</span>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-500">Escrow Report</span>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="print:hidden inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
          >
            <Download size={15} />
            Export
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Hero */}
          <div className="relative h-44">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <div className="flex items-center gap-1.5 mb-1">
                <ShieldCheck size={15} />
                <span className="text-xs font-medium">
                  Verified escrow report
                </span>
              </div>
              <h1 className="text-xl font-bold">{name}</h1>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <p className="text-xs text-gray-400 mb-6">
              Generated {generatedAt} · Anyone with this link can view this
              report.
            </p>

            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: "Total Deposited", value: money(totalDeposited) },
                { label: "Released", value: money(released) },
                { label: "In Escrow", value: money(held) },
                { label: "Parties", value: String(escrowMembers.length) },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-3"
                >
                  <p className="text-[11px] text-gray-500">{stat.label}</p>
                  <p className="text-base font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Members */}
            <Section title="Members & Designations">
              <div className="divide-y divide-gray-100">
                {escrowMembers.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 py-3">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {m.name}
                        </p>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${designationStyles[m.role]}`}
                        >
                          {m.role}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{m.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Payments & Forms */}
            <Section title="Payments & Forms">
              <div className="space-y-2.5">
                {escrowFormRecords.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100"
                  >
                    <img
                      src={f.avatar}
                      alt={f.by}
                      className="w-9 h-9 rounded-full object-cover"
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
                      <p className="text-sm text-gray-900 font-medium mt-1">
                        {f.summary}
                      </p>
                      <p className="text-xs text-gray-500">by {f.by}</p>
                    </div>
                    <span className="text-sm font-bold text-violet-600">
                      {money(f.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Request Forms */}
            <Section title="Request Forms">
              <div className="space-y-2.5">
                {escrowRequestForms.map((r) => (
                  <div
                    key={r.id}
                    className="p-3 rounded-xl border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={r.avatar}
                        alt={r.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">
                          {r.name}
                        </p>
                        <p className="text-xs text-gray-400">{r.date}</p>
                      </div>
                      <span className="text-sm font-bold text-violet-600">
                        {money(r.amount)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{r.reason}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Chat log */}
            <Section title="Group Chat Log">
              <div className="space-y-4">
                {escrowChat.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {c.name}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {c.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-0.5">{c.text}</p>
                      {c.attachment && (
                        <p className="text-xs text-violet-600 mt-1">
                          {c.attachment.kind === "file" ? "📎 " : "🔗 "}
                          {c.attachment.label}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <div className="flex items-center gap-2 mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
              <Lock size={13} />
              This report is a tamper-evident record of everything that happened
              in this escrow group.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}
