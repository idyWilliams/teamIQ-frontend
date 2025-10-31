import { create } from "zustand";
import axios from "@/services/axios";
import { toast } from "sonner"; // global toast

// 📌 BACKEND ENDPOINTS
const VALIDATE_TOKEN_URL = "/auth/validate-token";
const REFRESH_TOKEN_URL = "/auth/refresh-token";

// Define User type (adjust based on backend)
interface User {
  id: string;
  name: string;
  email: string;
}

// Auth Store State & Actions
interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean; // loader state
  hasShownLogoutToast: boolean; // ✅ prevent repeated toast

  authorize: (data: { user: User; token: string; refreshToken: string }) => void;
  logout: (showToast?: boolean) => void; // optional flag
  updateUser: (data: Partial<User>) => void;
  validateToken: () => Promise<void>;
  refreshTokenRequest: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  hasShownLogoutToast: false,

  authorize: ({ user, token, refreshToken }) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);

    set({
      user,
      token,
      refreshToken,
      isAuthenticated: true,
      isCheckingAuth: false,
      hasShownLogoutToast: false, // reset toast flag
    });
  },

  logout: (showToast = true) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

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
    const token = get().token || localStorage.getItem("accessToken");
    if (!token) return get().logout();

    try {
      await axios.get(VALIDATE_TOKEN_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.warn("Token invalid — attempting refresh...");
      await get().refreshTokenRequest();
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  refreshTokenRequest: async () => {
    const refreshToken = get().refreshToken || localStorage.getItem("refreshToken");
    if (!refreshToken) return get().logout();

    try {
      const res = await axios.post(REFRESH_TOKEN_URL, { refreshToken });
      const { token: newAccessToken } = res.data;

      localStorage.setItem("accessToken", newAccessToken);
      set({ token: newAccessToken, isAuthenticated: true });
      console.log("Token refreshed");
    } catch (err) {
      console.error("❌ Refresh failed — logging out");
      get().logout();
    }
  },
}));

// Restore session on page reload
if (typeof window !== "undefined") {
  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (token && refreshToken) {
    useAuthStore.setState({
      token,
      refreshToken,
      isAuthenticated: true,
      isCheckingAuth: false,
      hasShownLogoutToast: false,
    });
  } else {
    useAuthStore.setState({ isCheckingAuth: false, hasShownLogoutToast: false });
  }
}
