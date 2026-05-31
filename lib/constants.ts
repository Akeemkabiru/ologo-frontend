// Platform constants
export const CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "NGN",
  "KES",
  "ZAR",
  "CAD",
  "AUD",
];

export const TIMEZONES = [
  "UTC",
  "GMT",
  "EST",
  "CST",
  "MST",
  "PST",
  "GMT+1",
  "GMT+2",
  "SAST",
  "EAT",
  "WAT",
];

export const FREQUENCY_OPTIONS = [
  { label: "Minutes", value: "minutes" },
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
  { label: "Months", value: "months" },
];

export const TRANSACTION_TYPES = {
  WALLET_TRANSFER: "wallet_transfer",
  BANK_TRANSFER: "bank_transfer",
  EVENT_DONATION: "event_donation",
  MEMBERSHIP_PAYMENT: "membership_payment",
  ESCROW_PAYMENT: "escrow_payment",
};

export const TRANSACTION_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
};

export const NOTIFICATION_TYPES = {
  DONATION: "donation",
  PAYMENT: "payment",
  MEMBERSHIP: "membership",
  PLEDGE: "pledge",
  MESSAGE: "message",
  FORM_SUBMISSION: "form_submission",
  SYSTEM: "system",
};

// Commission structure (can be set by admin)
export const DEFAULT_COMMISSION_STRUCTURE = [
  { min: 0, max: 10000, percentage: 5 },
  { min: 10001, max: 100000, percentage: 10 },
  { min: 100001, max: 500000, percentage: 15 },
  { min: 500001, max: Infinity, percentage: 20 },
];

export const VIRTUAL_CARD_CREATION_FEE = 500; // in smallest currency unit
export const VIRTUAL_CARD_MAINTENANCE_FEE = 100; // monthly
export const VIRTUAL_CARD_FAILED_TRANSACTION_FEE = 50;
export const CURRENCY_CONVERSION_FEE_PERCENTAGE = 2.5;

export const PAGINATION_LIMIT = 20;
export const SEARCH_DEBOUNCE_MS = 300;

export const EVENT_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const VERIFICATION_STATUS = {
  UNVERIFIED: "unverified",
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
};

export const ESCROW_ROLES = {
  HOST: "host",
  DECIDER: "decider",
  WITNESS: "witness",
  BENEFICIARY: "beneficiary",
  DEPOSITOR: "depositor",
};
