export type Designation = "Host" | "Decider" | "Beneficiary" | "Witness";

export const designationStyles: Record<Designation, string> = {
  Host: "bg-violet-100 text-violet-700",
  Decider: "bg-amber-100 text-amber-700",
  Beneficiary: "bg-emerald-100 text-emerald-700",
  Witness: "bg-gray-100 text-gray-600",
};

export interface EscrowMember {
  id: string;
  name: string;
  role: Designation;
  avatar: string;
  note: string;
  alias?: string;
}

export const escrowMembers: EscrowMember[] = [
  {
    id: "1",
    name: "David Mensah",
    role: "Host",
    avatar: "https://i.pravatar.cc/64?img=21",
    note: "Created the escrow & deposits funds",
  },
  {
    id: "2",
    name: "Frank Adeyemi",
    role: "Decider",
    avatar: "https://i.pravatar.cc/64?img=23",
    note: "Appointed to approve & distribute funds",
  },
  {
    id: "3",
    name: "Paulo Santos",
    role: "Beneficiary",
    avatar: "https://i.pravatar.cc/64?img=25",
    note: "Receives approved payments",
  },
  {
    id: "4",
    name: "Shaggy Bello",
    role: "Beneficiary",
    avatar: "https://i.pravatar.cc/64?img=26",
    note: "Receives approved payments",
  },
  {
    id: "5",
    name: "Grace Okafor",
    role: "Witness",
    avatar: "https://i.pravatar.cc/64?img=24",
    note: "Invited to observe & verify",
  },
];

export interface RequestForm {
  id: string;
  name: string;
  avatar: string;
  amount: number;
  reason: string;
  note: string;
  date: string;
  status: "pending" | "paid";
}

export const escrowRequestForms: RequestForm[] = [
  {
    id: "r1",
    name: "Paulo Santos",
    avatar: "https://i.pravatar.cc/64?img=25",
    amount: 1000,
    reason: "Groceries for the week",
    note: "Need to restock food for the household.",
    date: "August 4, 2026",
    status: "pending",
  },
  {
    id: "r2",
    name: "Shaggy Bello",
    avatar: "https://i.pravatar.cc/64?img=26",
    amount: 1500,
    reason: "Groceries + cooking gas",
    note: "Requesting a bit more to cover gas refill.",
    date: "August 4, 2026",
    status: "pending",
  },
];

export interface ChatMessage {
  id: string;
  name: string;
  avatar: string;
  time: string;
  text: string;
  attachment?: { kind: "file" | "link"; label: string };
}

export const escrowChat: ChatMessage[] = [
  {
    id: "c1",
    name: "David Mensah",
    avatar: "https://i.pravatar.cc/64?img=21",
    time: "Aug 3, 09:12 AM",
    text: "I've deposited $4,200 into the escrow. Frank, you're the Decider — please handle food payments for Paulo and Shaggy.",
  },
  {
    id: "c2",
    name: "Frank Adeyemi",
    avatar: "https://i.pravatar.cc/64?img=23",
    time: "Aug 3, 09:40 AM",
    text: "Got it. I'll review their request forms before releasing anything.",
  },
  {
    id: "c3",
    name: "Paulo Santos",
    avatar: "https://i.pravatar.cc/64?img=25",
    time: "Aug 4, 08:05 AM",
    text: "Shared my grocery list for this week.",
    attachment: { kind: "file", label: "grocery-list.pdf" },
  },
  {
    id: "c4",
    name: "Grace Okafor",
    avatar: "https://i.pravatar.cc/64?img=24",
    time: "Aug 4, 10:22 AM",
    text: "Reference for fair market prices here.",
    attachment: { kind: "link", label: "market-prices.example.com" },
  },
];

export interface FormRecord {
  id: string;
  type: "Deposit" | "Request" | "Decider";
  by: string;
  avatar: string;
  date: string;
  amount: number;
  summary: string;
}

export const escrowFormRecords: FormRecord[] = [
  {
    id: "f1",
    type: "Deposit",
    by: "David Mensah",
    avatar: "https://i.pravatar.cc/64?img=21",
    date: "August 3, 2026",
    amount: 4200,
    summary: "Deposited funds into escrow",
  },
  {
    id: "f2",
    type: "Request",
    by: "Paulo Santos",
    avatar: "https://i.pravatar.cc/64?img=25",
    date: "August 4, 2026",
    amount: 1000,
    summary: "Groceries for the week",
  },
  {
    id: "f3",
    type: "Request",
    by: "Shaggy Bello",
    avatar: "https://i.pravatar.cc/64?img=26",
    date: "August 4, 2026",
    amount: 1500,
    summary: "Groceries + cooking gas",
  },
  {
    id: "f4",
    type: "Decider",
    by: "Frank Adeyemi",
    avatar: "https://i.pravatar.cc/64?img=23",
    date: "August 5, 2026",
    amount: 2000,
    summary: "Paid Paulo $1,000 and Shaggy $1,000 for food",
  },
];

export interface EscrowUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export const escrowUpdates: EscrowUpdate[] = [
  {
    id: "1",
    date: "August 5, 2026",
    title: "First Food Payment Released",
    description:
      "Frank (Decider) reviewed the request forms and released $1,000 each to Paulo and Shaggy for groceries. $2,200 remains in escrow for the coming weeks.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=500&fit=crop",
  },
  {
    id: "2",
    date: "August 3, 2026",
    title: "Escrow Funded",
    description:
      "David deposited $4,200 into escrow and appointed Frank as the Decider to distribute food money to Paulo and Shaggy.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
  },
];

export const escrowFundDetails = {
  released: 2000,
  held: 2200,
  breakdown: [
    {
      date: "August 5, 2026",
      purpose: "Food payment — Paulo & Shaggy",
      release: 2000,
      platformFee: 40,
    },
    {
      date: "August 3, 2026",
      purpose: "Initial deposit into escrow",
      release: 0,
      platformFee: 84,
    },
  ],
};

export const fallbackEscrow = {
  name: "Food Support for Paulo & Shaggy",
  secured: true,
  image:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=800&fit=crop",
  currency: "USD",
  inEscrow: 2200,
  total: 4200,
  timeLeft: "142 days left",
  partyCount: escrowMembers.length,
  description:
    "Funds are held in escrow and released to the beneficiaries only when a Decider approves. The Host deposits money and appoints a Decider (or themselves) to distribute it, invites Witnesses to observe and verify, and beneficiaries can raise Request Forms that every member can see. A neutral Decider can step in before any funds move.",
};

export const deciderBeneficiaries = [
  {
    id: "b1",
    name: "Paulo Santos",
    avatar: "https://i.pravatar.cc/64?img=25",
    requestedAmount: 1000,
  },
  {
    id: "b2",
    name: "Shaggy Bello",
    avatar: "https://i.pravatar.cc/64?img=26",
    requestedAmount: 1500,
  },
];

export const money = (n: number) =>
  `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
