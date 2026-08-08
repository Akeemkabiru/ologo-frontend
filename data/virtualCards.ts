export interface CardTransaction {
  id: string;
  type: "load" | "spend" | "return" | "fee" | "failed";
  merchant: string;
  amount: number; // signed: + credit to card, - debit from card
  date: string;
  identity: string; // "You", "Anonymous", or an alias
  by?: string; // which user spent (for shared cards)
}

export interface CardMember {
  id: string;
  name: string;
  avatar: string;
}

export interface VirtualCard {
  id: string;
  label: string;
  currency: string;
  number: string; // full (mock)
  expiry: string;
  cvv: string;
  balance: number; // only loaded money is spendable
  status: "active" | "frozen";
  anonymous: boolean;
  alias?: string;
  createdAt: string;
  sharedWith: CardMember[];
  transactions: CardTransaction[];
}

// Fees set & edited from the Admin dashboard.
export const CARD_FEES = {
  creation: 2, // per card created
  maintenance: 0.5, // per month
  failedTransaction: 1, // per failed (insufficient funds) attempt
};

export const cardTheme: Record<string, string> = {
  USD: "from-violet-600 to-violet-800",
  NGN: "from-emerald-600 to-emerald-800",
  EUR: "from-sky-600 to-indigo-800",
  GBP: "from-gray-800 to-gray-950",
};

export const virtualCards: VirtualCard[] = [
  {
    id: "vc1",
    label: "USD Subscriptions",
    currency: "USD",
    number: "4539 8842 1770 3021",
    expiry: "08/29",
    cvv: "221",
    balance: 320.5,
    status: "active",
    anonymous: false,
    createdAt: "Jul 20, 2026",
    sharedWith: [],
    transactions: [
      {
        id: "t1",
        type: "load",
        merchant: "Loaded from USD wallet",
        amount: 500,
        date: "Aug 1, 2026",
        identity: "You",
      },
      {
        id: "t2",
        type: "spend",
        merchant: "Netflix",
        amount: -15.99,
        date: "Aug 2, 2026",
        identity: "You",
      },
      {
        id: "t3",
        type: "spend",
        merchant: "Amazon",
        amount: -142.5,
        date: "Aug 3, 2026",
        identity: "Anonymous",
      },
      {
        id: "t4",
        type: "fee",
        merchant: "Monthly maintenance fee",
        amount: -0.5,
        date: "Aug 3, 2026",
        identity: "You",
      },
      {
        id: "t5",
        type: "return",
        merchant: "Returned to USD wallet",
        amount: -20.51,
        date: "Aug 4, 2026",
        identity: "You",
      },
    ],
  },
  {
    id: "vc2",
    label: "Naira Shopping",
    currency: "NGN",
    number: "5361 4471 8890 2245",
    expiry: "11/28",
    cvv: "884",
    balance: 45000,
    status: "active",
    anonymous: true,
    alias: "A. Shopper",
    createdAt: "Jul 12, 2026",
    sharedWith: [
      {
        id: "USR-1043",
        name: "Wade Warren",
        avatar: "https://i.pravatar.cc/64?img=12",
      },
    ],
    transactions: [
      {
        id: "t6",
        type: "load",
        merchant: "Loaded from NGN wallet",
        amount: 60000,
        date: "Jul 28, 2026",
        identity: "You",
      },
      {
        id: "t7",
        type: "spend",
        merchant: "Jumia",
        amount: -12000,
        date: "Jul 30, 2026",
        identity: "A. Shopper",
        by: "You",
      },
      {
        id: "t8",
        type: "spend",
        merchant: "Bolt",
        amount: -3000,
        date: "Aug 1, 2026",
        identity: "A. Shopper",
        by: "Wade Warren",
      },
      {
        id: "t9",
        type: "failed",
        merchant: "Failed — insufficient funds",
        amount: -1,
        date: "Aug 2, 2026",
        identity: "You",
      },
    ],
  },
  {
    id: "vc3",
    label: "Euro Travel",
    currency: "EUR",
    number: "4024 0071 5521 9930",
    expiry: "05/30",
    cvv: "512",
    balance: 0,
    status: "frozen",
    anonymous: false,
    createdAt: "Jun 30, 2026",
    sharedWith: [],
    transactions: [
      {
        id: "t10",
        type: "load",
        merchant: "Loaded from EUR wallet",
        amount: 200,
        date: "Jul 1, 2026",
        identity: "You",
      },
      {
        id: "t11",
        type: "return",
        merchant: "Returned to EUR wallet",
        amount: -200,
        date: "Jul 15, 2026",
        identity: "You",
      },
    ],
  },
];
