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

// Platform processing fee — the total the user sees is the sum of:
//  - API fee (charged by the payment/verification provider)
//  - a general fee set/edited by Admins (applies to everyone)
//  - a user-specific fee set/edited by Admins for each individual user
// Users only ever see the combined total processing fee, never the breakdown.
export const PROCESSING_API_FEE_PERCENTAGE = 1.5;
export const PROCESSING_GENERAL_FEE_PERCENTAGE = 0.7; // admin-configurable, global
export const PROCESSING_USER_FEE_PERCENTAGE = 0.3; // admin-configurable, per-user

// General tax rate applied wherever tax applies (top-up, transfer, request,
// convert, withdrawal, KYC, verification, etc.).
export const DEFAULT_TAX_RATE_PERCENTAGE = 7.5;

// Flat verification fees (the "amount" charges are calculated against) for the
// KYC and Get Verified Tick flows.
export const KYC_VERIFICATION_FEE = 5; // base verification fee
export const VERIFIED_TICK_FEE = 15; // base verified-tick fee

// Payment Request fees & taxes
// Processing fee = gateway charge (fixed by provider) + admin charge (set/edited by Admin).
// Users only ever see the combined total processing fee.
export const PAYMENT_REQUEST_GATEWAY_FEE_PERCENTAGE = 2.9; // gateway processor charge
export const PAYMENT_REQUEST_ADMIN_FEE_PERCENTAGE = 2.1; // admin-configurable charge
// Tax rates applied per request type (business is taxable; charity is exempt).
export const PAYMENT_REQUEST_TAX_RATES: Record<
  "personal" | "business" | "charity",
  number
> = {
  personal: 0,
  business: 7.5,
  charity: 0,
};

export const PAYMENT_REQUEST_TYPES = [
  { label: "Business", value: "business" },
  { label: "Charity", value: "charity" },
] as const;

export const FEE_PAYMENT_OPTIONS = [
  { label: "Pay from my wallet", value: "wallet" },
  { label: "Pay from my bank", value: "bank" },
  { label: "Deduct from requested amount", value: "requestedAmount" },
  { label: "Let the payer pay the charges", value: "payer" },
] as const;

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

// KYC / Verified Tick
export const ENTITY_TYPES = [
  { label: "Individual", value: "individual" },
  { label: "Organisation", value: "organisation" },
];

export const INDIVIDUAL_ID_TYPES = [
  { label: "NIMC (National ID)", value: "nimc" },
  { label: "International Passport", value: "passport" },
  { label: "Driver's License", value: "drivers_license" },
  { label: "Voter's Card", value: "voters_card" },
];

export const ORGANISATION_ID_TYPES = [
  { label: "CAC Certificate of Incorporation", value: "cac_certificate" },
  { label: "Business Premises Permit", value: "business_permit" },
  { label: "Tax Clearance Certificate", value: "tax_certificate" },
  { label: "SCUML Certificate", value: "scuml_certificate" },
];

export const ORGANISATION_TYPES = [
  { label: "Sole Proprietorship", value: "sole_proprietorship" },
  { label: "Limited Liability Company", value: "llc" },
  { label: "Public Limited Company", value: "plc" },
  { label: "Non-Governmental Organisation (NGO)", value: "ngo" },
  { label: "Partnership", value: "partnership" },
  { label: "Cooperative Society", value: "cooperative" },
];

export const ORGANISATION_SUFFIXES = [
  { label: "None", value: "" },
  { label: "Ltd", value: "Ltd" },
  { label: "PLC", value: "PLC" },
  { label: "LLC", value: "LLC" },
  { label: "Inc", value: "Inc" },
  { label: "Corp", value: "Corp" },
];

export const NIGERIAN_BANKS = [
  "Access Bank",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank (FCMB)",
  "Globus Bank",
  "Guaranty Trust Bank (GTBank)",
  "Heritage Bank",
  "Keystone Bank",
  "Kuda Bank",
  "Moniepoint MFB",
  "Opay",
  "Palmpay",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
];

export const TITLE_OPTIONS = [
  { label: "Mr", value: "Mr" },
  { label: "Ms", value: "Ms" },
  { label: "Mrs", value: "Mrs" },
];

export const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const COUNTRIES = [
  "Nigeria",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Benin",
  "Brazil",
  "Burkina Faso",
  "Cameroon",
  "Canada",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo (DRC)",
  "Cote d'Ivoire",
  "Denmark",
  "Egypt",
  "Ethiopia",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Germany",
  "Ghana",
  "Greece",
  "Guinea",
  "India",
  "Indonesia",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Kenya",
  "Kuwait",
  "Lebanon",
  "Liberia",
  "Libya",
  "Malaysia",
  "Mali",
  "Mexico",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Netherlands",
  "New Zealand",
  "Niger",
  "Norway",
  "Pakistan",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Rwanda",
  "Saudi Arabia",
  "Senegal",
  "Sierra Leone",
  "Singapore",
  "Somalia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sudan",
  "Sweden",
  "Switzerland",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tunisia",
  "Turkey",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam",
  "Zambia",
  "Zimbabwe",
];

// States / provinces for the countries we have data for. Countries not listed
// here let the user type their state/province freely via the combobox.
export const STATES_BY_COUNTRY: Record<string, string[]> = {
  Nigeria: NIGERIAN_STATES,
  "United States": [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
    "Washington", "West Virginia", "Wisconsin", "Wyoming",
  ],
  Canada: [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick",
    "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia",
    "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
    "Yukon",
  ],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  Ghana: [
    "Ahafo", "Ashanti", "Bono", "Bono East", "Central", "Eastern",
    "Greater Accra", "North East", "Northern", "Oti", "Savannah", "Upper East",
    "Upper West", "Volta", "Western", "Western North",
  ],
};

// Minimum age (years) required to create an account.
export const MINIMUM_SIGNUP_AGE = 18;

// Persistent (localStorage) - set once during onboarding, reused by both
// the KYC and Verified Tick flows so the user is never asked twice.
export const ACCOUNT_TYPE_KEY = "ologoAccountType";

export const KYC_STORAGE_KEYS = {
  identity: "kycIdentity",
  bankAccount: "kycBankAccount",
  bvn: "kycBvn",
  address: "kycAddress",
};

export const VERIFIED_TICK_STORAGE_KEYS = {
  identity: "vtIdentity",
  address: "vtAddress",
};
