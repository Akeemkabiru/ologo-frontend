"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import { FormButton } from "@/components/forms/FormComponents";
import type { Designation, EscrowMember } from "@/data/escrowDetail";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: EscrowMember) => void;
}

const roleNote: Record<Designation, string> = {
  Host: "Created the escrow & deposits funds",
  Decider: "Appointed to approve & distribute funds",
  Beneficiary: "Receives approved payments",
  Witness: "Invited to observe & verify",
};

const avatarPool = [27, 28, 29, 30, 33, 34, 35, 36, 37, 38];

export default function AddMemberModal({
  isOpen,
  onClose,
  onAdd,
}: AddMemberModalProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState<Designation>("Beneficiary");
  const [identity, setIdentity] = useState("name");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState(false);

  const reset = () => {
    setName("");
    setContact("");
    setRole("Beneficiary");
    setIdentity("name");
    setAlias("");
    setError(false);
  };

  const handleClose = () => {
    reset();
    onClose();
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Member"
      description="Invite a user and give them a role in this escrow"
      maxWidthClassName="max-w-md"
    >
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

        <SelectField
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value as Designation)}
          options={[
            { label: "Decider — approves & distributes funds", value: "Decider" },
            {
              label: "Witness — observes & verifies",
              value: "Witness",
            },
            {
              label: "Beneficiary — receives payments",
              value: "Beneficiary",
            },
          ]}
        />

        {role === "Decider" && (
          <div className="rounded-xl border border-gray-200 p-4 grid gap-4">
            <p className="text-xs text-gray-500">
              A Decider can appear under their name, anonymously, or under an
              alias. This can also be changed later before they submit a Decider
              Form.
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
    </Modal>
  );
}
