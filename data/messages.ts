export type ChatType = "event" | "escrow" | "membership";

export interface Attachment {
  kind: "file" | "link";
  label: string;
  url?: string;
  meta?: string; // file size, or link domain
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  time: string;
  text?: string;
  attachment?: Attachment;
  self?: boolean;
}

export interface Conversation {
  id: string;
  type: ChatType;
  name: string;
  image: string;
  members: number;
  lastMessage: string;
  lastTime: string;
  unread: number;
  joinedAtId: string; // messages before this were sent before you joined
  messages: Message[];
}

export const chatTypeLabel: Record<ChatType, string> = {
  event: "Event",
  escrow: "Escrow",
  membership: "Membership",
};

export const chatTypeStyles: Record<ChatType, string> = {
  event: "bg-violet-100 text-violet-700",
  escrow: "bg-amber-100 text-amber-700",
  membership: "bg-emerald-100 text-emerald-700",
};

export const conversations: Conversation[] = [
  {
    id: "c1",
    type: "event",
    name: "Shelter Support for Homeless",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop",
    members: 128,
    lastMessage: "Here's the winter coat distribution plan.",
    lastTime: "10:42 AM",
    unread: 2,
    joinedAtId: "m3",
    messages: [
      {
        id: "m1",
        senderId: "u2",
        senderName: "Michael Owens",
        senderAvatar: "https://i.pravatar.cc/64?img=12",
        time: "Aug 3, 09:00 AM",
        text: "Welcome everyone to the shelter support group!",
      },
      {
        id: "m2",
        senderId: "u3",
        senderName: "Grace Okafor",
        senderAvatar: "https://i.pravatar.cc/64?img=15",
        time: "Aug 3, 09:05 AM",
        text: "Here's the outreach schedule for reference.",
        attachment: {
          kind: "file",
          label: "outreach-schedule.pdf",
          meta: "220 KB",
        },
      },
      {
        id: "m3",
        senderId: "sys",
        senderName: "",
        senderAvatar: "",
        time: "Aug 4, 08:00 AM",
        text: "You joined the chat",
      },
      {
        id: "m4",
        senderId: "u2",
        senderName: "Michael Owens",
        senderAvatar: "https://i.pravatar.cc/64?img=12",
        time: "Aug 4, 08:12 AM",
        text: "Good morning! Sharing our donation portal below.",
        attachment: {
          kind: "link",
          label: "give.example.org/shelter",
          url: "https://give.example.org/shelter",
          meta: "give.example.org",
        },
      },
      {
        id: "m5",
        senderId: "me",
        senderName: "You",
        senderAvatar: "https://i.pravatar.cc/64?img=21",
        time: "Aug 4, 08:20 AM",
        text: "Thanks! Just donated and shared with my network.",
        self: true,
      },
      {
        id: "m6",
        senderId: "u3",
        senderName: "Grace Okafor",
        senderAvatar: "https://i.pravatar.cc/64?img=15",
        time: "Aug 4, 10:42 AM",
        text: "Here's the winter coat distribution plan.",
        attachment: {
          kind: "file",
          label: "coat-distribution.xlsx",
          meta: "48 KB",
        },
      },
    ],
  },
  {
    id: "c2",
    type: "escrow",
    name: "Food Support for Paulo & Shaggy",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop",
    members: 5,
    lastMessage: "Reference for fair market prices here.",
    lastTime: "Yesterday",
    unread: 0,
    joinedAtId: "e1",
    messages: [
      {
        id: "e1",
        senderId: "u1",
        senderName: "David Mensah",
        senderAvatar: "https://i.pravatar.cc/64?img=21",
        time: "Aug 3, 09:12 AM",
        text: "I've deposited $4,200 into escrow. Frank, please handle food payments.",
      },
      {
        id: "e2",
        senderId: "u4",
        senderName: "Frank Adeyemi",
        senderAvatar: "https://i.pravatar.cc/64?img=23",
        time: "Aug 3, 09:40 AM",
        text: "Got it. I'll review the request forms first.",
      },
      {
        id: "e3",
        senderId: "u5",
        senderName: "Paulo Santos",
        senderAvatar: "https://i.pravatar.cc/64?img=25",
        time: "Aug 4, 08:05 AM",
        text: "Shared my grocery list for this week.",
        attachment: { kind: "file", label: "grocery-list.pdf", meta: "90 KB" },
      },
      {
        id: "e4",
        senderId: "u3",
        senderName: "Grace Okafor",
        senderAvatar: "https://i.pravatar.cc/64?img=24",
        time: "Aug 4, 10:22 AM",
        text: "Reference for fair market prices here.",
        attachment: {
          kind: "link",
          label: "market-prices.example.com",
          url: "https://market-prices.example.com",
          meta: "market-prices.example.com",
        },
      },
    ],
  },
  {
    id: "c3",
    type: "membership",
    name: "Premium Donors Circle",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&h=200&fit=crop",
    members: 42,
    lastMessage: "Next members-only call is scheduled.",
    lastTime: "Mon",
    unread: 5,
    joinedAtId: "b1",
    messages: [
      {
        id: "b1",
        senderId: "u6",
        senderName: "Esther Howard",
        senderAvatar: "https://i.pravatar.cc/64?img=33",
        time: "Aug 1, 02:00 PM",
        text: "Welcome to the Premium Donors Circle 🎉",
      },
      {
        id: "b2",
        senderId: "u6",
        senderName: "Esther Howard",
        senderAvatar: "https://i.pravatar.cc/64?img=33",
        time: "Aug 1, 02:03 PM",
        text: "Here's our impact report for last quarter.",
        attachment: {
          kind: "file",
          label: "impact-report-q2.pdf",
          meta: "1.2 MB",
        },
      },
      {
        id: "b3",
        senderId: "u7",
        senderName: "Cameron Williamson",
        senderAvatar: "https://i.pravatar.cc/64?img=35",
        time: "Aug 3, 11:15 AM",
        text: "Join the next call using this link.",
        attachment: {
          kind: "link",
          label: "meet.example.com/donors",
          url: "https://meet.example.com/donors",
          meta: "meet.example.com",
        },
      },
      {
        id: "b4",
        senderId: "u6",
        senderName: "Esther Howard",
        senderAvatar: "https://i.pravatar.cc/64?img=33",
        time: "Mon, 09:30 AM",
        text: "Next members-only call is scheduled.",
      },
    ],
  },
];
