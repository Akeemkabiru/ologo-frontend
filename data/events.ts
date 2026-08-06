export interface EventItem {
  id: string;
  name: string;
  verified: boolean;
  image: string;
  depositDeadline: string;
  requestTime: string;
  current: number;
  goal: number;
  daysLeft: number;
  donorCount: number;
  donors: string[];
  visibility: "mine" | "private" | "public";
  status: "in-progress" | "finished" | "upcoming";
}

export const events: EventItem[] = [
  {
    id: "1",
    name: "Ohayo Animal Shelter",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=400&fit=crop",
    depositDeadline: "12 Dec 2026, 01:00am",
    requestTime: "02 Dec 2026, 01:00am",
    current: 24991.6,
    goal: 35000,
    daysLeft: 142,
    donorCount: 139,
    donors: [
      "https://i.pravatar.cc/64?img=21",
      "https://i.pravatar.cc/64?img=22",
      "https://i.pravatar.cc/64?img=23",
    ],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "2",
    name: "Bright Future Foundation",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    depositDeadline: "18 Jan 2027, 09:00am",
    requestTime: "05 Jan 2027, 09:00am",
    current: 12480,
    goal: 20000,
    daysLeft: 63,
    donorCount: 82,
    donors: [
      "https://i.pravatar.cc/64?img=31",
      "https://i.pravatar.cc/64?img=32",
      "https://i.pravatar.cc/64?img=33",
    ],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "3",
    name: "Green Earth Initiative",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    depositDeadline: "30 Nov 2026, 06:00pm",
    requestTime: "15 Nov 2026, 06:00pm",
    current: 5230.5,
    goal: 15000,
    daysLeft: 28,
    donorCount: 47,
    donors: [
      "https://i.pravatar.cc/64?img=41",
      "https://i.pravatar.cc/64?img=42",
    ],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "3b",
    name: "Riverside Cleanup Crew",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&h=400&fit=crop",
    depositDeadline: "08 Jan 2027, 04:00pm",
    requestTime: "22 Dec 2026, 04:00pm",
    current: 9800,
    goal: 16000,
    daysLeft: 74,
    donorCount: 61,
    donors: [
      "https://i.pravatar.cc/64?img=43",
      "https://i.pravatar.cc/64?img=44",
    ],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "3c",
    name: "Paws & Claws Rescue",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop",
    depositDeadline: "21 Feb 2027, 10:00am",
    requestTime: "05 Feb 2027, 10:00am",
    current: 3100,
    goal: 9000,
    daysLeft: 118,
    donorCount: 22,
    donors: ["https://i.pravatar.cc/64?img=45"],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "3d",
    name: "Hope Housing Project",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    depositDeadline: "16 Mar 2027, 09:00am",
    requestTime: "01 Mar 2027, 09:00am",
    current: 15400,
    goal: 30000,
    daysLeft: 156,
    donorCount: 97,
    donors: [
      "https://i.pravatar.cc/64?img=46",
      "https://i.pravatar.cc/64?img=47",
    ],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "3e",
    name: "Little Sprouts Nursery Fund",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
    depositDeadline: "29 Apr 2027, 12:00pm",
    requestTime: "12 Apr 2027, 12:00pm",
    current: 2200,
    goal: 7000,
    daysLeft: 199,
    donorCount: 14,
    donors: ["https://i.pravatar.cc/64?img=48"],
    visibility: "mine",
    status: "in-progress",
  },
  {
    id: "4",
    name: "Clean Water Project",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&h=400&fit=crop",
    depositDeadline: "04 Jun 2026, 10:00am",
    requestTime: "20 May 2026, 10:00am",
    current: 18000,
    goal: 18000,
    daysLeft: 0,
    donorCount: 210,
    donors: [
      "https://i.pravatar.cc/64?img=51",
      "https://i.pravatar.cc/64?img=52",
    ],
    visibility: "mine",
    status: "finished",
  },
  {
    id: "5",
    name: "Winter Coat Drive",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1608889175638-9e0d7e5e9e0c?w=600&h=400&fit=crop",
    depositDeadline: "10 Feb 2027, 08:00am",
    requestTime: "01 Feb 2027, 08:00am",
    current: 0,
    goal: 8000,
    daysLeft: 210,
    donorCount: 0,
    donors: [],
    visibility: "mine",
    status: "upcoming",
  },
  {
    id: "6",
    name: "Downtown Food Bank",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=600&h=400&fit=crop",
    depositDeadline: "22 Dec 2026, 02:00pm",
    requestTime: "10 Dec 2026, 02:00pm",
    current: 9420,
    goal: 12000,
    daysLeft: 55,
    donorCount: 64,
    donors: [
      "https://i.pravatar.cc/64?img=61",
      "https://i.pravatar.cc/64?img=62",
    ],
    visibility: "private",
    status: "in-progress",
  },
  {
    id: "7",
    name: "Neighborhood Watch Fund",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
    depositDeadline: "05 Sep 2026, 11:00am",
    requestTime: "20 Aug 2026, 11:00am",
    current: 4000,
    goal: 4000,
    daysLeft: 0,
    donorCount: 31,
    donors: ["https://i.pravatar.cc/64?img=63"],
    visibility: "private",
    status: "finished",
  },
  {
    id: "8",
    name: "School Renovation",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
    depositDeadline: "14 Mar 2027, 09:00am",
    requestTime: "01 Mar 2027, 09:00am",
    current: 0,
    goal: 25000,
    daysLeft: 240,
    donorCount: 0,
    donors: [],
    visibility: "private",
    status: "upcoming",
  },
  {
    id: "9",
    name: "City Marathon Charity",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&h=400&fit=crop",
    depositDeadline: "19 Dec 2026, 07:00am",
    requestTime: "01 Dec 2026, 07:00am",
    current: 31200,
    goal: 40000,
    daysLeft: 98,
    donorCount: 305,
    donors: [
      "https://i.pravatar.cc/64?img=71",
      "https://i.pravatar.cc/64?img=72",
      "https://i.pravatar.cc/64?img=73",
    ],
    visibility: "public",
    status: "in-progress",
  },
  {
    id: "10",
    name: "Senior Care Support",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=600&h=400&fit=crop",
    depositDeadline: "27 Jan 2027, 03:00pm",
    requestTime: "15 Jan 2027, 03:00pm",
    current: 7600,
    goal: 10000,
    daysLeft: 71,
    donorCount: 58,
    donors: [
      "https://i.pravatar.cc/64?img=74",
      "https://i.pravatar.cc/64?img=75",
    ],
    visibility: "public",
    status: "in-progress",
  },
  {
    id: "11",
    name: "Community Garden",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=600&h=400&fit=crop",
    depositDeadline: "11 Aug 2026, 05:00pm",
    requestTime: "30 Jul 2026, 05:00pm",
    current: 6000,
    goal: 6000,
    daysLeft: 0,
    donorCount: 88,
    donors: ["https://i.pravatar.cc/64?img=76"],
    visibility: "public",
    status: "finished",
  },
  {
    id: "12",
    name: "Tech for Teens",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
    depositDeadline: "02 Apr 2027, 01:00pm",
    requestTime: "20 Mar 2027, 01:00pm",
    current: 0,
    goal: 22000,
    daysLeft: 270,
    donorCount: 0,
    donors: [],
    visibility: "public",
    status: "upcoming",
  },
];

export const getEventById = (id: string) => events.find((e) => e.id === id);
