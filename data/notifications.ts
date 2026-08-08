import {
  Heart,
  Lock,
  MessageCircle,
  Users,
  Handshake,
  type LucideIcon,
} from "lucide-react";

export interface AppNotification {
  id: string;
  icon: LucideIcon;
  color: string;
  title: string;
  time: string;
  unread: boolean;
}

export const notifications: AppNotification[] = [
  {
    id: "n1",
    icon: Heart,
    color: "bg-violet-100 text-violet-600",
    title: "You received a $250 donation on “Ohayo Animal Shelter”.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "n2",
    icon: Lock,
    color: "bg-amber-100 text-amber-600",
    title: "Frank released $2,000 from the escrow to Paulo & Shaggy.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "n3",
    icon: MessageCircle,
    color: "bg-emerald-100 text-emerald-600",
    title: "New message in “Premium Donors Circle”.",
    time: "3h ago",
    unread: true,
  },
  {
    id: "n4",
    icon: Users,
    color: "bg-sky-100 text-sky-600",
    title: "Grace joined your “Monthly Giving Circle” membership.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "n5",
    icon: Handshake,
    color: "bg-rose-100 text-rose-600",
    title: "Your pledge to “Clean Water Project” was fulfilled.",
    time: "2 days ago",
    unread: false,
  },
];

export const unreadCount = notifications.filter((n) => n.unread).length;
