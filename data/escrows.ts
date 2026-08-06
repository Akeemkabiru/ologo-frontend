export interface EscrowItem {
  id: string;
  name: string;
  verified: boolean;
  image: string;
  releaseDeadline: string;
  inEscrow: number;
  total: number;
  daysLeft: number;
  parties: string[];
  partyCount: number;
  visibility: "mine" | "private" | "public";
  status: "in-progress" | "finished" | "upcoming";
}

export const escrows: EscrowItem[] = [
  {
    id: "e1",
    name: "Website Redesign Project",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    releaseDeadline: "12 Dec 2026, 01:00am",
    inEscrow: 4200,
    total: 6000,
    daysLeft: 142,
    parties: [
      "https://i.pravatar.cc/64?img=21",
      "https://i.pravatar.cc/64?img=22",
    ],
    partyCount: 2,
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "e2",
    name: "Downtown Apartment Deposit",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    releaseDeadline: "18 Jan 2027, 09:00am",
    inEscrow: 8500,
    total: 12000,
    daysLeft: 63,
    parties: [
      "https://i.pravatar.cc/64?img=31",
      "https://i.pravatar.cc/64?img=32",
    ],
    partyCount: 2,
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "e3",
    name: "Used Tesla Model 3 Sale",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop",
    releaseDeadline: "30 Nov 2026, 06:00pm",
    inEscrow: 15000,
    total: 32000,
    daysLeft: 28,
    parties: [
      "https://i.pravatar.cc/64?img=41",
      "https://i.pravatar.cc/64?img=42",
    ],
    partyCount: 2,
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "e4",
    name: "Mobile App Development",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=600&h=400&fit=crop",
    releaseDeadline: "08 Jan 2027, 04:00pm",
    inEscrow: 9800,
    total: 18000,
    daysLeft: 74,
    parties: [
      "https://i.pravatar.cc/64?img=43",
      "https://i.pravatar.cc/64?img=44",
    ],
    partyCount: 2,
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "e5",
    name: "Logo & Brand Package",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
    releaseDeadline: "04 Jun 2026, 10:00am",
    inEscrow: 3500,
    total: 3500,
    daysLeft: 0,
    parties: [
      "https://i.pravatar.cc/64?img=51",
      "https://i.pravatar.cc/64?img=52",
    ],
    partyCount: 2,
    visibility: "mine",
    status: "finished",
  },
  {
    id: "e6",
    name: "Wedding Photography Booking",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    releaseDeadline: "10 Feb 2027, 08:00am",
    inEscrow: 0,
    total: 4500,
    daysLeft: 210,
    parties: [
      "https://i.pravatar.cc/64?img=53",
      "https://i.pravatar.cc/64?img=54",
    ],
    partyCount: 2,
    visibility: "mine",
    status: "upcoming",
  },
  {
    id: "e7",
    name: "Office Equipment Purchase",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    releaseDeadline: "22 Dec 2026, 02:00pm",
    inEscrow: 6200,
    total: 9000,
    daysLeft: 55,
    parties: [
      "https://i.pravatar.cc/64?img=61",
      "https://i.pravatar.cc/64?img=62",
    ],
    partyCount: 2,
    visibility: "private",
    status: "in-progress",
  },
  {
    id: "e8",
    name: "Contract Legal Review",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
    releaseDeadline: "05 Sep 2026, 11:00am",
    inEscrow: 2400,
    total: 2400,
    daysLeft: 0,
    parties: [
      "https://i.pravatar.cc/64?img=63",
      "https://i.pravatar.cc/64?img=64",
    ],
    partyCount: 2,
    visibility: "private",
    status: "finished",
  },
  {
    id: "e9",
    name: "Warehouse Lease Agreement",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop",
    releaseDeadline: "14 Mar 2027, 09:00am",
    inEscrow: 0,
    total: 25000,
    daysLeft: 240,
    parties: [
      "https://i.pravatar.cc/64?img=65",
      "https://i.pravatar.cc/64?img=66",
    ],
    partyCount: 2,
    visibility: "private",
    status: "upcoming",
  },
  {
    id: "e10",
    name: "Premium Domain Transfer",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
    releaseDeadline: "19 Dec 2026, 07:00am",
    inEscrow: 11200,
    total: 18000,
    daysLeft: 98,
    parties: [
      "https://i.pravatar.cc/64?img=71",
      "https://i.pravatar.cc/64?img=72",
    ],
    partyCount: 2,
    visibility: "public",
    status: "in-progress",
  },
  {
    id: "e11",
    name: "Custom Furniture Order",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&h=400&fit=crop",
    releaseDeadline: "27 Jan 2027, 03:00pm",
    inEscrow: 3600,
    total: 5000,
    daysLeft: 71,
    parties: [
      "https://i.pravatar.cc/64?img=74",
      "https://i.pravatar.cc/64?img=75",
    ],
    partyCount: 2,
    visibility: "public",
    status: "in-progress",
  },
  {
    id: "e12",
    name: "Consulting Retainer",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    releaseDeadline: "11 Aug 2026, 05:00pm",
    inEscrow: 7000,
    total: 7000,
    daysLeft: 0,
    parties: [
      "https://i.pravatar.cc/64?img=76",
      "https://i.pravatar.cc/64?img=77",
    ],
    partyCount: 2,
    visibility: "public",
    status: "finished",
  },
  {
    id: "e13",
    name: "SaaS Reseller Agreement",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    releaseDeadline: "02 Apr 2027, 01:00pm",
    inEscrow: 0,
    total: 22000,
    daysLeft: 270,
    parties: [
      "https://i.pravatar.cc/64?img=78",
      "https://i.pravatar.cc/64?img=12",
    ],
    partyCount: 2,
    visibility: "public",
    status: "upcoming",
  },
];

export const getEscrowById = (id: string) => escrows.find((e) => e.id === id);
