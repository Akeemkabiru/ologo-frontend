export interface CurrencyInfo {
  code: string;
  symbol: string;
  flag: string;
  rate: number; // units of this currency per 1 USD
}

export const CURRENCY_INFO: CurrencyInfo[] = [
  { code: "USD", symbol: "$", flag: "🇺🇸", rate: 1 },
  { code: "EUR", symbol: "€", flag: "🇪🇺", rate: 0.92 },
  { code: "GBP", symbol: "£", flag: "🇬🇧", rate: 0.79 },
  { code: "NGN", symbol: "₦", flag: "🇳🇬", rate: 1550 },
];

export const getCurrency = (code: string): CurrencyInfo =>
  CURRENCY_INFO.find((c) => c.code === code) ?? CURRENCY_INFO[0];

/** Convert an amount from one currency to another using USD-based rates. */
export const convertCurrency = (amount: number, from: string, to: string) =>
  amount * (getCurrency(to).rate / getCurrency(from).rate);

export const formatMoney = (amount: number, code: string) =>
  `${getCurrency(code).symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// Conversion fee rates — in the real product these are set/edited by Admin.
export const GATEWAY_FEE_RATE = 0.015; // 1.5%
export const PLATFORM_FEE_RATE = 0.005; // 0.5%

export const conversionCharges = (amount: number) => {
  const gateway = amount * GATEWAY_FEE_RATE;
  const platform = amount * PLATFORM_FEE_RATE;
  return { gateway, platform, total: gateway + platform };
};
