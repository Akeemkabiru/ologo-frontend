"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  UserCard,
  EventCard,
  StatsCard,
} from "@/components/cards/CardComponents";
import { formatDateTime } from "@/lib/utils";
import {
  Form,
  FormInput,
  FormTextarea,
  FormButton,
} from "@/components/forms/FormComponents";
import { useForm } from "@/hooks";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
interface ProfileFormValues {
  fullName: string;
  email: string;
  phone: string;
  about: string;
}
// Mock user data - replace with API call to userService.getProfile()
const mockUser = {
  id: "user-1",
  fullName: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  phone: "+1234567890",
  profileImage: "https://via.placeholder.com/150",
  about:
    "Passionate about community development and social impact. Love organizing events and supporting great causes.",
  verified: true,
  verificationStatus: "verified",
  joinedDate: "2024-01-15",
  totalEvents: 5,
  totalDonations: 12,
  totalPledges: 3,
  tags: ["verified", "donor", "organizer"],
};
const mockUserEvents = [
  {
    id: "1",
    name: "School Fundraiser",
    description: "Help us raise funds for our school library",
    image: "https://via.placeholder.com/300",
    expectedAmount: 5000,
    amountRaised: 3500,
    currency: "USD",
    expectedDate: "2026-06-30",
    donorCount: 45,
    status: "active",
  },
];
export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm<ProfileFormValues>({
    initialValues: {
      fullName: mockUser.fullName,
      email: mockUser.email,
      phone: mockUser.phone,
      about: mockUser.about,
    },
    onSubmit: async (values) => {
      try {
        // TODO: Call userService.updateProfile()
        console.log("Updating profile:", values);
        // Mock success
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    },
  });
  return (
    <main className="min-h-screen bg-gray-50 px-8 pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">
          View and manage your profile information
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div>
          <Card>
            <div className="text-center">
              <Image
                src={mockUser.profileImage}
                alt={mockUser.fullName}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {mockUser.fullName}
              </h2>
              <p className="text-gray-600 mb-3">@{mockUser.username}</p>
              {mockUser.verified && (
                <div className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full mb-4 flex items-center gap-2">
                  <CheckCircle2 size={16} /> {mockUser.verificationStatus}
                </div>
              )}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {mockUser.totalEvents}
                  </p>
                  <p className="text-xs text-gray-600">Events</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {mockUser.totalDonations}
                  </p>
                  <p className="text-xs text-gray-600">Donations</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {mockUser.totalPledges}
                  </p>
                  <p className="text-xs text-gray-600">Pledges</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-6">
                Joined {formatDateTime(mockUser.joinedDate)}
              </p>
            </div>
          </Card>
          {/* Tags */}
          {mockUser.tags.length > 0 && (
            <Card className="mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {mockUser.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
        {/* Right Column - Profile Details */}
        <div className="lg:col-span-2">
          {/* Profile Edit Form */}
          <Card className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Profile Information
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Edit
                </button>
              )}
            </div>
            {isEditing ? (
              <Form onSubmit={handleSubmit} loading={isSubmitting}>
                <FormInput
                  label="Full Name"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fullName && !!errors.fullName}
                  errorMessage={errors.fullName}
                />
                <FormInput
                  label="Email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && !!errors.email}
                  errorMessage={errors.email}
                />
                <FormInput
                  label="Phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormTextarea
                  label="About"
                  name="about"
                  value={values.about}
                  onChange={handleChange}
                  onBlur={handleBlur as any}
                  className="min-h-24"
                />
                <div className="flex gap-4 mt-6">
                  <FormButton
                    type="submit"
                    loading={isSubmitting}
                    variant="primary"
                  >
                    Save Changes
                  </FormButton>
                  <FormButton
                    type="button"
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </FormButton>
                </div>
              </Form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-900">
                    {mockUser.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">
                    {mockUser.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">
                    {mockUser.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">About</p>
                  <p className="text-gray-700">{mockUser.about}</p>
                </div>
              </div>
            )}
          </Card>
          {/* Account Security */}
          <Card className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Account Security
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">Password</p>
                  <p className="text-sm text-gray-600">
                    Last changed 3 months ago
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">
                  Change
                </button>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <p className="font-semibold text-gray-900">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-gray-600">Not enabled</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">
                  Enable
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-600">
                    Manage notification preferences
                  </p>
                </div>
                <Link href="/settings">
                  <button className="text-blue-600 hover:text-blue-700 font-semibold">
                    Configure
                  </button>
                </Link>
              </div>
            </div>
          </Card>
          {/* My Events */}
          <Card>
            <h2 className="text-lg font-bold text-gray-900 mb-6">My Events</h2>
            <div className="grid grid-cols-1 gap-6">
              {mockUserEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <EventCard event={event} />
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
