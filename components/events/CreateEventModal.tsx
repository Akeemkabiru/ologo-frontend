"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Plus, X } from "lucide-react";
import Modal from "@/components/ui/modal";
import InputField from "@/components/ui/inputField";
import SelectField from "@/components/ui/selectField";
import TextareaField from "@/components/ui/textareaField";
import FileUploadField from "@/components/ui/fileUploadField";
import ToggleSwitch from "@/components/ui/toggleSwitch";
import { FormButton } from "@/components/forms/FormComponents";
import { useForm } from "@/hooks";
import { CURRENCIES, TIMEZONES } from "@/lib/constants";

interface EventFormValues {
  name: string;
  description: string;
  expectedAmount: string;
  currency: string;
  expectedDate: string;
  timezone: string;
  visibility: "public" | "private";
}

const initialValues: EventFormValues = {
  name: "",
  description: "",
  expectedAmount: "",
  currency: "USD",
  expectedDate: "",
  timezone: "UTC",
  visibility: "public",
};

const MAX_TAGS = 5;

interface MockUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
}

const MOCK_USERS: MockUser[] = [
  {
    id: "USR-1042",
    fullName: "Jane Cooper",
    username: "janecooper",
    email: "jane.cooper@example.com",
    phone: "+1 555-010-1042",
  },
  {
    id: "USR-1043",
    fullName: "Wade Warren",
    username: "wadewarren",
    email: "wade.warren@example.com",
    phone: "+1 555-010-1043",
  },
  {
    id: "USR-1044",
    fullName: "Esther Howard",
    username: "estherhoward",
    email: "esther.howard@example.com",
    phone: "+1 555-010-1044",
  },
  {
    id: "USR-1045",
    fullName: "Cameron Williamson",
    username: "cameronw",
    email: "cameron.w@example.com",
    phone: "+1 555-010-1045",
  },
  {
    id: "USR-1046",
    fullName: "Brooklyn Simmons",
    username: "brooklyns",
    email: "brooklyn.s@example.com",
    phone: "+1 555-010-1046",
  },
  {
    id: "USR-1047",
    fullName: "Leslie Alexander",
    username: "lesliealexander",
    email: "leslie.a@example.com",
    phone: "+1 555-010-1047",
  },
];

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function CreateEventModal({
  isOpen,
  onClose,
  onCreated,
}: CreateEventModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [hostType, setHostType] = useState<"main" | "co-host">("main");
  const [isAddingCoHost, setIsAddingCoHost] = useState(false);
  const [coHostQuery, setCoHostQuery] = useState("");
  const [selectedCoHosts, setSelectedCoHosts] = useState<MockUser[]>([]);
  const [payoutRecipient, setPayoutRecipient] = useState("self");

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
  } = useForm<EventFormValues>({
    initialValues,
    onSubmit: async (values) => {
      console.log("Creating event:", {
        ...values,
        image: imageFile,
        tags,
        hostType,
        coHosts: hostType === "co-host" ? selectedCoHosts : [],
        payoutRecipient: hostType === "co-host" ? payoutRecipient : "self",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetForm();
      setImageFile(null);
      setImagePreview(null);
      setTags([]);
      setTagInput("");
      setHostType("main");
      setIsAddingCoHost(false);
      setCoHostQuery("");
      setSelectedCoHosts([]);
      setPayoutRecipient("self");
      onClose();
      onCreated?.();
    },
    validate: (values) => {
      const errors: Partial<EventFormValues> = {};
      if (!values.name) errors.name = "Event name is required";
      if (!values.description) errors.description = "Description is required";
      return errors;
    },
  });

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

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed || tags.length >= MAX_TAGS || tags.includes(trimmed)) return;
    setTags((prev) => [...prev, trimmed]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const coHostResults = (() => {
    const q = coHostQuery.trim().toLowerCase();
    if (!q) return [];
    return MOCK_USERS.filter((user) => {
      if (selectedCoHosts.some((u) => u.id === user.id)) return false;
      return (
        user.fullName.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q) ||
        user.id.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.phone.toLowerCase().includes(q)
      );
    });
  })();

  const addCoHost = (user: MockUser) => {
    setSelectedCoHosts((prev) => [...prev, user]);
    setCoHostQuery("");
    setIsAddingCoHost(false);
  };

  const removeCoHost = (id: string) => {
    setSelectedCoHosts((prev) => prev.filter((u) => u.id !== id));
    if (payoutRecipient === id) setPayoutRecipient("self");
  };

  const handleHostTypeChange = (type: "main" | "co-host") => {
    setHostType(type);
    if (type === "main") {
      setIsAddingCoHost(false);
      setCoHostQuery("");
      setSelectedCoHosts([]);
      setPayoutRecipient("self");
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Event"
      description="Start a fundraiser and share it with your community"
      maxWidthClassName="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="grid gap-5">
        <InputField
          label="Event Name"
          placeholder="e.g., School Fundraiser"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && !!errors.name}
          errorMessage={errors.name}
          required
        />

        <TextareaField
          label="Description"
          placeholder="Describe your event, its purpose, and impact"
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.description && !!errors.description}
          errorMessage={errors.description}
          required
          rows={4}
        />

        <FileUploadField
          label="Event Image"
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
            label="Target Amount"
            placeholder="e.g., 5000 (optional)"
            name="expectedAmount"
            type="number"
            inputMode="numeric"
            value={values.expectedAmount}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <SelectField
            label="Currency"
            name="currency"
            options={CURRENCIES.map((curr) => ({ label: curr, value: curr }))}
            value={values.currency}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Completion Date"
            name="expectedDate"
            type="date"
            value={values.expectedDate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <SelectField
            label="Timezone"
            name="timezone"
            options={TIMEZONES.map((tz) => ({ label: tz, value: tz }))}
            value={values.timezone}
            onChange={handleChange}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-medium text-gray-800 mb-2.5 block">
            Tags
          </label>
          <InputField
            placeholder={
              tags.length >= MAX_TAGS
                ? "Maximum of 5 tags added"
                : "Type a tag and press Enter"
            }
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            disabled={tags.length >= MAX_TAGS}
          />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="group relative inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 text-xs font-medium pl-3 pr-2 py-1.5 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    aria-label={`Remove ${tag}`}
                    className="w-4 h-4 rounded-full bg-violet-200 hover:bg-violet-300 flex items-center justify-center opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2">
            {tags.length}/{MAX_TAGS} tags added
          </p>
        </div>

        {/* Visibility toggle */}
        <ToggleSwitch
          label="Event Visibility"
          variant="pill"
          value={values.visibility}
          onChange={(visibility) => setValues((prev) => ({ ...prev, visibility }))}
          options={[
            { label: "Public", value: "public" },
            { label: "Private", value: "private" },
          ]}
        />

        {/* Host status */}
        <SelectField
          label="Host Status"
          value={hostType}
          onChange={(e) =>
            handleHostTypeChange(e.target.value as "main" | "co-host")
          }
          options={[
            { label: "Main Host (this event is for me)", value: "main" },
            {
              label: "Co-Host (on behalf of another person or organisation)",
              value: "co-host",
            },
          ]}
        />

        {hostType === "co-host" && (
          <div className="rounded-xl border-[1.5px] border-[#7f22fe]/30 bg-white/40 p-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Co-Hosts
            </p>

            {selectedCoHosts.length > 0 && (
              <div className="flex flex-col gap-2 mb-3">
                {selectedCoHosts.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-100"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        @{user.username} · {user.id}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCoHost(user.id)}
                      aria-label={`Remove ${user.fullName}`}
                      className="shrink-0 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {isAddingCoHost ? (
              <div>
                <InputField
                  placeholder="Search by username, name, user ID, email, or phone"
                  value={coHostQuery}
                  onChange={(e) => setCoHostQuery(e.target.value)}
                  icon={<Search size={16} />}
                  autoFocus
                />
                {coHostQuery.trim() && (
                  <div className="mt-2 border border-gray-200 bg-white rounded-lg divide-y divide-gray-100 max-h-40 overflow-y-auto">
                    {coHostResults.length > 0 ? (
                      coHostResults.map((user) => (
                        <button
                          key={user.id}
                          type="button"
                          onClick={() => addCoHost(user)}
                          className="w-full flex items-center justify-between px-3 py-2 hover:bg-violet-50 text-left transition-colors"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.fullName}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              @{user.username} · {user.email}
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
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCoHost(false);
                    setCoHostQuery("");
                  }}
                  className="text-xs text-gray-500 hover:text-gray-700 font-medium mt-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingCoHost(true)}
                className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 font-medium"
              >
                <Plus size={15} />
                Add Co-Host
              </button>
            )}

            {selectedCoHosts.length > 0 && (
              <div className="mt-4">
                <SelectField
                  label="Who receives the funds raised?"
                  value={payoutRecipient}
                  onChange={(e) => setPayoutRecipient(e.target.value)}
                  options={[
                    { label: "Me (Main Host)", value: "self" },
                    ...selectedCoHosts.map((user) => ({
                      label: user.fullName,
                      value: user.id,
                    })),
                  ]}
                />
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-2">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleClose}
            disabled={isSubmitting}
            className="sm:flex-1"
          >
            Cancel
          </FormButton>
          <FormButton
            type="submit"
            size="lg"
            loading={isSubmitting}
            className="sm:flex-1"
          >
            Create Event
          </FormButton>
        </div>
      </form>
    </Modal>
  );
}
