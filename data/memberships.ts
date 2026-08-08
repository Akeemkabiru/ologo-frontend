export interface Membership {
  id: string;
  name: string;
  description: string;
  membershipAmount: number;
  frequency: string; // e.g. "monthly", "5 days"
  currency: string;
  memberCount: number;
  createdBy: string;
  status: string;
  visibility?: "public" | "private";
  tags?: string[];
  image?: string;
}

export const mockMemberships: Membership[] = [
  {
    id: "1",
    name: "Basic Member",
    description: "Get access to member-only content and events",
    membershipAmount: 9.99,
    frequency: "monthly",
    currency: "USD",
    memberCount: 245,
    createdBy: "Organization A",
    status: "active",
    visibility: "public",
    tags: ["Community", "Content"],
  },
  {
    id: "2",
    name: "Premium Member",
    description: "Premium access with exclusive benefits",
    membershipAmount: 19.99,
    frequency: "monthly",
    currency: "USD",
    memberCount: 120,
    createdBy: "Organization A",
    status: "active",
    visibility: "public",
    tags: ["Premium", "Perks"],
  },
  {
    id: "3",
    name: "Annual Pass",
    description: "Full year access at a discounted rate",
    membershipAmount: 99.99,
    frequency: "yearly",
    currency: "USD",
    memberCount: 80,
    createdBy: "Organization B",
    status: "active",
    visibility: "public",
    tags: ["Annual"],
  },
];
