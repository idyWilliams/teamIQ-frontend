// services/axios.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://teamiq-backend.onrender.com/api/v1',
  withCredentials: true,
});

export default axiosInstance;

const TOKEN_KEY = 'auth-storage';

// helper function to get the token from the local storage
export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === 'undefined') return null;
    console.log(
      JSON.parse(localStorage.getItem(TOKEN_KEY) as string)?.state?.token ||
        JSON.parse(sessionStorage.getItem(TOKEN_KEY) as string)?.state?.token
    );

    return (
      JSON.parse(localStorage.getItem(TOKEN_KEY) as string)?.state?.token ||
      JSON.parse(sessionStorage.getItem(TOKEN_KEY) as string)?.state?.token
    );
  },
  set: (token: string, persist: boolean = true) => {
    if (typeof window === 'undefined') return;
    if (persist) {
      return (
        JSON.parse(localStorage.getItem(TOKEN_KEY) as string) ||
        JSON.parse(sessionStorage.getItem(TOKEN_KEY) as string)
      );
    } else {
      return (
        JSON.parse(sessionStorage.getItem(TOKEN_KEY) as string) ||
        JSON.parse(sessionStorage.getItem(TOKEN_KEY) as string)
      );
    }
  },
  remove: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  },
};

// request interceptor to add authorization header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.get();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err: AxiosError) => Promise.reject(err)
);

// response interceptor yto handle token expiration
axiosInstance.interceptors.response.use(
  res => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // handle 401 unauthorised wgen token expired or invalid
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      //clear token from storage
      tokenStorage.remove();

      //redirect to login page
      window.location.href = '/login';
    }

    return Promise.reject(err);
  }
);
