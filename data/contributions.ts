export type ContributionType = "donation" | "note" | "pledge" | "review";

export interface Contribution {
  id: string;
  type: ContributionType;
  name: string;
  avatar: string;
  amount?: number;
  rating?: number;
  text?: string;
  date: string;
  recurring?: boolean;
}

export const contributions: Contribution[] = [
  {
    id: "1",
    type: "donation",
    name: "Anonymous",
    avatar: "https://i.pravatar.cc/64?img=11",
    amount: 250,
    text: "Glad to help however I can this winter.",
    date: "Aug 6, 2026",
  },
  {
    id: "2",
    type: "review",
    name: "Michael Owens",
    avatar: "https://i.pravatar.cc/64?img=12",
    rating: 5,
    text: "Transparent and well-run campaign. Every update is documented.",
    date: "Aug 6, 2026",
  },
  {
    id: "3",
    type: "pledge",
    name: "Sarah Bennett",
    avatar: "https://i.pravatar.cc/64?img=13",
    amount: 500,
    recurring: true,
    text: "Pledging monthly until the goal is met.",
    date: "Aug 5, 2026",
  },
  {
    id: "4",
    type: "donation",
    name: "A Well-wisher",
    avatar: "https://i.pravatar.cc/64?img=14",
    amount: 100,
    text: "Wishing you all the best with the shelter drive!",
    date: "Aug 5, 2026",
  },
  {
    id: "5",
    type: "note",
    name: "Grace Okafor",
    avatar: "https://i.pravatar.cc/64?img=15",
    text: "Shared this with my community group — hope it brings more support.",
    date: "Aug 5, 2026",
  },
  {
    id: "6",
    type: "donation",
    name: "David Mensah",
    avatar: "https://i.pravatar.cc/64?img=16",
    amount: 1000,
    text: "Every bit counts. Stay strong.",
    date: "Aug 4, 2026",
  },
  {
    id: "7",
    type: "review",
    name: "Anonymous",
    avatar: "https://i.pravatar.cc/64?img=17",
    rating: 4,
    text: "Great cause. Would love more frequent photo updates.",
    date: "Aug 4, 2026",
  },
  {
    id: "8",
    type: "pledge",
    name: "Frank Adeyemi",
    avatar: "https://i.pravatar.cc/64?img=18",
    amount: 300,
    text: "Pledging once my next paycheck clears.",
    date: "Aug 3, 2026",
  },
  {
    id: "9",
    type: "donation",
    name: "Paulo Santos",
    avatar: "https://i.pravatar.cc/64?img=19",
    amount: 75,
    date: "Aug 3, 2026",
  },
  {
    id: "10",
    type: "note",
    name: "Anonymous",
    avatar: "https://i.pravatar.cc/64?img=20",
    text: "Keep up the great work, the whole team is doing amazing.",
    date: "Aug 2, 2026",
  },
  {
    id: "11",
    type: "donation",
    name: "Shaggy Bello",
    avatar: "https://i.pravatar.cc/64?img=32",
    amount: 150,
    text: "Happy to contribute.",
    date: "Aug 2, 2026",
  },
  {
    id: "12",
    type: "review",
    name: "Esther Howard",
    avatar: "https://i.pravatar.cc/64?img=33",
    rating: 5,
    text: "Donated and got a receipt instantly. Very trustworthy platform.",
    date: "Aug 1, 2026",
  },
  {
    id: "13",
    type: "pledge",
    name: "Anonymous",
    avatar: "https://i.pravatar.cc/64?img=34",
    amount: 200,
    date: "Aug 1, 2026",
  },
  {
    id: "14",
    type: "donation",
    name: "Cameron Williamson",
    avatar: "https://i.pravatar.cc/64?img=35",
    amount: 400,
    text: "For the winter coat drive. Stay warm, everyone.",
    date: "Jul 31, 2026",
  },
];
