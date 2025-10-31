import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "@/services/axios";
import { toast } from "sonner";

const VALIDATE_TOKEN_URL = "/auth/validate-token";
const REFRESH_TOKEN_URL = "/auth/refresh-token";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  hasShownLogoutToast: boolean;

  authorize: (data: { user: User; token: string; refreshToken: string }) => void;
  logout: (showToast?: boolean) => void;
  updateUser: (data: Partial<User>) => void;
  validateToken: () => Promise<void>;
  refreshTokenRequest: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      hasShownLogoutToast: false,

      authorize: ({ user, token, refreshToken }) => {
        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
          isCheckingAuth: false,
          hasShownLogoutToast: false,
        });
      },

      logout: (showToast = true) => {
        set((state) => ({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isCheckingAuth: false,
          hasShownLogoutToast: showToast ? true : state.hasShownLogoutToast,
        }));

        if (showToast && !get().hasShownLogoutToast) {
          toast.error("Session expired. Please login again.");
        }
      },

      updateUser: (data) => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({ user: { ...currentUser, ...data } });
      },

      validateToken: async () => {
        const token = get().token;
        if (!token) return get().logout();

        try {
          await axios.get(VALIDATE_TOKEN_URL, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch {
          await get().refreshTokenRequest();
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      refreshTokenRequest: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) return get().logout();

        try {
          const res = await axios.post(REFRESH_TOKEN_URL, { refreshToken });
          const { token: newAccessToken } = res.data;

          set({ token: newAccessToken, isAuthenticated: true });
        } catch {
          get().logout();
        }
      },
    }),

    {
      name: "auth-storage",

      partialize: (state) =>
        ({
          user: state.user,
          token: state.token,
          refreshToken: state.refreshToken,
          isAuthenticated: state.isAuthenticated,
        }) satisfies Partial<AuthState>,
    }
  )
);
