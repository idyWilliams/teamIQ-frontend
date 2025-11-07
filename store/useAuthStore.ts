import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

//const VALIDATE_TOKEN_URL = "/auth/validate-token";
//const REFRESH_TOKEN_URL = "/auth/refresh-token";

type User =
  | {
      email: string;
    }
  | any;

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasOnboarding: boolean;
  authorize: (data: { user: User; token: string }) => void;
  logout: (showToast?: boolean) => void;
  updateUser: (data: Partial<User>) => void;
  validateToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasOnboarding: false,

      authorize: ({ user, token }) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        window.location.href = '/login';
        toast.error('Session expired. Please login again.');
      },

      updateUser: data => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({ user: { ...currentUser, ...data } });
      },

      validateToken: async () => {
        const token = get().token;

        // console.log(token, 'TOKEN IN STORE');

        if (!token) return get().logout();

        try {
          const decode = jwtDecode(token);
          console.log(decode, 'DECODE IN STORE');
          if (!decode || typeof decode !== 'object') {
            toast.error('Invalid token format. Logging out...');

            return get().logout();
          }
          if (decode.exp) {
            console.log(decode.exp, 'EXP IN STORE');
            const currentTime = Math.floor(Date.now() / 1000);
            if (decode.exp < currentTime) {
              toast.error('Token has expired. Logging out...');
              return get().logout();
            }
          }
        } catch {
          toast.error('Failed to decode token.');
          return get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
