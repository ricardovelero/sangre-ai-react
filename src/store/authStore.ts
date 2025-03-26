import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import Cookies from "js-cookie";
import { FormData } from "@/pages/Register";
import { UpdateUserFormData } from "@/components/settings.tsx/AccountForm";

export type User = {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

// Define Zustand state and actions
type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  register: (data: FormData, onSuccess?: () => void) => Promise<string | null>;
  updateUser: (
    data: UpdateUserFormData,
    onSuccess?: () => void
  ) => Promise<string | null>;
  login: (
    email: string,
    password: string,
    onSuccess?: () => void
  ) => Promise<string | null>;
  logout: () => void;
  initializeAuth: () => Promise<void>;
  error: string | null;
  loading: boolean;
};

// Backend API URL
const API_URL =
  `${import.meta.env.VITE_APP_API_URL}/auth` ||
  "http://localhost:3000/api/auth";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: Cookies.get("token") || null,
      isAuthenticated: !!Cookies.get("token"), // Initially check for a token,
      error: null,
      loading: false,

      // Initialiaze authentication state
      initializeAuth: async () => {
        const token = Cookies.get("token");
        set({ loading: true });

        if (!token) {
          console.log("🚨 No token found, user is not authenticated");
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
          });

          // Optional: Redirect to login page or take additional action
          window.location.href = "/login"; // Redirect to login page
          return;
        }

        try {
          const response = await axios.get<User>(`${API_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });

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

          // Optional: Redirect to login page or take additional action
          window.location.href = "/login"; // Redirect to login page
        } finally {
          set({ loading: false });
        }
      },

      register: async (data: FormData, onSuccess) => {
        set({ loading: true });
        try {
          const response = await axios.post(`${API_URL}/register`, data);

          console.log("Registration data:", response.data);

          // Save tokens in cookies
          Cookies.set("token", response.data.token, {
            expires: 3,
            secure: true,
          });
          Cookies.set("refreshToken", response.data.refreshToken, {
            expires: 9,
            secure: true,
          });

          set({ user: response.data.user, isAuthenticated: true });

          if (onSuccess) onSuccess();
          return null;
        } catch (error: any) {
          console.error(
            "Registration Error:",
            error.response?.data?.message || error
          );
          const errorMessage =
            error.response?.data?.message || "Registration failed";
          set({ error: errorMessage });
          return get().error;
        } finally {
          set({ loading: false });
        }
      },

      // Login function
      login: async (email: string, password: string, onSuccess) => {
        set({ loading: true });
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
          if (onSuccess) onSuccess();
          return null;
        } catch (error: any) {
          console.error("Login Error:", error.response?.data?.message || error);
          const errorMessage =
            error.response?.data?.message || "Error de inicio de sesión";
          set({ error: errorMessage });
          return get().error;
        } finally {
          set({ loading: false });
        }
      },

      // Logout function
      logout: async () => {
        set({ loading: true });
        try {
          await axios.post(`${API_URL}/logout`, {
            refreshToken: Cookies.get("refreshToken"),
          });
        } catch (error: any) {
          console.error("Logout Error:", error.response?.data || error);
        } finally {
          Cookies.remove("token");
          Cookies.remove("refreshToken");
          set({ user: null, isAuthenticated: false, loading: false });
        }
      },

      // Change Name & Lastname
      updateUser: async (data, onSuccess) => {
        set({ loading: true });
        try {
          const token = Cookies.get("token");
          const response = await axios.put(`${API_URL}/user`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log("Update data:", response.data);

          set({ user: response.data.user });

          if (onSuccess) onSuccess();
          return null;
        } catch (error: any) {
          console.error(
            "User Update Error:",
            error.response?.data?.message || error
          );
          const errorMessage =
            error.response?.data?.message || "User Update failed";
          set({ error: errorMessage });
          return get().error;
        } finally {
          set({ loading: false });
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
