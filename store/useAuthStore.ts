import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

type User = {
  email: string;
  // Add other user properties here
} | any;

type Organization = {
  id: number;
  organization_name: string;
  team_size: string;
  email: string;
  role: string;
  organization_image: string | null;
  description: string | null;
  sector: string | null;
  social_media_handles: string | null;
  domain_link: string | null;
  favorite_tools: string | null;
  website: string | null;
  country: string;
  phone_number: string | null;
  createdAt: string;
  updatedAt: string;
};

interface AuthState {
  user: User | Organization | null;
  token: string | null;
  isAuthenticated: boolean;
  hasOnboarding: boolean;
  isLoading: boolean;
  authorize: (data: { user?: User; organization?: Organization; token: string }) => void;
  logout: (showToast?: boolean) => void;
  updateUser: (data: Partial<User | Organization>) => void;
  validateToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasOnboarding: false,
      isLoading: true,

      authorize: ({ user, organization, token }) => {
        const entity = user || organization;
        set({
          user: entity,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: (showToast = true) => {
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        if (showToast) {
          toast.error('Session expired. Please login again.');
        }
      },

      updateUser: data => {
        const currentUser = get().user;
        if (!currentUser) return;
        set(state => ({ user: { ...state.user, ...data } }));
      },

      validateToken: async () => {
        const token = get().token;

        if (!token) {
          set({ isAuthenticated: false, isLoading: false });
          return;
        }

        try {
          const decode: { sub: string; exp: number; entity_type: 'user' | 'organization' } = jwtDecode(token);
          if (!decode || typeof decode !== 'object') {
            toast.error('Invalid token format. Logging out...');
            set({ isAuthenticated: false, isLoading: false });
            return;
          }
          if (decode.exp) {
            const currentTime = Math.floor(Date.now() / 1000);
            if (decode.exp < currentTime) {
              toast.error('Token has expired. Logging out...');
              set({ isAuthenticated: false, isLoading: false });
              return;
            }
          }
          set({ isAuthenticated: true, isLoading: false });
        } catch {
          toast.error('Failed to decode token.');
          set({ isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
