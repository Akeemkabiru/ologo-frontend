"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Search, X, Plus } from "lucide-react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import TextareaField from "@/components/ui/textareaField";
import FileUploadField from "@/components/ui/fileUploadField";
import { FormButton } from "@/components/forms/FormComponents";
import { CURRENCIES, TIMEZONES } from "@/lib/constants";
import { TAG_SUGGESTIONS, type PaymentLink } from "@/data/paymentLinks";

const MAX_TAGS = 5;

interface CreatePaymentLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (link: PaymentLink) => void;
}

export default function CreatePaymentLinkModal({
  isOpen,
  onClose,
  onCreate,
}: CreatePaymentLinkModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("UTC");
  const [dueAt, setDueAt] = useState("");
  const [identity, setIdentity] = useState("name");
  const [alias, setAlias] = useState("");
  const [hostStatus, setHostStatus] = useState<"main" | "co-host">("main");
  const [onBehalfOf, setOnBehalfOf] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagQuery, setTagQuery] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filteredSuggestions = useMemo(() => {
    const q = tagQuery.trim().toLowerCase();
    return TAG_SUGGESTIONS.filter(
      (t) => !tags.includes(t) && (!q || t.toLowerCase().includes(q)),
    );
  }, [tagQuery, tags]);

  const canCreateNewTag =
    tagQuery.trim().length > 0 &&
    !TAG_SUGGESTIONS.some(
      (t) => t.toLowerCase() === tagQuery.trim().toLowerCase(),
    ) &&
    !tags.some((t) => t.toLowerCase() === tagQuery.trim().toLowerCase());

  const addTag = (tag: string) => {
    const t = tag.trim();
    if (!t || tags.length >= MAX_TAGS || tags.includes(t)) return;
    setTags((prev) => [...prev, t]);
    setTagQuery("");
  };

  const removeTag = (tag: string) =>
    setTags((prev) => prev.filter((t) => t !== tag));

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

  const reset = () => {
    setName("");
    setDescription("");
    setAmount("");
    setCurrency("USD");
    setTimezone("UTC");
    setDueAt("");
    setIdentity("name");
    setAlias("");
    setHostStatus("main");
    setOnBehalfOf("");
    setImagePreview(null);
    setImageFile(null);
    setTags([]);
    setTagQuery("");
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
    const requesterName =
      identity === "anonymous"
        ? "Anonymous"
        : identity === "alias" && alias.trim()
          ? alias.trim()
          : "You";
    const link: PaymentLink = {
      id: `pl-${Date.now()}`,
      name: name.trim(),
      amount: Number(amount),
      currency,
      timezone,
      dueAt: dueAt
        ? new Date(dueAt).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "No expiry",
      description: description.trim() || undefined,
      requesterName,
      requesterAvatar: "https://i.pravatar.cc/64?img=21",
      image:
        imagePreview ??
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop",
      tags,
      hostStatus,
      onBehalfOf: hostStatus === "co-host" ? onBehalfOf.trim() : undefined,
      status: "active",
      createdAt: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    console.log("Payment link created:", link, { imageFile });
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    onCreate(link);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Payment Link"
      description="Share a link and get paid — one-time or recurring"
      maxWidthClassName="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        <InputField
          label="Payment Link Name"
          placeholder="e.g., August Apartment Rent"
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
          label="Description"
          placeholder="What is this payment for?"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Expected Amount"
            placeholder="e.g., 1200"
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

        {/* Tags with search */}
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
                    onClick={() => removeTag(tag)}
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
          {tags.length < MAX_TAGS && (tagQuery || filteredSuggestions.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-2.5">
              {canCreateNewTag && (
                <button
                  type="button"
                  onClick={() => addTag(tagQuery)}
                  className="inline-flex items-center gap-1 bg-violet-600 text-white text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <Plus size={12} />
                  Create “{tagQuery.trim()}”
                </button>
              )}
              {filteredSuggestions.slice(0, 10).map((t) => (
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

        {/* Identity */}
        <div>
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
            <div className="mt-4">
              <InputField
                label="Alias name"
                placeholder="e.g., The Landlord"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Host status */}
        <div>
          <SelectField
            label="Your status"
            value={hostStatus}
            onChange={(e) =>
              setHostStatus(e.target.value as "main" | "co-host")
            }
            options={[
              { label: "Main host (the money is for me)", value: "main" },
              {
                label: "Co-host (on behalf of another person or organisation)",
                value: "co-host",
              },
            ]}
          />
          {hostStatus === "co-host" && (
            <div className="mt-4">
              <InputField
                label="On behalf of"
                placeholder="Person or organisation name"
                value={onBehalfOf}
                onChange={(e) => setOnBehalfOf(e.target.value)}
              />
            </div>
          )}
        </div>

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
            Create Link
          </FormButton>
        </div>
      </form>
    </Modal>
  );
}
