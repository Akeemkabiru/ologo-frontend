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
