// API Service layer - Ready for integration with backend

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Generic fetch wrapper
const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    // Add auth token if available
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Auth Services
export const authService = {
  login: (email: string, password: string) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (userData: any) =>
    apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  forgotPassword: (email: string) =>
    apiCall("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token: string, password: string) =>
    apiCall("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    }),
};

// User Services
export const userService = {
  getProfile: (userId: string) => apiCall(`/users/${userId}`),

  updateProfile: (userId: string, data: any) =>
    apiCall(`/users/${userId}`, { method: "PUT", body: JSON.stringify(data) }),

  searchUsers: (query: string) => apiCall(`/users/search?q=${query}`),

  getUserById: (userId: string) => apiCall(`/users/${userId}`),

  verifyUser: (data: any) =>
    apiCall("/users/verify", { method: "POST", body: JSON.stringify(data) }),

  getVerificationStatus: (userId: string) =>
    apiCall(`/users/${userId}/verification`),
};

// Event Services
export const eventService = {
  createEvent: (eventData: any) =>
    apiCall("/events", { method: "POST", body: JSON.stringify(eventData) }),

  getEvent: (eventId: string) => apiCall(`/events/${eventId}`),

  updateEvent: (eventId: string, data: any) =>
    apiCall(`/events/${eventId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteEvent: (eventId: string) =>
    apiCall(`/events/${eventId}`, { method: "DELETE" }),

  getEvents: (filters?: any) => {
    const query = new URLSearchParams(filters).toString();
    return apiCall(`/events?${query}`);
  },

  joinEvent: (eventId: string) =>
    apiCall(`/events/${eventId}/join`, { method: "POST" }),

  leaveEvent: (eventId: string) =>
    apiCall(`/events/${eventId}/leave`, { method: "POST" }),
};

// Donation Services
export const donationService = {
  createDonation: (donationData: any) =>
    apiCall("/donations", {
      method: "POST",
      body: JSON.stringify(donationData),
    }),

  getDonation: (donationId: string) => apiCall(`/donations/${donationId}`),

  getEventDonations: (eventId: string) =>
    apiCall(`/events/${eventId}/donations`),

  getUserDonations: (userId: string) => apiCall(`/users/${userId}/donations`),
};

// Pledge Services
export const pledgeService = {
  createPledge: (pledgeData: any) =>
    apiCall("/pledges", { method: "POST", body: JSON.stringify(pledgeData) }),

  getPledge: (pledgeId: string) => apiCall(`/pledges/${pledgeId}`),

  getEventPledges: (eventId: string) => apiCall(`/events/${eventId}/pledges`),

  getUserPledges: (userId: string) => apiCall(`/users/${userId}/pledges`),
};

// Wallet Services
export const walletService = {
  getWallet: (userId: string) => apiCall(`/wallets/${userId}`),

  topUpWallet: (data: any) =>
    apiCall("/wallets/topup", { method: "POST", body: JSON.stringify(data) }),

  transfer: (data: any) =>
    apiCall("/wallets/transfer", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  withdraw: (data: any) =>
    apiCall("/wallets/withdraw", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  convertCurrency: (data: any) =>
    apiCall("/wallets/convert", { method: "POST", body: JSON.stringify(data) }),

  getTransactionHistory: (userId: string) =>
    apiCall(`/wallets/${userId}/transactions`),
};

// Membership Services
export const membershipService = {
  createMembership: (data: any) =>
    apiCall("/memberships", { method: "POST", body: JSON.stringify(data) }),

  getMembership: (membershipId: string) =>
    apiCall(`/memberships/${membershipId}`),

  updateMembership: (membershipId: string, data: any) =>
    apiCall(`/memberships/${membershipId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  joinMembership: (membershipId: string, data: any) =>
    apiCall(`/memberships/${membershipId}/join`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  leaveMembership: (membershipId: string) =>
    apiCall(`/memberships/${membershipId}/leave`, { method: "POST" }),

  getMemberships: () => apiCall("/memberships"),
};

// Escrow Services
export const escrowService = {
  createEscrow: (data: any) =>
    apiCall("/escrows", { method: "POST", body: JSON.stringify(data) }),

  getEscrow: (escrowId: string) => apiCall(`/escrows/${escrowId}`),

  depositToEscrow: (escrowId: string, data: any) =>
    apiCall(`/escrows/${escrowId}/deposit`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  submitDeciderForm: (escrowId: string, data: any) =>
    apiCall(`/escrows/${escrowId}/decider-form`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  submitRequestForm: (escrowId: string, data: any) =>
    apiCall(`/escrows/${escrowId}/request-form`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Chat Services
export const chatService = {
  sendMessage: (groupId: string, message: any) =>
    apiCall(`/chat/${groupId}/messages`, {
      method: "POST",
      body: JSON.stringify(message),
    }),

  getMessages: (groupId: string) => apiCall(`/chat/${groupId}/messages`),

  uploadFile: (groupId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetch(`${API_BASE_URL}/chat/${groupId}/upload`, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  },
};

// Virtual Card Services
export const virtualCardService = {
  createCard: (data: any) =>
    apiCall("/virtual-cards", { method: "POST", body: JSON.stringify(data) }),

  getCards: (userId: string) => apiCall(`/users/${userId}/virtual-cards`),

  getCardDetails: (cardId: string) => apiCall(`/virtual-cards/${cardId}`),

  fundCard: (cardId: string, amount: number) =>
    apiCall(`/virtual-cards/${cardId}/fund`, {
      method: "POST",
      body: JSON.stringify({ amount }),
    }),

  freezeCard: (cardId: string) =>
    apiCall(`/virtual-cards/${cardId}/freeze`, { method: "POST" }),

  unfreezeCard: (cardId: string) =>
    apiCall(`/virtual-cards/${cardId}/unfreeze`, { method: "POST" }),

  deleteCard: (cardId: string) =>
    apiCall(`/virtual-cards/${cardId}`, { method: "DELETE" }),

  shareCard: (cardId: string, userId: string) =>
    apiCall(`/virtual-cards/${cardId}/share`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    }),
};

// Notification Services
export const notificationService = {
  getNotifications: (userId: string) =>
    apiCall(`/users/${userId}/notifications`),

  markAsRead: (notificationId: string) =>
    apiCall(`/notifications/${notificationId}/read`, { method: "POST" }),

  getPreferences: (userId: string) =>
    apiCall(`/users/${userId}/notification-preferences`),

  updatePreferences: (userId: string, preferences: any) =>
    apiCall(`/users/${userId}/notification-preferences`, {
      method: "PUT",
      body: JSON.stringify(preferences),
    }),
};

// Admin Services
export const adminService = {
  getStats: () => apiCall("/admin/stats"),

  getUsers: (filters?: any) => {
    const query = new URLSearchParams(filters).toString();
    return apiCall(`/admin/users?${query}`);
  },

  getTransactions: (filters?: any) => {
    const query = new URLSearchParams(filters).toString();
    return apiCall(`/admin/transactions?${query}`);
  },

  approveVerification: (userId: string) =>
    apiCall(`/admin/verify/${userId}/approve`, { method: "POST" }),

  rejectVerification: (userId: string, reason: string) =>
    apiCall(`/admin/verify/${userId}/reject`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    }),

  setCommissionStructure: (data: any) =>
    apiCall("/admin/settings/commission", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  createSubscription: (data: any) =>
    apiCall("/admin/subscriptions", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
