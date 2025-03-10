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
  isAuthenticated: boolean;
  loading: boolean;
  initializeAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
};

// Backend API URL
const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: true,

      // Initialiaze authentication state
      initializeAuth: async () => {
        try {
          const token = Cookies.get("token");
          if (!token) throw new Error("No se encontró un token");

          const response = await axios.get<User>(`${API_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          set({ user: response.data, isAuthenticated: true, loading: false });
        } catch (error) {
          console.error("Error en inicialización de autenticación", error);
          set({ user: null, isAuthenticated: false, loading: false });
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

      // Refresh Token function
      refreshToken: async () => {
        try {
          const refreshToken = Cookies.get("refreshToken");
          if (!refreshToken) throw new Error("No refresh token available");

          const response = await axios.post<{ token: string }>(
            `${API_URL}/refresh`,
            { refreshToken }
          );

          Cookies.set("token", response.data.token, {
            expires: 1,
            secure: true,
          });

          set({ isAuthenticated: true });
        } catch (error: any) {
          console.error("Token Refresh Error:", error.response?.data || error);
          set({ user: null, isAuthenticated: false });
        }
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
