import {
  Home,
  Calendar,
  Wallet,
  Gift,
  Handshake,
  Users,
  Lock,
  CreditCard,
  MessageCircle,
} from "lucide-react";

export const mainNavItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Calendar, label: "Events", href: "/events" },
  { icon: Wallet, label: "Wallet", href: "/wallet" },
  { icon: Gift, label: "Donations", href: "/donations" },
  { icon: Handshake, label: "Pledges", href: "/pledges" },
  { icon: Users, label: "Memberships", href: "/memberships" },
  { icon: Lock, label: "Escrow", href: "/escrow" },
  { icon: CreditCard, label: "Virtual Cards", href: "/virtual-cards" },
  { icon: MessageCircle, label: "Messages", href: "/chat" },
];
