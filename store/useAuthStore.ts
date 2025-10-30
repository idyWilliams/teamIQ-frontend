import { create } from "zustand";
import axios from "@/services/axios"; // ✅ make sure this matches your project axios path

// ✅ Define User type (adjust if backend returns more fields)
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Auth Store State & Actions
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  authorize: (data: { user: User; token: string }) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  validateToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // ✅ Initial States
  user: null,
  token: null,
  isAuthenticated: false,

  /**
   * ✅ authorize()
   * - Saves token + user in store and localStorage
   * - Marks user as authenticated
   */
  authorize: ({ user, token }) => {
    localStorage.setItem("accessToken", token);
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  /**
   * 🚪 logout()
   * - Clears user data and authentication state
   */
  logout: () => {
    localStorage.removeItem("accessToken");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  /**
   * 🔄 updateUser()
   * - Safely updates user info without overwriting entire user object
   */
  updateUser: (data) => {
    const currentUser = get().user;
    if (!currentUser) return;
    set({ user: { ...currentUser, ...data } });
  },

  /**
   * 🔐 validateToken()
   * - Calls backend to verify token validity
   * - If token is expired/invalid ➜ logout user
   */
  validateToken: async () => {
    const storedToken = get().token || localStorage.getItem("accessToken");
    if (!storedToken) {
      get().logout();
      return;
    }

    try {
      await axios.get("/auth/validate-token", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      // ✅ If call succeeds, token is valid (do nothing)
    } catch (error) {
      console.warn("⚠️ Token expired or invalid. Logging out.");
      get().logout();
    }
  },
}));
