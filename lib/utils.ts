import {
  DEFAULT_COMMISSION_STRUCTURE,
  CURRENCY_CONVERSION_FEE_PERCENTAGE,
} from "./constants";

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
