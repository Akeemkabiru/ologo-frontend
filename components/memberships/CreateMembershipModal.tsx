"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Search, X, Plus } from "lucide-react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import TextareaField from "@/components/ui/textareaField";
import FileUploadField from "@/components/ui/fileUploadField";
import ToggleSwitch from "@/components/ui/toggleSwitch";
import { FormButton } from "@/components/forms/FormComponents";
import { CURRENCIES, TIMEZONES } from "@/lib/constants";
import { TAG_SUGGESTIONS } from "@/data/paymentLinks";
import { searchUsers, type MockUser } from "@/data/users";
import type { Membership } from "@/data/memberships";

const MAX_TAGS = 5;

const FREQ_UNITS = [
  { label: "Minutes", value: "minutes" },
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
  { label: "Months", value: "months" },
];

interface CreateMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (membership: Membership) => void;
}

export default function CreateMembershipModal({
  isOpen,
  onClose,
  onCreate,
}: CreateMembershipModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [freqAmount, setFreqAmount] = useState("5");
  const [freqUnit, setFreqUnit] = useState("days");
  const [timezone, setTimezone] = useState("UTC");
  const [dueAt, setDueAt] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagQuery, setTagQuery] = useState("");
  const [hostStatus, setHostStatus] = useState<"main" | "co-host">("main");
  const [coHostQuery, setCoHostQuery] = useState("");
  const [coHosts, setCoHosts] = useState<MockUser[]>([]);
  const [payoutRecipient, setPayoutRecipient] = useState("self");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const suggestions = useMemo(() => {
    const q = tagQuery.trim().toLowerCase();
    return TAG_SUGGESTIONS.filter(
      (t) => !tags.includes(t) && (!q || t.toLowerCase().includes(q)),
    );
  }, [tagQuery, tags]);

  const canCreateTag =
    tagQuery.trim().length > 0 &&
    !tags.some((t) => t.toLowerCase() === tagQuery.trim().toLowerCase());

  const coHostResults = useMemo(
    () =>
      searchUsers(
        coHostQuery,
        coHosts.map((u) => u.id),
      ),
    [coHostQuery, coHosts],
  );

  const addTag = (tag: string) => {
    const t = tag.trim();
    if (!t || tags.length >= MAX_TAGS || tags.includes(t)) return;
    setTags((p) => [...p, t]);
    setTagQuery("");
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const addCoHost = (user: MockUser) => {
    setCoHosts((p) => [...p, user]);
    setCoHostQuery("");
  };
  const removeCoHost = (id: string) => {
    setCoHosts((p) => p.filter((u) => u.id !== id));
    if (payoutRecipient === id) setPayoutRecipient("self");
  };

  const reset = () => {
    setName("");
    setDescription("");
    setAmount("");
    setCurrency("USD");
    setFreqAmount("5");
    setFreqUnit("days");
    setTimezone("UTC");
    setDueAt("");
    setVisibility("public");
    setImageFile(null);
    setImagePreview(null);
    setTags([]);
    setTagQuery("");
    setHostStatus("main");
    setCoHostQuery("");
    setCoHosts([]);
    setPayoutRecipient("self");
    setError(false);
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount || Number(amount) <= 0) {
      setError(true);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const membership: Membership = {
      id: `mb-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || "New membership group",
      membershipAmount: Number(amount),
      frequency: `${freqAmount} ${freqUnit}`,
      currency,
      memberCount: 0,
      createdBy: hostStatus === "co-host" ? "On behalf of a co-host" : "You",
      status: "active",
      visibility,
      tags,
      image: imagePreview ?? undefined,
    };
    console.log("Create membership:", membership, {
      timezone,
      dueAt,
      hostStatus,
      coHosts,
      payoutRecipient,
      imageFile,
    });
    setSubmitting(false);
    onCreate(membership);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Membership"
      description="A recurring group members subscribe to"
      maxWidthClassName="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        <InputField
          label="Membership Name"
          placeholder="e.g., Premium Donors Circle"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(false);
          }}
          error={error && !name.trim()}
          errorMessage={error && !name.trim() ? "Name is required" : undefined}
          required
        />

        <TextareaField
          label="Membership Description"
          placeholder="What do members get?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <FileUploadField
          label="Image"
          file={imageFile}
          onFileChange={handleImageChange}
          accept="image/*"
          helperText="JPG or PNG, up to 5MB"
        />
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Preview"
            width={120}
            height={120}
            unoptimized
            className="w-28 h-28 object-cover rounded-xl border border-white/40 -mt-2"
          />
        )}

        {/* Amount + currency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Membership Amount"
            placeholder="e.g., 5"
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError(false);
            }}
            error={error && (!amount || Number(amount) <= 0)}
            errorMessage={
              error && (!amount || Number(amount) <= 0)
                ? "Enter a valid amount"
                : undefined
            }
            required
          />
          <SelectField
            label="Currency"
            options={CURRENCIES.map((c) => ({ label: c, value: c }))}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>

        {/* Billing period */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Bill every"
            type="number"
            inputMode="numeric"
            value={freqAmount}
            onChange={(e) => setFreqAmount(e.target.value)}
          />
          <SelectField
            label="Period"
            options={FREQ_UNITS}
            value={freqUnit}
            onChange={(e) => setFreqUnit(e.target.value)}
          />
        </div>

        {/* Timezone + date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Time Zone"
            options={TIMEZONES.map((tz) => ({ label: tz, value: tz }))}
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />
          <InputField
            label="Expected Date & Time"
            type="datetime-local"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-medium text-gray-800 mb-2.5 block">
            Tags
          </label>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 text-xs font-medium pl-3 pr-2 py-1.5 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => setTags((p) => p.filter((t) => t !== tag))}
                    aria-label={`Remove ${tag}`}
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
              value={tagQuery}
              onChange={(e) => setTagQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (tagQuery.trim()) addTag(tagQuery);
                }
              }}
              disabled={tags.length >= MAX_TAGS}
              placeholder={
                tags.length >= MAX_TAGS
                  ? "Maximum of 5 tags"
                  : "Search or create tags"
              }
              className="w-full bg-white/40 backdrop-blur-xl border-[1.5px] border-[#7f22fe]/40 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#7f22fe] focus:ring-2 focus:ring-[#7f22fe]/30 disabled:bg-gray-100"
            />
          </div>
          {tags.length < MAX_TAGS && (tagQuery || suggestions.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-2.5">
              {canCreateTag && (
                <button
                  type="button"
                  onClick={() => addTag(tagQuery)}
                  className="inline-flex items-center gap-1 bg-violet-600 text-white text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <Plus size={12} />
                  Create “{tagQuery.trim()}”
                </button>
              )}
              {suggestions.slice(0, 10).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => addTag(t)}
                  className="inline-flex items-center gap-1 bg-gray-100 hover:bg-violet-100 hover:text-violet-700 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                >
                  <Plus size={12} />
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Visibility */}
        <ToggleSwitch
          label="Visibility"
          variant="pill"
          value={visibility}
          onChange={(v) => setVisibility(v as "public" | "private")}
          options={[
            { label: "Public", value: "public" },
            { label: "Private", value: "private" },
          ]}
        />

        {/* Host status */}
        <SelectField
          label="Your status"
          value={hostStatus}
          onChange={(e) => setHostStatus(e.target.value as "main" | "co-host")}
          options={[
            { label: "Main host (membership is for me)", value: "main" },
            {
              label: "Co-host (on behalf of another person or organisation)",
              value: "co-host",
            },
          ]}
        />

        {hostStatus === "co-host" && (
          <div className="rounded-xl border-[1.5px] border-[#7f22fe]/30 bg-white/40 p-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">Co-Hosts</p>
            {coHosts.length > 0 && (
              <div className="flex flex-col gap-2 mb-3">
                {coHosts.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-100"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {u.fullName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        @{u.username} · {u.id}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCoHost(u.id)}
                      aria-label={`Remove ${u.fullName}`}
                      className="shrink-0 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={coHostQuery}
                onChange={(e) => setCoHostQuery(e.target.value)}
                placeholder="Search by name, username, ID, email or phone"
                className="w-full bg-white rounded-lg pl-9 pr-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>
            {coHostQuery.trim() && (
              <div className="mt-2 border border-gray-200 bg-white rounded-lg divide-y divide-gray-100 max-h-40 overflow-y-auto">
                {coHostResults.length > 0 ? (
                  coHostResults.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => addCoHost(u)}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-violet-50 text-left transition-colors"
                    >
                      <div className="min-w-0">
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
            {coHosts.length > 0 && (
              <div className="mt-4">
                <SelectField
                  label="Who receives the money raised?"
                  value={payoutRecipient}
                  onChange={(e) => setPayoutRecipient(e.target.value)}
                  options={[
                    { label: "Me (Main Host)", value: "self" },
                    ...coHosts.map((u) => ({ label: u.fullName, value: u.id })),
                  ]}
                />
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-1">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleClose}
            disabled={submitting}
            className="sm:flex-1"
          >
            Cancel
          </FormButton>
          <FormButton
            type="submit"
            size="lg"
            loading={submitting}
            className="sm:flex-1"
          >
            Create Membership
          </FormButton>
        </div>
      </form>
    </Modal>
  );
}
