import { CURRENT_USER } from "@/lib/currentUser";

export interface ProfileUser {
  id: string;
  fullName: string;
  username: string;
  avatar: string;
  cover: string;
  verified: boolean;
  about: string;
  tags: string[];
  email: string;
  phone: string;
  location: string;
  joined: string;
}

export const profileUser: ProfileUser = {
  id: "USR-1042",
  fullName: CURRENT_USER.name,
  username: CURRENT_USER.username,
  avatar: CURRENT_USER.avatar,
  cover:
    "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?w=1200&h=400&fit=crop",
  verified: true,
  about:
    "Passionate about community development and social impact. I organize fundraisers, run recurring giving circles, and help causes get funded transparently.",
  tags: ["Organizer", "Donor", "Community", "Verified"],
  email: CURRENT_USER.email,
  phone: "+1 555-010-1042",
  location: "New York, USA",
  joined: "January 2024",
};

export interface ProfileEvent {
  id: string;
  name: string;
  image: string;
  current: number;
  goal: number;
  daysLeft: number;
  visibility: "public" | "private";
  recurring: boolean;
}

export const profileEvents: ProfileEvent[] = [
  {
    id: "1",
    name: "Ohayo Animal Shelter",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=400&fit=crop",
    current: 24991.6,
    goal: 35000,
    daysLeft: 142,
    visibility: "public",
    recurring: false,
  },
  {
    id: "2",
    name: "Monthly Giving Circle",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    current: 12480,
    goal: 20000,
    daysLeft: 63,
    visibility: "public",
    recurring: true,
  },
  {
    id: "9",
    name: "City Marathon Charity",
    image:
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&h=400&fit=crop",
    current: 31200,
    goal: 40000,
    daysLeft: 98,
    visibility: "public",
    recurring: false,
  },
  {
    id: "6",
    name: "Private Family Fund",
    image:
      "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=600&h=400&fit=crop",
    current: 9420,
    goal: 12000,
    daysLeft: 55,
    visibility: "private",
    recurring: true,
  },
  {
    id: "10",
    name: "Senior Care Support",
    image:
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=600&h=400&fit=crop",
    current: 7600,
    goal: 10000,
    daysLeft: 71,
    visibility: "public",
    recurring: false,
  },
  {
    id: "8",
    name: "Private School Renovation",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
    current: 4000,
    goal: 25000,
    daysLeft: 240,
    visibility: "private",
    recurring: false,
  },
];

export interface ProfileReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export const profileReviews: ProfileReview[] = [
  {
    id: "rv1",
    name: "Michael Owens",
    avatar: "https://i.pravatar.cc/64?img=13",
    rating: 5,
    text: "Ran a fully transparent fundraiser — every disbursement was documented. Highly trustworthy.",
    date: "Aug 4, 2026",
  },
  {
    id: "rv2",
    name: "Grace Okafor",
    avatar: "https://i.pravatar.cc/64?img=15",
    rating: 5,
    text: "Great communicator and organizer. My recurring donation was handled perfectly.",
    date: "Jul 28, 2026",
  },
  {
    id: "rv3",
    name: "Anonymous",
    avatar: "https://i.pravatar.cc/64?img=20",
    rating: 4,
    text: "Good experience overall, would love more frequent photo updates.",
    date: "Jul 20, 2026",
  },
];
