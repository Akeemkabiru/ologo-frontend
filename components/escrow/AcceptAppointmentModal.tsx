"use client";

import React, { useState } from "react";
import { Gavel } from "lucide-react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import { FormButton } from "@/components/forms/FormComponents";

interface AcceptAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  appointedBy: string;
}

export default function AcceptAppointmentModal({
  isOpen,
  onClose,
  onAccept,
  appointedBy,
}: AcceptAppointmentModalProps) {
  const [identity, setIdentity] = useState("name");
  const [alias, setAlias] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Accept Appointment"
      description={`${appointedBy} appointed you as a Decider`}
      maxWidthClassName="max-w-md"
    >
      <div className="grid gap-5">
        <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 p-3">
          <Gavel size={18} className="text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-600">
            As a Decider you can review request forms and distribute escrow
            funds. Choose how you want to appear — you can change this again
            before submitting any Decider Form.
          </p>
        </div>

        <SelectField
          label="Show me as"
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          options={[
            { label: "My registered name", value: "name" },
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

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-1">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={onClose}
            className="sm:flex-1"
          >
            Decline
          </FormButton>
          <FormButton
            type="button"
            size="lg"
            onClick={() => {
              console.log("Appointment accepted:", {
                identity: identity === "alias" ? { alias } : identity,
              });
              onAccept();
            }}
            className="sm:flex-1"
          >
            Accept Appointment
          </FormButton>
        </div>
      </div>
    </Modal>
  );
}
