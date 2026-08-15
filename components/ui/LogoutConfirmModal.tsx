"use client";

import React from "react";
import { LogOut } from "lucide-react";
import Modal from "@/components/ui/modal";
import { FormButton } from "@/components/forms/FormComponents";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Confirmation shown after a user clicks "Log out" — they must confirm with a
 * second, explicit log-out button before the session ends.
 */
export default function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidthClassName="max-w-md">
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <LogOut size={26} className="text-red-600" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">
          Are you sure you want to log out?
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          You&apos;ll need to sign in again to access your account.
        </p>
        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={onClose}
            className="sm:flex-1"
          >
            Cancel
          </FormButton>
          <button
            type="button"
            onClick={onConfirm}
            className="sm:flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-full transition-colors"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </div>
    </Modal>
  );
}
