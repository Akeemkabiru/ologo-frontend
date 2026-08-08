export interface MyDonation {
  id: string;
  eventId: string;
  eventName: string;
  image: string;
  amount: number;
  currency: string;
  type: "one-time" | "recurring";
  frequency?: string;
  status: "completed" | "scheduled";
  anonymous?: boolean;
  note?: string;
  date: string;
}

export const myDonations: MyDonation[] = [
  {
    id: "d1",
    eventId: "1",
    eventName: "Ohayo Animal Shelter",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop",
    amount: 250,
    currency: "USD",
    type: "one-time",
    status: "completed",
    note: "Glad to help the animals this winter.",
    date: "Aug 6, 2026",
  },
  {
    id: "d2",
    eventId: "2",
    eventName: "Bright Future Foundation",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
    amount: 100,
    currency: "USD",
    type: "recurring",
    frequency: "Monthly",
    status: "scheduled",
    date: "Aug 5, 2026",
  },
  {
    id: "d3",
    eventId: "9",
    eventName: "City Marathon Charity",
    image:
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=400&h=300&fit=crop",
    amount: 500,
    currency: "USD",
    type: "one-time",
    status: "completed",
    anonymous: true,
    note: "Anonymous gift for a great cause.",
    date: "Aug 3, 2026",
  },
  {
    id: "d4",
    eventId: "6",
    eventName: "Downtown Food Bank",
    image:
      "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=400&h=300&fit=crop",
    amount: 75,
    currency: "USD",
    type: "one-time",
    status: "completed",
    date: "Aug 1, 2026",
  },
  {
    id: "d5",
    eventId: "3",
    eventName: "Green Earth Initiative",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    amount: 50,
    currency: "USD",
    type: "recurring",
    frequency: "Weekly",
    status: "scheduled",
    note: "Small weekly support for the planet.",
    date: "Jul 30, 2026",
  },
  {
    id: "d6",
    eventId: "10",
    eventName: "Senior Care Support",
    image:
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=400&h=300&fit=crop",
    amount: 200,
    currency: "USD",
    type: "one-time",
    status: "completed",
    date: "Jul 28, 2026",
  },
  {
    id: "d7",
    eventId: "11",
    eventName: "Community Garden",
    image:
      "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&h=300&fit=crop",
    amount: 120,
    currency: "USD",
    type: "one-time",
    status: "completed",
    note: "Love seeing this grow.",
    date: "Jul 25, 2026",
  },
  {
    id: "d8",
    eventId: "4",
    eventName: "Clean Water Project",
    image:
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=400&h=300&fit=crop",
    amount: 300,
    currency: "USD",
    type: "recurring",
    frequency: "Monthly",
    status: "scheduled",
    date: "Jul 22, 2026",
  },
];
