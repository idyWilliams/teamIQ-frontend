// services/axios.ts
import axios from 'axios';
import { auth } from './api';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
