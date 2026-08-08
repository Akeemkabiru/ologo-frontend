export interface MyPledge {
  id: string;
  description: string;
  type: "one-time" | "recurring";
  frequency?: string;
  performanceDate: string;
  status: "active" | "fulfilled" | "upcoming";
  anonymous?: boolean;
  contactEmail?: string;
  date: string;
}

export const myPledges: MyPledge[] = [
  {
    id: "p1",
    description:
      "Pledge to donate 50 winter coats to the Ohayo Animal Shelter drive.",
    type: "one-time",
    performanceDate: "Sep 15, 2026",
    status: "active",
    contactEmail: "you@example.com",
    date: "Aug 6, 2026",
  },
  {
    id: "p2",
    description: "Monthly pledge to cover meals for the Downtown Food Bank.",
    type: "recurring",
    frequency: "Monthly",
    performanceDate: "1st of each month",
    status: "active",
    date: "Aug 4, 2026",
  },
  {
    id: "p3",
    description:
      "Pledge to run the City Marathon and raise funds for senior care.",
    type: "one-time",
    performanceDate: "Oct 2, 2026",
    status: "upcoming",
    anonymous: true,
    date: "Aug 2, 2026",
  },
  {
    id: "p4",
    description: "Weekly pledge to volunteer at the Community Garden.",
    type: "recurring",
    frequency: "Weekly",
    performanceDate: "Every Saturday",
    status: "active",
    date: "Jul 30, 2026",
  },
  {
    id: "p5",
    description: "Pledge to match every donation to the Clean Water Project.",
    type: "one-time",
    performanceDate: "Aug 1, 2026",
    status: "fulfilled",
    date: "Jul 20, 2026",
  },
  {
    id: "p6",
    description:
      "Pledge to provide tech mentorship sessions for Tech for Teens.",
    type: "recurring",
    frequency: "Bi-weekly",
    performanceDate: "Every other Friday",
    status: "active",
    date: "Jul 18, 2026",
  },
  {
    id: "p7",
    description: "Pledge to donate books to the School Renovation project.",
    type: "one-time",
    performanceDate: "Nov 10, 2026",
    status: "upcoming",
    date: "Jul 15, 2026",
  },
];
