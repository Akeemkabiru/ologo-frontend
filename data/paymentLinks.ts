export interface PaymentLink {
  id: string;
  name: string;
  amount: number;
  currency: string;
  timezone: string;
  dueAt: string;
  description?: string;
  requesterName: string; // display name (may be Anonymous / alias)
  requesterAvatar: string;
  image: string;
  tags: string[];
  hostStatus: "main" | "co-host";
  onBehalfOf?: string;
  status: "active" | "expired" | "paid";
  createdAt: string;

  // New fields for payment requests
  requestType: "personal" | "business" | "charity";
  processingFee: number; // Total processing fee (gateway + admin charges)
  taxAmount: number; // Tax amount based on request type
  feePaymentResponsibility: "wallet" | "bank" | "requestedAmount" | "payer";
  netAmount: number; // Amount receiver gets after fees (if deducted from requested amount)
}

export const TAG_SUGGESTIONS = [
  "Rent",
  "Invoice",
  "Freelance",
  "Refund",
  "Gift",
  "Event",
  "Donation",
  "Subscription",
  "Deposit",
  "Services",
  "Goods",
  "Travel",
  "Utilities",
  "Tuition",
];

export const paymentLinks: PaymentLink[] = [
  {
    id: "pl1",
    name: "August Apartment Rent",
    amount: 1200,
    currency: "USD",
    timezone: "America/New_York",
    dueAt: "Sep 1, 2026, 5:00 PM",
    description:
      "Monthly rent for the downtown apartment. Please pay before the 1st to avoid late fees.",
    requesterName: "David Mensah",
    requesterAvatar: "https://i.pravatar.cc/64?img=21",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
    tags: ["Rent", "Invoice"],
    hostStatus: "co-host",
    onBehalfOf: "Skyline Properties Ltd.",
    status: "active",
    createdAt: "Aug 6, 2026",
    requestType: "business",
    processingFee: 60,
    taxAmount: 90,
    feePaymentResponsibility: "requestedAmount",
    netAmount: 1050,
  },
  {
    id: "pl2",
    name: "Logo Design — Final Payment",
    amount: 450,
    currency: "USD",
    timezone: "UTC",
    dueAt: "Aug 20, 2026, 12:00 PM",
    description: "Final 50% payment for the completed brand identity package.",
    requesterName: "Sarah Bennett",
    requesterAvatar: "https://i.pravatar.cc/64?img=22",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=800&fit=crop",
    tags: ["Freelance", "Services"],
    hostStatus: "main",
    status: "active",
    createdAt: "Aug 5, 2026",
    requestType: "business",
    processingFee: 22.5,
    taxAmount: 33.75,
    feePaymentResponsibility: "payer",
    netAmount: 450,
  },
  {
    id: "pl3",
    name: "Group Birthday Gift — Grace",
    amount: 40,
    currency: "USD",
    timezone: "Europe/London",
    dueAt: "Aug 12, 2026, 6:00 PM",
    description: "Chipping in for Grace's surprise birthday gift 🎉",
    requesterName: "Anonymous",
    requesterAvatar: "https://i.pravatar.cc/64?img=15",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&h=800&fit=crop",
    tags: ["Gift", "Event"],
    hostStatus: "co-host",
    onBehalfOf: "The Office Team",
    status: "paid",
    createdAt: "Aug 1, 2026",
    requestType: "charity",
    processingFee: 2,
    taxAmount: 0,
    feePaymentResponsibility: "wallet",
    netAmount: 38,
  },
];

export const getPaymentLinkById = (id: string) =>
  paymentLinks.find((p) => p.id === id) ?? paymentLinks[0];
