// Admin authentication utilities
// This is client-side only, for testing purposes

const ADMIN_CREDENTIALS = {
  email: "davisbryan595@gmail.com",
  password: "1234566",
};

const AUTH_STORAGE_KEY = "admin_auth_token";

export const adminAuth = {
  // Validate login credentials
  validateCredentials: (email: string, password: string): boolean => {
    return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
  },

  // Set auth token in localStorage
  setAuthToken: (token: string): void => {
    localStorage.setItem(AUTH_STORAGE_KEY, token);
  },

  // Get auth token from localStorage
  getAuthToken: (): string | null => {
    return localStorage.getItem(AUTH_STORAGE_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(AUTH_STORAGE_KEY);
  },

  // Clear authentication (logout)
  clearAuth: (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};
