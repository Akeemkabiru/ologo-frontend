"use client";

import React, { useMemo, useState } from "react";
import { Check, Copy, Link2, QrCode, UserPlus } from "lucide-react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import { FormButton } from "@/components/forms/FormComponents";
import type { Designation, EscrowMember } from "@/data/escrowDetail";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: EscrowMember) => void;
  /** Used to build the shareable invite link / QR. */
  escrowId?: string;
}

type Method = "in-app" | "link" | "qr";

const roleNote: Record<Designation, string> = {
  Host: "Created the escrow & deposits funds",
  Decider: "Appointed to approve & distribute funds",
  Beneficiary: "Receives approved payments",
  Witness: "Invited to observe & verify",
};

const avatarPool = [27, 28, 29, 30, 33, 34, 35, 36, 37, 38];

/** Small decorative QR placeholder rendered deterministically from the text. */
function QrPlaceholder({ text }: { text: string }) {
  const cells = useMemo(() => {
    const size = 21;
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
    }
    const out: boolean[] = [];
    let x = hash || 1;
    for (let i = 0; i < size * size; i++) {
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      x >>>= 0;
      out.push((x & 1) === 1);
    }
    return { size, out };
  }, [text]);

  const { size, out } = cells;
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) =>
      r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inBox(0, 0) || inBox(0, size - 7) || inBox(size - 7, 0);
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-44 h-44"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Invite QR code"
    >
      <rect width={size} height={size} fill="#ffffff" />
      {Array.from({ length: size * size }).map((_, i) => {
        const r = Math.floor(i / size);
        const c = i % size;
        if (isFinder(r, c)) return null;
        return out[i] ? (
          <rect key={i} x={c} y={r} width={1} height={1} fill="#4c1d95" />
        ) : null;
      })}
      {/* Finder squares */}
      {[
        [0, 0],
        [0, size - 7],
        [size - 7, 0],
      ].map(([r, c], idx) => (
        <g key={idx} fill="#4c1d95">
          <rect x={c} y={r} width={7} height={7} />
          <rect x={c + 1} y={r + 1} width={5} height={5} fill="#ffffff" />
          <rect x={c + 2} y={r + 2} width={3} height={3} />
        </g>
      ))}
    </svg>
  );
}

export default function AddMemberModal({
  isOpen,
  onClose,
  onAdd,
  escrowId = "escrow",
}: AddMemberModalProps) {
  const [method, setMethod] = useState<Method>("in-app");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState<Designation>("Beneficiary");
  const [identity, setIdentity] = useState("name");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const inviteLink = useMemo(() => {
    const base =
      typeof window !== "undefined" ? window.location.origin : "https://ologo.app";
    return `${base}/escrow/${escrowId}/join?role=${role.toLowerCase()}`;
  }, [escrowId, role]);

  const reset = () => {
    setMethod("in-app");
    setName("");
    setContact("");
    setRole("Beneficiary");
    setIdentity("name");
    setAlias("");
    setError(false);
    setCopied(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(true);
      return;
    }
    const img = avatarPool[Math.floor(Math.random() * avatarPool.length)];
    onAdd({
      id: `m-${Date.now()}`,
      name: name.trim(),
      role,
      avatar: `https://i.pravatar.cc/64?img=${img}`,
      note: roleNote[role],
      ...(role === "Decider" && identity === "alias" && alias.trim()
        ? { alias: alias.trim() }
        : {}),
    });
    reset();
    onClose();
  };

  const methods: { label: string; value: Method; icon: typeof UserPlus }[] = [
    { label: "In-app", value: "in-app", icon: UserPlus },
    { label: "Link", value: "link", icon: Link2 },
    { label: "QR code", value: "qr", icon: QrCode },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Member"
      description="Invite a user and give them a role in this escrow"
      maxWidthClassName="max-w-md"
    >
      {/* Method switcher */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {methods.map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => setMethod(m.value)}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition-colors ${
              method === m.value
                ? "bg-violet-600 text-white"
                : "bg-violet-100/70 text-violet-500 hover:bg-violet-100"
            }`}
          >
            <m.icon size={15} />
            {m.label}
          </button>
        ))}
      </div>

      {/* Role selector — shared across all methods */}
      <SelectField
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value as Designation)}
        options={[
          { label: "Decider — approves & distributes funds", value: "Decider" },
          { label: "Witness — observes & verifies", value: "Witness" },
          { label: "Beneficiary — receives payments", value: "Beneficiary" },
        ]}
        containerClassName="mb-5"
      />

      {method === "in-app" && (
        <form onSubmit={handleSubmit} className="grid gap-5">
          <InputField
            label="Full Name"
            placeholder="e.g., Frank Adeyemi"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(false);
            }}
            error={error}
            errorMessage={error ? "Name is required" : undefined}
            required
          />

          <InputField
            label="Email or Username"
            placeholder="Search by email or @username"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          {role === "Decider" && (
            <div className="rounded-xl border border-gray-200 p-4 grid gap-4">
              <p className="text-xs text-gray-500">
                A Decider can appear under their name, anonymously, or under an
                alias. This can also be changed later before they submit a
                Decider Form.
              </p>
              <SelectField
                label="Decider shows as"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                options={[
                  { label: "Registered name", value: "name" },
                  { label: "Anonymous", value: "anonymous" },
                  { label: "Alias name", value: "alias" },
                ]}
              />
              {identity === "alias" && (
                <InputField
                  label="Alias name"
                  placeholder="e.g., The Trustee"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                />
              )}
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-1">
            <FormButton
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleClose}
              className="sm:flex-1"
            >
              Cancel
            </FormButton>
            <FormButton type="submit" size="lg" className="sm:flex-1">
              Add Member
            </FormButton>
          </div>
        </form>
      )}

      {method === "link" && (
        <div className="grid gap-4">
          <p className="text-sm text-gray-600">
            Share this link to invite a member as{" "}
            <span className="font-semibold text-gray-900">{role}</span>. Anyone
            with the link can request to join in this role.
          </p>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
            <Link2 size={16} className="text-gray-400 shrink-0" />
            <span className="text-sm text-gray-700 truncate flex-1">
              {inviteLink}
            </span>
          </div>
          <FormButton type="button" size="lg" onClick={copyLink} className="w-full">
            <span className="inline-flex items-center gap-2">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy invite link"}
            </span>
          </FormButton>
        </div>
      )}

      {method === "qr" && (
        <div className="grid gap-4 justify-items-center text-center">
          <p className="text-sm text-gray-600">
            Let the member scan this code to join as{" "}
            <span className="font-semibold text-gray-900">{role}</span>.
          </p>
          <div className="rounded-2xl border border-gray-200 p-4 bg-white">
            <QrPlaceholder text={inviteLink} />
          </div>
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={copyLink}
            className="w-full"
          >
            <span className="inline-flex items-center gap-2">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy link instead"}
            </span>
          </FormButton>
        </div>
      )}
    </Modal>
  );
}
