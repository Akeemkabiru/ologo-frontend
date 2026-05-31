"use client";
import React, { useState } from "react";
import Link from "next/link";
import { EventCard, EmptyState } from "@/components/cards/CardComponents";
import {
  Form,
  FormInput,
  FormSelect,
  FormButton,
} from "@/components/forms/FormComponents";
import { Calendar } from "lucide-react";
export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewType, setViewType] = useState<"list" | "grid">("grid");
  // Mock data - replace with API call to eventService.getEvents()
  const mockEvents = [
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
    {
      id: "2",
      name: "Community Health Initiative",
      description: "Medical camp for underprivileged communities",
      image: "https://via.placeholder.com/300",
      expectedAmount: 10000,
      amountRaised: 8500,
      currency: "USD",
      expectedDate: "2026-05-15",
      donorCount: 120,
      status: "active",
    },
  ];
  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return (
    <main className="min-h-screen  px-8 pb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-1">
            Browse and manage fundraising events
          </p>
        </div>
        <Link href="/events/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            + Create Event
          </button>
        </Link>
      </div>
      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormInput
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />
          <FormSelect
            options={[
              { label: "All Status", value: "all" },
              { label: "Active", value: "active" },
              { label: "Completed", value: "completed" },
              { label: "Archived", value: "archived" },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setViewType("grid")}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                viewType === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewType("list")}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                viewType === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>
      {/* Events Display */}
      {filteredEvents.length > 0 ? (
        <div
          className={
            viewType === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <EventCard
                event={event}
                onClick={() => console.log("View event")}
              />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Calendar size={48} />}
          title="No Events Found"
          description="No events match your search. Try adjusting your filters."
          action={{
            label: "Create Event",
            onClick: () => (window.location.href = "/events/create"),
          }}
        />
      )}
    </main>
  );
}
