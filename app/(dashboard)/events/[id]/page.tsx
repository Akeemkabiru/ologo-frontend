"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DonationCard, EmptyState } from "@/components/cards/CardComponents";
import { formatCurrency, formatDateTime, daysUntilDate } from "@/lib/utils";
import {
  Form,
  FormInput,
  FormCheckbox,
  FormTextarea,
  FormButton,
} from "@/components/forms/FormComponents";
import { Gift, CheckCircle2 } from "lucide-react";
import Image from "next/image";
interface EventDetailPageProps {
  params: {
    id: string;
  };
}
// Mock event data - replace with API call to eventService.getEvent(id)
const mockEvent = {
  id: "1",
  name: "School Fundraiser",
  description:
    "Help us raise funds for our school library. We aim to purchase 500 new books across various genres and create a modern reading space for our students.",
  image: "https://via.placeholder.com/600x400",
  host: {
    id: "host-1",
    fullName: "John Smith",
    profileImage: "https://via.placeholder.com/50",
    verified: true,
  },
  coHosts: [
    {
      id: "cohost-1",
      fullName: "Jane Doe",
      profileImage: "https://via.placeholder.com/50",
      verified: true,
    },
  ],
  isPrivate: false,
  tags: ["education", "children", "community"],
  expectedAmount: 5000,
  amountRaised: 3500,
  currency: "USD",
  expectedDate: "2026-06-30",
  donorCount: 45,
  createdDate: "2024-01-15",
  status: "active",
};
const mockDonations = [
  {
    id: "1",
    donorName: "Alice Johnson",
    amount: 500,
    currency: "USD",
    note: "Great initiative!",
    submittedDate: new Date().toISOString(),
    isAnonymous: false,
    aliasName: "",
  },
  {
    id: "2",
    donorName: "Bob Smith",
    amount: 250,
    currency: "USD",
    note: "Supporting education",
    submittedDate: new Date().toISOString(),
    isAnonymous: false,
    aliasName: "",
  },
];
export default function EventDetailPage({ params }: EventDetailPageProps) {
  const [donationAmount, setDonationAmount] = useState("");
  const [donationNote, setDonationNote] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [aliasName, setAliasName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const progress = Math.round(
    (mockEvent.amountRaised / mockEvent.expectedAmount) * 100,
  );
  const daysLeft = daysUntilDate(mockEvent.expectedDate);
  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: Call donationService.createDonation()
      console.log("Creating donation:", {
        eventId: mockEvent.id,
        amount: donationAmount,
        note: donationNote,
        isAnonymous,
        aliasName,
      });
      // Mock success
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDonationAmount("");
      setDonationNote("");
      alert("Donation successful!");
    } catch (error) {
      console.error("Failed to donate:", error);
      alert("Failed to process donation");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="min-h-screen  px-8 pb-8">
      {/* Back Button */}
      <Link href="/events">
        <button className="text-blue-600 hover:text-blue-700 font-semibold mb-6 flex items-center gap-2">
          ← Back to Events
        </button>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Event Details */}
        <div className="lg:col-span-2">
          {/* Event Image */}
          <div className="mb-8">
            <Image
              src={mockEvent.image}
              alt={mockEvent.name}
              width={384}
              height={100}
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
          {/* Event Title & Host */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {mockEvent.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={mockEvent.host.profileImage}
                alt={mockEvent.host.fullName}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {mockEvent.host.fullName}
                  {mockEvent.host.verified && (
                    <CheckCircle2
                      size={18}
                      className="text-blue-600 ml-1 inline"
                    />
                  )}
                </p>
                <p className="text-sm text-gray-600">Event Host</p>
              </div>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {mockEvent.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          {/* Description */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              About This Event
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {mockEvent.description}
            </p>
          </div>
          {/* Donations Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Recent Donations
            </h2>
            <div className="space-y-4">
              {mockDonations.length > 0 ? (
                mockDonations.map((donation) => (
                  <DonationCard key={donation.id} donation={donation} />
                ))
              ) : (
                <EmptyState
                  icon={<Gift size={48} />}
                  title="No Donations Yet"
                  description="Be the first to support this event"
                />
              )}
            </div>
          </div>
        </div>
        {/* Right Column - Donation Card */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-32">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">
                  Progress
                </span>
                <span className="text-sm font-semibold text-gray-600">
                  {progress}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
            {/* Stats */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Raised</span>
                <span className="font-bold text-blue-600">
                  {formatCurrency(mockEvent.amountRaised, mockEvent.currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Goal</span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(mockEvent.expectedAmount, mockEvent.currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Donors</span>
                <span className="font-bold text-gray-900">
                  {mockEvent.donorCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Days Left</span>
                <span className="font-bold text-gray-900">
                  {Math.max(0, daysLeft)} days
                </span>
              </div>
            </div>
            {/* Donation Form */}
            <Form onSubmit={handleDonate} loading={isSubmitting}>
              <FormInput
                label="Donation Amount"
                placeholder="100"
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                required
              />
              <FormTextarea
                label="Message (Optional)"
                placeholder="Share why you're supporting this event"
                value={donationNote}
                onChange={(e) => setDonationNote(e.target.value)}
                className="min-h-20"
              />
              <FormCheckbox
                label="Donate anonymously"
                checked={isAnonymous}
                onChange={(e) => {
                  setIsAnonymous(e.target.checked);
                  if (!e.target.checked) setAliasName("");
                }}
              />
              {isAnonymous && (
                <FormInput
                  label="Display Name"
                  placeholder="How should we display your name?"
                  value={aliasName}
                  onChange={(e) => setAliasName(e.target.value)}
                />
              )}
              <FormButton
                type="submit"
                loading={isSubmitting}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Donate Now
              </FormButton>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}
