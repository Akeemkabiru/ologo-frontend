export interface WalletBalance {
  code: string;
  balance: number; // in units of that currency
}

export const walletBalances: WalletBalance[] = [
  { code: "USD", balance: 4300 },
  { code: "NGN", balance: 250000 },
  { code: "EUR", balance: 800 },
  { code: "GBP", balance: 0 },
];

export const getBalance = (code: string) =>
  walletBalances.find((w) => w.code === code)?.balance ?? 0;
