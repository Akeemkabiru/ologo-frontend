// Core types for the entire platform
export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage?: string;
  about?: string;
  verified: boolean;
  verificationStatus: "unverified" | "pending" | "verified" | "rejected";
  tags?: string[];
  joinedDate: string;
  totalEvents: number;
  totalDonations: number;
  totalPledges: number;
}

export interface Wallet {
  id: string;
  userId: string;
  currency: string;
  balance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalTransfers: number;
  lastUpdated: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  image?: string;
  host: User;
  coHosts?: User[];
  isPrivate: boolean;
  tags: string[];
  timezone: string;
  expectedAmount: number;
  currency: string;
  expectedDate: string;
  amountRaised: number;
  donorCount: number;
  createdDate: string;
  status: "active" | "completed" | "cancelled";
}

export interface Donation {
  id: string;
  eventId: string;
  donorId: string;
  amount: number;
  currency: string;
  isRecurring: boolean;
  frequency?: "minutes" | "hours" | "days" | "weeks" | "months";
  frequencyAmount?: number;
  endDate?: string;
  isAnonymous: boolean;
  aliasName?: string;
  note?: string;
  postNote: boolean;
  submittedDate: string;
  status: "pending" | "completed" | "failed";
}

export interface Pledge {
  id: string;
  eventId: string;
  pledgerId: string;
  description: string;
  performanceDate: string;
  contactEmail: string;
  contactPhone: string;
  isAnonymous: boolean;
  aliasName?: string;
  isRecurring: boolean;
  frequency?: "minutes" | "hours" | "days" | "weeks" | "months";
  frequencyAmount?: number;
  endDate?: string;
  submittedDate: string;
  status: "pending" | "completed" | "failed";
}

export interface Membership {
  id: string;
  name: string;
  description: string;
  image?: string;
  host: User;
  coHosts?: User[];
  isPrivate: boolean;
  tags: string[];
  timezone: string;
  membershipAmount: number;
  currency: string;
  frequency: "minutes" | "hours" | "days" | "weeks" | "months";
  frequencyAmount: number;
  memberCount: number;
  createdDate: string;
  status: "active" | "inactive" | "cancelled";
}

export interface MembershipJoin {
  id: string;
  membershipId: string;
  userId: string;
  note?: string;
  isAnonymous: boolean;
  aliasName?: string;
  customAmount?: number;
  customFrequency?: string;
  customFrequencyAmount?: number;
  endDate?: string;
  joinedDate: string;
  status: "active" | "paused" | "cancelled";
}

export interface Escrow {
  id: string;
  name: string;
  description: string;
  host: User;
  deciders: User[];
  witnesses: User[];
  beneficiaries: User[];
  totalDeposited: number;
  currency: string;
  createdDate: string;
  status: "active" | "completed" | "cancelled";
}

export interface EscrowPayment {
  id: string;
  escrowId: string;
  deciderId: string;
  description: string;
  payments: { userId: string; amount: number }[];
  isRecurring: boolean;
  frequency?: string;
  frequencyAmount?: number;
  endDate?: string;
  isAnonymous: boolean;
  aliasName?: string;
  submittedDate: string;
  status: "pending" | "completed" | "failed";
}

export interface ChatMessage {
  id: string;
  groupId: string;
  senderId: string;
  content: string;
  fileUrls?: string[];
  hyperlinks?: string[];
  sentDate: string;
  edited: boolean;
  reactions?: { userId: string; emoji: string }[];
}

export interface Transaction {
  id: string;
  transactionNumber: string;
  senderId: string;
  receiverId: string;
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  description?: string;
  isAnonymous: boolean;
  aliasName?: string;
  type:
    | "wallet_transfer"
    | "bank_transfer"
    | "event_donation"
    | "membership_payment"
    | "escrow_payment";
  status: "pending" | "completed" | "failed";
  date: string;
  commissionAmount: number;
  commissionPercentage: number;
}

export interface VirtualCard {
  id: string;
  userId: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  currency: string;
  balance: number;
  isActive: boolean;
  isFrozen: boolean;
  createdDate: string;
  maintenanceFee: number;
  transactionHistory: Transaction[];
  sharedUsers?: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type:
    | "donation"
    | "payment"
    | "membership"
    | "pledge"
    | "message"
    | "form_submission"
    | "system";
  read: boolean;
  date: string;
  actionUrl?: string;
}

export interface NotificationPreference {
  userId: string;
  inAppNotifications: boolean;
  emailNotifications: boolean;
  whatsappNotifications: boolean;
  smsNotifications: boolean;
  notificationTypes: {
    donations: boolean;
    payments: boolean;
    memberships: boolean;
    messages: boolean;
    formSubmissions: boolean;
  };
}

export interface AdminStats {
  totalUsers: number;
  totalEvents: number;
  totalMemberships: number;
  totalEscrows: number;
  totalTransactionVolume: number;
  totalCommissionsEarned: number;
  activeUsers: number;
  totalVerifications: number;
}

export interface SubscriptionPackage {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration: "monthly" | "yearly" | "lifetime";
  features: string[];
  description: string;
  isActive: boolean;
  createdDate: string;
}
