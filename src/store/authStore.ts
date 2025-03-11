import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import Cookies from "js-cookie";

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
};

// Define Zustand state and actions
type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, onSuccess?: () => void) => void;
  logout: () => void;
  getToken: () => Promise<string | null>;
  initializeAuth: () => Promise<void>;
};

// Backend API URL
const API_URL =
  import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api/auth";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: Cookies.get("token") || null,
      isAuthenticated: !!Cookies.get("token"), // Initially check for a token,

      // Initialiaze authentication state
      initializeAuth: async () => {
        console.log("🔥 Checking JWT authentication...");
        const token = Cookies.get("token");

        if (!token) {
          console.log("🚨 No token found, user is not authenticated");
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
          return;
        }
        try {
          const response = await axios.get<User>(`${API_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("✅ User authenticated:", response.data);
          set({
            user: response.data,
            token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error("🚨 Invalid token, logging out:", error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
          Cookies.remove("token");
        }
      },

      // Login function
      login: async (email: string, password: string) => {
        try {
          const response = await axios.post<{
            token: string;
            refreshToken: string;
            user: User;
          }>(`${API_URL}/login`, { email, password });

          // Save tokens in cookies
          Cookies.set("token", response.data.token, {
            expires: 1,
            secure: true,
          });
          Cookies.set("refreshToken", response.data.refreshToken, {
            expires: 7,
            secure: true,
          });

          set({ user: response.data.user, isAuthenticated: true });
        } catch (error: any) {
          console.error("Login Error:", error.response?.data || error);
          throw error.response?.data || error;
        }
      },

      // Logout function
      logout: async () => {
        try {
          await axios.post(`${API_URL}/logout`, {
            refreshToken: Cookies.get("refreshToken"),
          });

          Cookies.remove("token");
          Cookies.remove("refreshToken");

          set({ user: null, isAuthenticated: false });
        } catch (error: any) {
          console.error("Logout Error:", error.response?.data || error);
        }
      },

      // Get token
      getToken: async () => {
        return get().token;
      },
    }),
    {
      name: "auth-storage", // Name for localStorage/sessionStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }), // Save only relevant data
    }
  )
);
