import {
  DEFAULT_COMMISSION_STRUCTURE,
  CURRENCY_CONVERSION_FEE_PERCENTAGE,
  PAYMENT_REQUEST_GATEWAY_FEE_PERCENTAGE,
  PAYMENT_REQUEST_ADMIN_FEE_PERCENTAGE,
  PAYMENT_REQUEST_TAX_RATES,
  PROCESSING_API_FEE_PERCENTAGE,
  PROCESSING_GENERAL_FEE_PERCENTAGE,
  PROCESSING_USER_FEE_PERCENTAGE,
  DEFAULT_TAX_RATE_PERCENTAGE,
} from "./constants";

export interface ChargesBreakdown {
  amount: number; // base amount charges are computed against
  processingFee: number; // total processing fee (API + general admin + user admin)
  taxAmount: number; // tax, shown separately from the processing fee
  totalCharges: number; // processingFee + taxAmount
  total: number; // amount + processingFee + taxAmount
}

/**
 * Compute the processing fee and tax for any charged action (top-up, transfer,
 * request, convert, withdrawal, KYC, verification, …).
 *
 * The processing fee is the sum of three admin/provider-controlled parts:
 *  - the API fee (provider),
 *  - a general admin fee (global), and
 *  - a per-user admin fee.
 * Users only ever see the combined total, so this returns a single
 * `processingFee`. Tax is returned separately.
 *
 * `taxRate` defaults to the platform default; pass 0 for tax-exempt actions.
 */
export const calculateCharges = (
  amount: number,
  taxRate: number = DEFAULT_TAX_RATE_PERCENTAGE,
): ChargesBreakdown => {
  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount : 0;
  const processingRate =
    PROCESSING_API_FEE_PERCENTAGE +
    PROCESSING_GENERAL_FEE_PERCENTAGE +
    PROCESSING_USER_FEE_PERCENTAGE;
  const processingFee = (safeAmount * processingRate) / 100;
  const taxAmount = (safeAmount * (taxRate || 0)) / 100;
  const totalCharges = processingFee + taxAmount;

  const round2 = (n: number) => Math.round(n * 100) / 100;
  return {
    amount: round2(safeAmount),
    processingFee: round2(processingFee),
    taxAmount: round2(taxAmount),
    totalCharges: round2(totalCharges),
    total: round2(safeAmount + totalCharges),
  };
};

export type PaymentRequestType = "personal" | "business" | "charity";
export type FeeResponsibility =
  | "wallet"
  | "bank"
  | "requestedAmount"
  | "payer";

export interface PaymentRequestBreakdown {
  amount: number; // the requested amount
  gatewayFee: number; // provider portion of the processing fee
  adminFee: number; // admin-configured portion of the processing fee
  processingFee: number; // total processing fee shown to users (gateway + admin)
  taxAmount: number; // tax, shown separately from the processing fee
  totalCharges: number; // processingFee + taxAmount
  payerPays: number; // what the payer is charged in total
  netReceived: number; // what the receiver ends up with after any deductions
}

/**
 * Compute the processing fee (gateway + admin), tax, and the resulting amounts
 * for a payment request. Users only see the combined processing fee, while tax
 * is surfaced separately.
 *
 * The `responsibility` determines who absorbs the charges:
 *  - wallet / bank: requester pays charges from their own funds, so the
 *    receiver still gets the full requested amount and the payer pays it.
 *  - requestedAmount: charges are deducted from the amount, so the receiver
 *    gets less; the payer still pays exactly the requested amount.
 *  - payer: the payer pays the amount plus the charges on top.
 */
export const calculatePaymentRequestBreakdown = (
  amount: number,
  requestType: PaymentRequestType,
  responsibility: FeeResponsibility,
): PaymentRequestBreakdown => {
  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount : 0;
  const gatewayFee =
    (safeAmount * PAYMENT_REQUEST_GATEWAY_FEE_PERCENTAGE) / 100;
  const adminFee = (safeAmount * PAYMENT_REQUEST_ADMIN_FEE_PERCENTAGE) / 100;
  const processingFee = gatewayFee + adminFee;
  const taxRate = PAYMENT_REQUEST_TAX_RATES[requestType] ?? 0;
  const taxAmount = (safeAmount * taxRate) / 100;
  const totalCharges = processingFee + taxAmount;

  let payerPays = safeAmount;
  let netReceived = safeAmount;

  if (responsibility === "payer") {
    // Payer covers the charges on top of the requested amount.
    payerPays = safeAmount + totalCharges;
    netReceived = safeAmount;
  } else if (responsibility === "requestedAmount") {
    // Charges come out of the requested amount, reducing what's received.
    payerPays = safeAmount;
    netReceived = safeAmount - totalCharges;
  } else {
    // wallet / bank: requester pre-pays charges from their own funds.
    payerPays = safeAmount;
    netReceived = safeAmount;
  }

  return {
    amount: safeAmount,
    gatewayFee: round2(gatewayFee),
    adminFee: round2(adminFee),
    processingFee: round2(processingFee),
    taxAmount: round2(taxAmount),
    totalCharges: round2(totalCharges),
    payerPays: round2(payerPays),
    netReceived: round2(netReceived),
  };
};

const round2 = (n: number): number => Math.round(n * 100) / 100;

// Calculate commission based on amount
export const calculateCommission = (
  amount: number,
): { commission: number; percentage: number } => {
  const structure = DEFAULT_COMMISSION_STRUCTURE.find(
    (range) => amount >= range.min && amount <= range.max,
  );

  if (!structure) {
    return { commission: 0, percentage: 0 };
  }

  const commission = (amount * structure.percentage) / 100;
  return { commission, percentage: structure.percentage };
};

// Calculate total amount after commission
export const calculateTotalWithCommission = (amount: number): number => {
  const { commission } = calculateCommission(amount);
  return amount + commission;
};

// Format currency
export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// Format date and time
export const formatDateTime = (date: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

// Format date only
export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

// Calculate currency conversion
export const calculateCurrencyConversion = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number,
): { convertedAmount: number; fee: number; total: number } => {
  const fee = (amount * CURRENCY_CONVERSION_FEE_PERCENTAGE) / 100;
  const amountAfterFee = amount - fee;
  const convertedAmount = amountAfterFee * exchangeRate;

  return {
    convertedAmount: Math.round(convertedAmount * 100) / 100,
    fee: Math.round(fee * 100) / 100,
    total: Math.round((convertedAmount + fee) * 100) / 100,
  };
};

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Generate unique transaction/reference number
export const generateReferenceNumber = (prefix: string): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (basic)
export const validatePhone = (phone: string): boolean => {
  const phoneRegex =
    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

// Truncate text
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.substr(0, length) + "...";
};

// Check if URL is valid
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Extract hyperlinks from text
export const extractHyperlinks = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(urlRegex);
  return matches || [];
};

// Calculate days until date
export const daysUntilDate = (date: string): number => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Format progress percentage
export const getProgressPercentage = (
  current: number,
  target: number,
): number => {
  if (target === 0) return 0;
  return Math.round((current / target) * 100);
};

// Check if date is in future
export const isFutureDate = (date: string): boolean => {
  return new Date(date) > new Date();
};

// Check if date is in past
export const isPastDate = (date: string): boolean => {
  return new Date(date) < new Date();
};

// Sort array by date (newest first)
export const sortByDateNewest = <
  T extends { date?: string; createdDate?: string },
>(
  array: T[],
): T[] => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a.date || a.createdDate || "").getTime();
    const dateB = new Date(b.date || b.createdDate || "").getTime();
    return dateB - dateA;
  });
};

// Sort array by date (oldest first)
export const sortByDateOldest = <
  T extends { date?: string; createdDate?: string },
>(
  array: T[],
): T[] => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a.date || a.createdDate || "").getTime();
    const dateB = new Date(b.date || b.createdDate || "").getTime();
    return dateA - dateB;
  });
};

// Paginate array
export const paginate = <T>(array: T[], page: number, limit: number): T[] => {
  const start = (page - 1) * limit;
  return array.slice(start, start + limit);
};

// Search in array
export const searchInArray = <T>(
  array: T[],
  searchTerm: string,
  searchFields: (keyof T)[],
): T[] => {
  if (!searchTerm) return array;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return array.filter((item) =>
    searchFields.some((field) => {
      const value = item[field];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(lowerSearchTerm);
    }),
  );
};
